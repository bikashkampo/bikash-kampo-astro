/**
 * Embed externally hosted videos from plain Markdown.
 *
 * Nothing is stored in this repo — the plugin only ever points at a URL on an
 * asset host (assets.deepakness.com and friends). Two forms are supported:
 *
 *   1. A bare URL on its own line
 *      https://assets.deepakness.com/blog/cogsend-intro/cogsend-demo.mp4
 *
 *   2. Markdown image syntax, where the alt text becomes the caption and the
 *      optional title overrides the poster
 *      ![A quick demo](https://…/cogsend-demo.mp4 "https://…/poster.webp")
 *
 * The poster defaults to the pipeline convention `<base>-poster.webp` sitting
 * next to the video, which is what the deepakness video pipeline generates.
 *
 * Output is a Plyr-ready <figure>. `preload="none"` means no video bytes are
 * downloaded until the visitor presses play; only the poster is fetched.
 */

const VIDEO_EXTENSIONS = ['mp4', 'm4v', 'webm', 'mov', 'ogv'];

const MIME_TYPES = {
  mp4: 'video/mp4',
  m4v: 'video/mp4',
  webm: 'video/webm',
  mov: 'video/quicktime',
  ogv: 'video/ogg',
};

const VIDEO_URL = new RegExp(
  `^https?://\\S+\\.(?:${VIDEO_EXTENSIONS.join('|')})(?:[?#]\\S*)?$`,
  'i'
);

/** `<base>-poster.webp` next to the video, or null when the URL has no file. */
function posterFor(src) {
  const base = src.split(/[?#]/)[0];
  const dot = base.lastIndexOf('.');
  if (dot <= base.lastIndexOf('/')) {
    return null;
  }
  return `${base.slice(0, dot)}-poster.webp`;
}

function extensionOf(src) {
  return src.split(/[?#]/)[0].split('.').pop()?.toLowerCase() ?? '';
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderVideo({ src, poster, caption }) {
  const type = MIME_TYPES[extensionOf(src)] ?? 'video/mp4';
  const posterAttr = poster ? ` poster="${escapeHtml(poster)}"` : '';
  const figcaption = caption ? `\n  <figcaption>${escapeHtml(caption)}</figcaption>` : '';

  return `<figure>
  <video controls preload="none" playsinline data-plyr${posterAttr}>
    <source src="${escapeHtml(src)}" type="${type}">
    <a href="${escapeHtml(src)}">Download the video</a> if your browser cannot play it.
  </video>${figcaption}
</figure>`;
}

/** Video markup for a paragraph that is nothing but a video, else null. */
function videoIn(node) {
  if (node.type !== 'paragraph' || node.children?.length !== 1) {
    return null;
  }

  const [child] = node.children;

  if (child.type === 'text') {
    const src = child.value.trim();
    return VIDEO_URL.test(src) ? renderVideo({ src, poster: posterFor(src) }) : null;
  }

  if (child.type === 'image' && VIDEO_URL.test(child.url)) {
    return renderVideo({
      src: child.url,
      poster: child.title?.trim() || posterFor(child.url),
      caption: child.alt?.trim(),
    });
  }

  return null;
}

function walk(parent) {
  if (!Array.isArray(parent.children)) {
    return;
  }

  parent.children = parent.children.map((child) => {
    const video = videoIn(child);
    if (video) {
      return { type: 'html', value: video };
    }
    walk(child);
    return child;
  });
}

export default function remarkVideo() {
  return (tree) => {
    walk(tree);
  };
}
