# AGENTS.md – Blog Writing Instructions

Follow this when asked to write an article, blog post, or short note for
bikashkampo.com.

## Rules

- **Write simply. Avoid AI-slop language** – no flowery adjectives, unnecessary adverbs, or overly formal phrasing. Never use: delve, leverage, furthermore, moreover, game-changer, elevate, "In today's fast-paced world", "Excited to announce that we are thrilled to...".
- **No em dashes (—).** Use en dashes ( – ) with spaces. Ellipses "..." for trailing off ("So...", "It's not perfect...").
- **First person, always.** Everything is the author's own account: what happened, what was tried, what went wrong.
- **Honest and concrete.** Admit what isn't known, share failures and wrong predictions, use real numbers, named tools, exact commands, and screenshots instead of abstract claims. No unsupported claims, ever.
- **Enthusiastic without hype.** Short concrete praise: "This is awesome", "It works like a charm", "Love it". Mild, specific complaints: "It's bad", "not up to the mark". Never cruel, never clickbait.
- Hedge naturally with "I think", "probably", "maybe", "Not sure".
- Address readers as "Folks,".
- Read every draft aloud. If it doesn't sound like a chat message, rewrite it.

---

## Articles

### Voice and structure

- Conversational, like messaging a friend. Simple words, short sentences (aim for ~15–20 words, never over ~30).
- **Short paragraphs, 1–3 sentences.** Single-sentence paragraphs are deliberate punch lines.
- **"So...", "But...", "And..."** are normal sentence openers – use them.
- **Open with the personal trigger** – what happened, what was seen, or the problem that started it. Never a formal introduction, never "In this post...".
- **End abruptly.** "That's it." / "Hope this helps." / "Let's see how it goes." / "I will keep updating this post." Never a conclusion section.
- Use **lists everywhere** (bullets for features and pros/cons; numbered steps as `1. **Bold label** – explanation`) and **tables** for comparisons and pricing.
- Include **copy-paste-ready code**: exact commands and configs in code blocks, with placeholders like `YOUR_API_KEY` explained one by one.
- Add **screenshots for every UI step** with descriptive alt text and the phrase "as you see in the screenshot below". If a screenshot will be added later, leave an HTML comment placeholder instead of a broken image reference.
- **Updates are appended, never woven in**: `**Update**: Mon DD, YYYY` at the bottom of the article, original text untouched.

### Blog posts

300–2,500 words. Fixed arc: personal trigger → context (what was used before and why it failed) → numbered steps with sentence-case H2/H3 headings (`## 1. Install Ollama`) → commands, configs, screenshots → honest verdict ("things I liked" + "things I didn't like") → trailing close.

### Short notes

50–300 words. **No headings at all** – paragraphs, lists, and code flowing together. Three shapes:

1. **Curator note:** "Came across [this post](...) where..." → short quote or key facts → a one or two line reaction.
2. **Personal update:** "I added X to my site today..." → what and why → maybe a screenshot → "That's the update."
3. **Cheatsheet:** "If you want to do X, here's the command:" → code with exact paths → one-line caveat → "That's it."

### Mechanics

- **No colons in prose** when a full sentence works. Colons only in YAML, URLs, code, time, and label/value list items.
- **Double quotes** for quoted speech and reported text. **Backticks** for commands, paths, file names, and model names. **Bold** for UI labels and key claims. **Blockquotes** for quotes, definitions, and callouts.
- **Emoji are rare in articles** – mostly confined to personal stories. Numbers get commas; prices like `$20/mo` or `₹649`.

### Research and links

- Read the provided local files and context first; research online only when needed. Before making a big change based on online research findings, confirm with the user first.
- **Link the main source from relevant wording in the first paragraph** – specific, natural anchor text. Never a generic "Source:" link at the bottom.
- Keep researched additions **brief and directly supported by cited sources**. Don't expand a short note into a detailed article without being asked.
- Add 1–3 internal links where genuinely relevant, with natural flowing link text – never the exact title of the target article.
- If a tool, model, person, or site is mentioned, name it exactly and link it on first mention.

### Article vocabulary

- Openers and connectors: "Honestly,", "To be honest,", "I think,", "I mean,", "Basically,", "By the way,", "Not to mention,", "And to my surprise,"
- Discoveries: "Came across...", "Just learned...", "Found this..."
- Reactions: "Cool, right?", "How cool is that!", "This is awesome", "It works like a charm", "Crazy stuff.", "What a time to be alive!"
- Casual fillers: stuff, tweak, silly, random, whatnot, super, absolutely

### Article checklist

1. No em dashes anywhere (search for `—`, replace with `–`).
2. Sentences under ~30 words; paragraphs 1–3 sentences.
3. Opens with the personal trigger, not "In this post".
4. First person throughout, with concrete details.
5. Every tool, model, and source named exactly and linked on first mention.
6. Commands and paths in backticks; screenshots for UI steps.
7. Ends with "That's it." or similar – no conclusion.
8. Short notes have no headings and stay under ~300 words.
9. No banned AI-slop words or flowery adjectives.

---

## Video embeds (site mechanics)

Videos are never stored in this repo. They live on the asset host and the post
only holds the URL.

Drop the link on its own line and the build turns it into a Plyr player with
the poster, `preload="none"`, and a caption-free figure:

```md
https://assets.deepakness.com/blog/cogsend-intro/cogsend-demo.mp4
```

Want a caption? Use image syntax – the alt text becomes the caption:

```md
![A quick demo of CogSend in action.](https://assets.deepakness.com/blog/cogsend-intro/cogsend-demo.mp4)
```

Rules that keep it working:

- The poster is derived as `<name>-poster.webp` next to the video. Upload one,
  or pass a different one as the Markdown title:
  `![Caption](https://…/clip.mp4 "https://…/poster.webp")`.
- Only hosts listed in the CSP in `src/layouts/BaseLayout.astro` may serve
  video or images. `assets.deepakness.com` is allowed; add any new host there.
- Encode for the web before uploading – H.264 MP4, `-crf 26`, width capped at
  1600, `-movflags +faststart`, AAC 96k. A 2K master at 60fps is 67 MB for two
  minutes; the web version is 7 MB.
- Supported extensions: `mp4`, `m4v`, `webm`, `mov`, `ogv`.
