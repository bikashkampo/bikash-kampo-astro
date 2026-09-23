---
title: Introducing CogSend – A Self-Hosted Social Media Scheduler
description: CogSend is a self-hosted social media scheduler for Mastodon, Bluesky, LinkedIn, Threads and X that runs on your own Cloudflare account.
pubDate: 2026-09-23
updatedDate: ''
category: Technology
author: Bikash Kampo
image: null
draft: false
---

I have been working on [CogSend](https://cogsend.com/) with Deepak for a while now, and it just went live.

It is a self-hosted social media scheduler for Mastodon, Bluesky, LinkedIn, Threads and X.

If you publish anything online, you know the problem. You write one post and then publish it in five places. Every platform has its own character limit, its own media rules, and its own way of handling threads. The usual fix is a subscription tool where your accounts and your credentials sit on [someone else's server](/blog/ads-follow-you-on-the-internet).

We did not want that for ourselves. CogSend deploys to your own Cloudflare account. There is no monthly fee, nothing to cancel, and no account with us. [You are not the product](/blog/social-media-steals-our-attention) either. The code is open source under the MIT license.

![A quick demo of CogSend in action.](https://assets.deepakness.com/blog/cogsend-intro/cogsend-demo.mp4)

## What it does

- Write a post once and rewrite it per platform. The X version can stay short while the LinkedIn version goes long.
- Publish it now or schedule it. Every destination carries its own status, so one platform failing does not take the rest down.
- Retry failures on their own. Five attempts, then the post parks under **Failed** with the reason, and you can fix it and retry.
- Attach up to four images with alt text for each one, or one MP4 for LinkedIn.
- See published against failed over 7, 30 or 90 days, with the previous period next to it and failures grouped by reason.
- Sign in with an authenticator app and backup codes, with platform tokens encrypted at rest.

## Installing it

Installing is one clone and one setup command, and it takes about five minutes. The script creates the D1 database and the R2 bucket, generates the secrets, applies the migrations, deploys the Worker, and signs in once against it.

```bash
git clone --depth 1 https://github.com/deepakness/cogsend.git cogsend && cd cogsend && npm install && npm run setup
```

You need Node 22.12+ and a free Cloudflare account with Workers, D1 and R2 available. A personal instance stays inside the free plan, though Cloudflare does ask for a card on file for R2.

Mastodon and Bluesky connect with what you already have. LinkedIn, Threads and X need a developer app registered with the platform first, and CogSend shows you exactly what to create. X also charges for posting, so fund a small balance before you connect it.

## Why we built it this way

Most scheduling tools are built to scale, and you rent access to your own accounts forever. We went the opposite way. CogSend is small, it lives in your Cloudflare account, and your posts, images and secrets stay there.

Updates are the same shape as the install.

```bash
git pull
npm ci
npm run deploy:release
```

**Settings** tells you when a newer release is out.

Folks, if you have been looking for a scheduler you actually own, this is a good place to start. Go explore at [cogsend.com](https://cogsend.com/) or read the code on [GitHub](https://github.com/deepakness/cogsend).
