// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://bikashkampo.com',
  output: 'static',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
  redirects: {
    '/ads-follow-you-on-the-internet': '/blog/ads-follow-you-on-the-internet',
    '/boring-path-to-success': '/blog/boring-path-to-success',
    '/building-pseoos': '/blog/building-pseoos',
    '/buy-1-get-1-free-vs-buy-2-get-50-off': '/blog/buy-1-get-1-free-vs-buy-2-get-50-off',
    '/can-the-metaverse-succeed': '/blog/can-the-metaverse-succeed',
    '/connect-claude-ai-to-airtable': '/blog/connect-claude-ai-to-airtable',
    '/could-memes-help-us-evolve': '/blog/could-memes-help-us-evolve',
    '/growth-hack-case-studies': '/blog/growth-hack-case-studies',
    '/how-to-avoid-tempting-startup-ideas': '/blog/how-to-avoid-tempting-startup-ideas',
    '/how-to-compete-with-free': '/blog/how-to-compete-with-free',
    '/illusion-of-social-media': '/blog/illusion-of-social-media',
    '/make-your-product-a-habit': '/blog/make-your-product-a-habit',
    '/marketing-is-both-an-art-and-a-science': '/blog/marketing-is-both-an-art-and-a-science',
    '/marketing-trends': '/blog/marketing-trends',
    '/metaverse-business-ideas': '/blog/metaverse-business-ideas',
    '/our-content-exceptional-at-untalkedseo': '/blog/our-content-exceptional-at-untalkedseo',
    '/passion-into-50-million-year-business': '/blog/passion-into-50-million-year-business',
    '/play-the-long-game': '/blog/play-the-long-game',
    '/power-of-shared-deadline': '/blog/power-of-shared-deadline',
    '/social-media-steals-our-attention': '/blog/social-media-steals-our-attention',
    '/the-underwear-theory-of-economic-growth': '/blog/the-underwear-theory-of-economic-growth',
    '/what-to-focus-on-as-product-builders-during-inception': '/blog/what-to-focus-on-as-product-builders-during-inception',
    '/why-do-customers-really-buy': '/blog/why-do-customers-really-buy',
    '/worst-things-on-internet': '/blog/worst-things-on-internet',
  },
});
