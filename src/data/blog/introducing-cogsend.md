---
title: Introducing CogSend – A Self-Hosted Social Media Scheduler
description: My friend Deepak launched CogSend – a self-hosted social media scheduler for Mastodon, Bluesky, LinkedIn, Threads and X.
pubDate: 2026-09-23
updatedDate: ''
category: Technology
author: Bikash Kampo
image: null
draft: false
---

My friend [Deepak](https://deepakness.com/) has been building something for a while, and it just went live.

It is called [CogSend](https://cogsend.com/) – a self-hosted social media scheduler for Mastodon, Bluesky, LinkedIn, Threads and X.

If you publish anything online, you know the problem. You write one post and then publish it in five places. Every platform has its own character limit, its own media rules, and its own way of handling threads. The usual fix is a subscription tool where your accounts and your credentials sit on someone else's server.

CogSend takes a different route. You deploy it to your own Cloudflare account. There is no monthly fee, no third-party account, and your credentials stay with you. The code is open source under the MIT license.

Here is what it does:

- Write a post once and customize it per platform. The X version can stay short while the LinkedIn version goes long.
- Publish now or schedule it for later. Every destination gets its own result, so one platform failing does not take the rest down.
- Retry failures automatically. If a platform keeps refusing, the post parks under Failed with the reason, and you can fix it and retry.
- Attach up to four images with alt text for each one, or an MP4 for LinkedIn.
- See published against failed over 7, 30 or 90 days instead of guessing which platform is worth the effort.
- Sign in with an authenticator app, with credentials encrypted at rest and an API key for scripts or cron jobs.

<figure>
  <video controls preload="metadata" playsinline>
    <source src="https://assets.deepakness.com/cogsend/cogsend-demo-2k.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <figcaption>A quick demo of CogSend in action.</figcaption>
</figure>

Installing it takes two commands, and the setup script handles the rest – the database, the storage bucket, the secrets, the deploy, and a test login at the end. You need Node 22.12+ and a free Cloudflare account. Mastodon and Bluesky connect with what you already have. LinkedIn, Threads and X need a small app registered with the platform first, and CogSend shows you exactly what to create.

The part I find interesting is the direction. Most scheduling tools are built to scale, and you rent access to your own accounts forever. CogSend is the opposite – it is small, it is yours, and it does the job.

You can explore it at [cogsend.com](https://cogsend.com/) or read the code on [GitHub](https://github.com/deepakness/cogsend). If you have been looking for a scheduler you actually own, this is a good place to start.
