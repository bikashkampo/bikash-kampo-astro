# bikashkampo.com

Personal blog of Bikash Kampo. Astro with static output, deployed to GitHub Pages on every push to `main`. Needs Node 22.12+.

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server on `localhost:4321` |
| `npm run build` | Build the site to `dist/` |
| `npm run preview` | Serve the built site locally |

Restart the dev server after editing `astro.config.mjs` – plugins and markdown settings are not picked up live.

## Writing posts

Posts are Markdown files in `src/data/blog/`, checked against the collection schema in `src/content.config.ts`. Required frontmatter is `title`, `description`, `pubDate` and `category` (`Business`, `Technology` or `Life`).

New posts are usually written through Decap CMS at `/admin`, which commits to `main` through the GitHub backend. Images uploaded there land in `public/images/blog/`.

## Videos

Videos are hosted elsewhere and never committed here. Put the URL on its own line in a post:

```md
https://assets.deepakness.com/blog/cogsend-intro/cogsend-demo.mp4
```

Want a caption? Use image syntax and the alt text becomes the caption:

```md
![A quick demo of CogSend in action.](https://assets.deepakness.com/blog/cogsend-intro/cogsend-demo.mp4)
```

Either form becomes a Plyr player through `src/plugins/remark-video.mjs`. The poster is derived as `<name>-poster.webp` next to the video; pass a different one as the Markdown title: `![Caption](clip.mp4 "https://…/poster.webp")`. Supported extensions are `mp4`, `m4v`, `webm`, `mov` and `ogv`.

Two things that will bite:

- A new host must be allowed in the CSP in `src/layouts/BaseLayout.astro` – `media-src` for the file and `img-src` for the poster. Without it the browser blocks the video and the page shows no error.
- Encode before uploading. H.264 MP4, `-crf 26`, width capped at 1600, `+faststart`, AAC 96k. A raw 2K 60fps master is 67 MB for two minutes; the same clip encoded this way is 7 MB.

## Deploy

Push to `main`. `.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages, and `public/CNAME` points it at bikashkampo.com.
