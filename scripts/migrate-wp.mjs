import TurndownService from 'turndown';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(PROJECT_ROOT, 'src/data/blog');
const IMAGES_DIR = path.join(PROJECT_ROOT, 'downloaded-images');

const SPAM_SLUGS = new Set([
  'hoesjes-voor-je-iphone-16-pro-de-perfecte-bescherming',
  'iphone-14-plus-schutzfolie-der-perfekte-schutz-fur-ihr-neues-gerat',
  'a-comprehensive-guide-to-buying-rolex-cellini-replica-watches',
]);

const CATEGORY_MAP = {
  8: 'Business',
  9: 'Technology',
  15: 'Life',
  1: 'Business', // Uncategorized -> Business
};

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
});

// Remove WordPress block classes and empty divs
turndown.addRule('wpBlocks', {
  filter: (node) => {
    return node.nodeName === 'DIV' && node.className && node.className.includes('wp-block');
  },
  replacement: (content) => content,
});

// Handle figure/figcaption
turndown.addRule('figure', {
  filter: 'figure',
  replacement: (content, node) => {
    const img = node.querySelector('img');
    const figcaption = node.querySelector('figcaption');
    if (img) {
      const src = img.getAttribute('src') || '';
      const alt = img.getAttribute('alt') || figcaption?.textContent || '';
      return `\n\n![${alt}](${src})\n\n`;
    }
    return content;
  },
});

async function fetchAllPosts() {
  const posts = [];
  let page = 1;
  while (true) {
    const url = `https://bikashkampo.com/wp-json/wp/v2/posts?per_page=30&page=${page}&_embed`;
    console.log(`Fetching page ${page}...`);
    const response = await fetch(url);
    if (!response.ok) break;
    const data = await response.json();
    if (data.length === 0) break;
    posts.push(...data);
    page++;
  }
  return posts;
}

function extractImageUrls(html) {
  const urls = new Set();
  const imgRegex = /src="(https?:\/\/[^"]*bikashkampo\.com\/wp-content\/uploads\/[^"]*)"/g;
  let match;
  while ((match = imgRegex.exec(html))) {
    // Get the base URL without size suffixes
    let url = match[1];
    urls.add(url);
  }
  return [...urls];
}

function cleanSpamLinks(markdown) {
  // Remove known spam domains
  const spamDomains = ['fakewatch', 'replica', 'casino', 'pharma', 'viagra'];
  let cleaned = markdown;
  for (const domain of spamDomains) {
    const regex = new RegExp(`\\[([^\\]]*)\\]\\(https?:\\/\\/[^)]*${domain}[^)]*\\)`, 'gi');
    cleaned = cleaned.replace(regex, '$1');
  }
  return cleaned;
}

function generateFrontmatter(post) {
  const title = post.title.rendered
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/"/g, '\\"');

  const excerpt = (post.excerpt?.rendered || '')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#8211;/g, '–')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/\n/g, ' ')
    .trim()
    .slice(0, 200)
    .replace(/"/g, '\\"');

  const categoryIds = post.categories || [1];
  const category = CATEGORY_MAP[categoryIds[0]] || 'Business';

  const pubDate = post.date.split('T')[0];

  return `---
title: "${title}"
description: "${excerpt}"
pubDate: ${pubDate}
category: "${category}"
author: "Bikash Kampo"
draft: false
---`;
}

async function downloadImage(url, destDir) {
  try {
    const filename = path.basename(new URL(url).pathname);
    const destPath = path.join(destDir, filename);

    // Skip if already downloaded
    try {
      await fs.access(destPath);
      return filename;
    } catch {}

    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`  Failed to download: ${url} (${response.status})`);
      return null;
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    await fs.writeFile(destPath, buffer);
    console.log(`  Downloaded: ${filename}`);
    return filename;
  } catch (err) {
    console.warn(`  Error downloading ${url}: ${err.message}`);
    return null;
  }
}

async function main() {
  await fs.mkdir(BLOG_DIR, { recursive: true });
  await fs.mkdir(IMAGES_DIR, { recursive: true });

  console.log('Fetching posts from WordPress API...');
  const allPosts = await fetchAllPosts();
  console.log(`Found ${allPosts.length} total posts`);

  const posts = allPosts.filter(p => !SPAM_SLUGS.has(p.slug));
  console.log(`After filtering spam: ${posts.length} posts to migrate\n`);

  const allImages = [];

  for (const post of posts) {
    const slug = post.slug;
    const title = post.title.rendered.replace(/<[^>]*>/g, '');
    console.log(`Processing: ${title} (${slug})`);

    // Generate frontmatter
    const frontmatter = generateFrontmatter(post);

    // Convert HTML content to Markdown
    let markdown = turndown.turndown(post.content.rendered);
    markdown = cleanSpamLinks(markdown);

    // Clean up extra whitespace
    markdown = markdown
      .replace(/\n{4,}/g, '\n\n\n')
      .trim();

    // Extract and collect image URLs
    const imageUrls = extractImageUrls(post.content.rendered);
    for (const imgUrl of imageUrls) {
      const filename = await downloadImage(imgUrl, IMAGES_DIR);
      if (filename) {
        allImages.push({ original: imgUrl, filename });
        // Replace URL in markdown
        markdown = markdown.replace(
          new RegExp(imgUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
          `__R2_URL__/${filename}`
        );
      }
    }

    // Write markdown file
    const content = `${frontmatter}\n\n${markdown}\n`;
    const filePath = path.join(BLOG_DIR, `${slug}.md`);
    await fs.writeFile(filePath, content, 'utf-8');
    console.log(`  Written: ${slug}.md\n`);
  }

  // Write image manifest
  const manifest = {
    totalImages: allImages.length,
    images: allImages,
  };
  await fs.writeFile(
    path.join(PROJECT_ROOT, 'image-manifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  console.log('\n=== Migration Complete ===');
  console.log(`Posts migrated: ${posts.length}`);
  console.log(`Images downloaded: ${allImages.length}`);
  console.log(`Image manifest: image-manifest.json`);
  console.log('\nNext steps:');
  console.log('1. Create R2 bucket: wrangler r2 bucket create bikash-kampo-images');
  console.log('2. Upload images to R2');
  console.log('3. Replace __R2_URL__ in markdown files with actual R2 public URL');
}

main().catch(console.error);
