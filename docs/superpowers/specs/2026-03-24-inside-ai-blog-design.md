# inside.ai — Blog Design Spec
**Date:** 2026-03-24
**Owner:** Sunil Katal
**Status:** Approved

---

## 1. Overview

inside.ai is a personal blog where Sunil Katal documents his daily use of AI tools and shares updates on the latest AI developments. The tone is honest, opinionated, and accessible — written for everyone from business owners to tech enthusiasts. The site is entirely separate from House of Aetheria.

**Domain:** inside.ai (already owned)
**Goal:** Publish regularly, grow an email subscriber base, and build a personal voice in the AI space.

---

## 2. Tech Stack

| Layer | Tool | Cost |
|---|---|---|
| Framework | Astro 4 + React 18 + Tailwind CSS v3 | Free |
| CMS / Editor | Tina CMS | Free |
| Hosting | Netlify | Free |
| Newsletter | Beehiiv (JS embed) | Free (up to 2,500 subs) |
| Comments | Giscus | Free |
| UI Components | 21st.dev Magic Components | Free |
| Version Control | GitHub | Free |

**Why Astro:** 21st.dev components are React + Tailwind. Astro supports these natively — no workarounds needed. Ghost and WordPress would require hacks.

**Why Tina CMS:** Gives a browser-based writing interface (like Google Docs) so Sunil can write posts without editing code files. Requires a `TINA_PUBLIC_CLIENT_ID` and `TINA_TOKEN` environment variable set in Netlify.

**Why Beehiiv:** Best-in-class newsletter tool on a free tier. Embed method: JavaScript embed snippet pasted into the newsletter banner component. Readers subscribe on-site and get posts delivered to their inbox automatically. The nav "Subscribe Free" button scrolls to the newsletter banner section on the homepage.

**Why Giscus:** Clean, free comments system. Readers comment using GitHub login — keeps spam low.

**Domain registrar:** Sunil owns inside.ai — registrar TBD at setup time. DNS A record or CNAME will point to Netlify's load balancer IP during Step 12.

---

## 3. Visual Design

### Palette
| Role | Value |
|---|---|
| Background | `#ffffff` White |
| Primary text | `#111111` Near-black |
| Secondary text | `#888888` Grey |
| Accent | `#A8FF00` Acid Green |
| Dark sections | `#111111` Near-black |
| Borders | `#eeeeee` Light grey |

### Typography
- **Headlines:** System sans-serif, weight 900 (extra bold), tight leading
- **Body:** System sans-serif, weight 400, relaxed leading (1.7)
- **Labels/tags:** Uppercase, letter-spacing 2–3px, weight 700–800
- **Logo:** `INSIDE.AI` — all caps, letter-spacing 4px, weight 900

### Style
Bold + editorial. Black and white base, acid green as the single accent colour. High contrast. Feels like a premium digital magazine — The Verge / Wired energy, but personal and opinionated.

---

## 4. Intro Animation

Plays on every first visit (once per session, stored in `sessionStorage`).

**Sequence:**
1. Full-screen black background
2. 60 acid-green particles float upward from the bottom (randomised positions, speeds, sizes)
3. A radial green glow pulses behind the text
4. `>` arrow fades in from the left (0.3s delay)
5. `inside.ai` types itself out character by character (0.7s delay, 1s duration)
6. Blinking cursor appears after text
7. Tagline `"AI, as I actually use it."` fades in below (2s delay)
8. `"Enter ↓"` hint appears (2.6s delay)
9. Auto-transitions to homepage after 4.2s, or immediately on click
10. Intro fades out (0.8s), homepage fades in (1s)

---

## 5. Site Structure

### Pages

| Page | URL | Purpose |
|---|---|---|
| Home | `/` | Magazine grid homepage |
| Articles | `/articles` | All long-form posts, filterable by tag |
| Daily Log | `/log` | Chronological short entries |
| Article | `/articles/[slug]` | Individual post page |
| Log Entry | `/log/[slug]` | Individual log entry page |
| About | `/about` | Who Sunil is and why this blog |

### Navigation Links
`Articles · Daily Log · About` — "Tools" is a tag filter within Articles, not a separate page.

### Post Categories (Tags)
- **DEEP DIVE** — Long-form reviews, experiments, comparisons (500–1500 words)
- **TOOLS** — Specific tool reviews and takes
- **OPINION** — Broader commentary and hot takes
- **DAILY LOG** — Short personal entries (100–300 words), dated

---

## 6. Homepage Layout — Magazine Grid

### Section order (top to bottom):

1. **Sticky navigation bar**
   - Left: `INSIDE.AI` logo
   - Centre: Articles · Daily Log · About
   - Right: `Subscribe Free` button (acid green) — smooth-scrolls to newsletter banner

2. **Breaking ticker strip**
   - Black background, acid green text
   - Scrolling latest headlines (CSS marquee animation)

3. **Magazine grid** (2-column: `2fr 1fr`)
   - Left (2/3 width): Hero post — dark background, acid green tag, large headline, excerpt, CTA button
   - Right (1/3 width): 3 sidebar posts stacked — tag, headline, date + read time

4. **"Recent Articles" section label** + "View all →" link

5. **3-column article card row**
   - Each card: tag, headline, excerpt, date + read time

6. **Daily Log strip**
   - Light grey background
   - 3 most recent log entries — date, headline, one-line summary

7. **Newsletter signup banner** (id="newsletter" for scroll anchor)
   - Dark background
   - Left: headline + subtext
   - Right: Beehiiv JS embed (email input + subscribe button, acid green)

8. **Footer**
   - Logo · author credit · page links (Articles, Daily Log, About)

---

## 7. Article Page Layout (`/articles/[slug]`)

1. Navigation (same as homepage)
2. Article header: tag pill, headline (H1), date, estimated read time
3. Body content — centred, max-width 680px, 1.7 line-height
4. Inline newsletter CTA after last paragraph (Beehiiv JS embed, compact)
5. Giscus comments section (full width below CTA)
6. Footer

---

## 7b. Log Entry Page Layout (`/log/[slug]`)

1. Navigation (same as homepage)
2. Entry header: `DAILY LOG` tag, date (large), headline
3. Body content — centred, max-width 680px
4. Prev / Next log entry navigation links at bottom
5. Footer (no comments on log entries — kept lightweight)

---

## 7c. Articles Index Page Layout (`/articles`)

1. Navigation
2. Page title: `ALL ARTICLES` (large, bold)
3. Tag filter bar — horizontal row of pill buttons: `ALL · DEEP DIVE · TOOLS · OPINION` (acid green highlight on active)
4. Article grid — 3 columns on desktop, 1 column on mobile
   - Each card: tag, headline, excerpt, date + read time
5. Pagination — "Load more" button or numbered pages (10 articles per page)
6. Footer

---

## 7d. About Page Layout (`/about`)

1. Navigation
2. Large headline: `"I'm Sunil. I use AI every day so you don't have to figure it out alone."`
3. Short bio paragraph — who Sunil is, background, why he started inside.ai
4. What to expect section — bullet list of content types (deep dives, daily logs, tool reviews)
5. Newsletter CTA — "Join X readers" + Beehiiv embed
6. Footer

---

## 7e. Daily Log Index Page Layout (`/log`)

1. Navigation
2. Page title: `DAILY LOG` (large, bold) + subtitle "AI as I actually use it, day by day."
3. Reverse-chronological list — single column, full width (max 720px centred)
   - Each entry row: large date label (left) + headline + one-line summary
   - Thin border separator between entries
4. Pagination — "Load more" button (10 entries per page)
5. Footer

---

## 8. Tina CMS Content Schema

### Collection: `articles`
| Field | Type | Required |
|---|---|---|
| title | string | Yes |
| slug | string (auto from title) | Yes |
| date | datetime | Yes |
| tag | select (DEEP DIVE, TOOLS, OPINION) | Yes |
| excerpt | string (max 200 chars) | Yes |
| readTime | string (e.g. "5 min read") | Yes |
| body | rich-text | Yes |

### Collection: `log`
| Field | Type | Required |
|---|---|---|
| title | string | Yes |
| slug | string (auto from title) | Yes |
| date | datetime | Yes |
| summary | string (max 100 chars) | Yes |
| body | rich-text | Yes |

**Note on `readTime`:** Manually typed by Sunil (e.g. "5 min read"). Not auto-calculated. Developer should not automate this — Sunil will fill it in when writing.

---

## 9. Content Workflow (how Sunil publishes)

1. Open Tina CMS in browser (`/admin`)
2. Click "New Post" — choose Article or Daily Log
3. Write in the visual editor (like Google Docs)
4. Hit Publish — Tina commits to GitHub
5. Netlify detects the GitHub commit, auto-builds and deploys in ~60 seconds
6. Post is live on inside.ai

No coding. No FTP. No file uploads.

---

## 10. Newsletter Flow

1. Reader enters email in the Beehiiv embed on inside.ai → sent directly to Beehiiv
2. Beehiiv sends a confirmation email to the reader
3. When Sunil wants to send a newsletter → he logs into Beehiiv dashboard and broadcasts
4. Sunil manages subscribers, open rates, and sends from the Beehiiv dashboard

**Embed method:** Beehiiv JavaScript embed snippet — paste into the newsletter banner component and the article-end CTA component. No API key required.

---

## 11. Setup Steps (implementation plan basis)

1. Create GitHub account + new repository (`inside-ai-blog`)
2. Scaffold Astro 4 project with React 18 integration + Tailwind CSS v3
3. Install and configure Tina CMS — define Article and Log collections per Section 8 schema
4. Set `TINA_PUBLIC_CLIENT_ID` and `TINA_TOKEN` as environment variables in Netlify
5. Build shared components: Nav, Footer, Tag pill, Article card, Newsletter banner (Beehiiv embed)
6. Build homepage layout (Magazine Grid per Section 6) using 21st.dev magic components
7. Build Articles index page (Section 7c) with tag filter
8. Build Article detail page (Section 7) with Giscus comments
9. Build Daily Log index page (`/log`) — reverse-chronological list
10. Build Log entry page (Section 7b)
11. Build About page (Section 7d)
12. Add intro animation (Section 4) as a client-side component that checks `sessionStorage`
13. Add Beehiiv JS embed to newsletter banner and article-end CTA
14. Deploy to Netlify — connect GitHub repo, enable auto-deploy on push
15. Add environment variables in Netlify dashboard
16. Connect inside.ai domain — update DNS at registrar to point to Netlify
17. Test end-to-end: publish a post via Tina → see it live on inside.ai → subscribe → receive confirmation email

---

## 13. Growth Plan — Phases

### Phase 1: Foundation (Month 1–2)
**Goal:** Get the site live and build a writing habit.

- Publish 3x per week minimum — 2 daily logs + 1 article
- Share every post on LinkedIn and Twitter/X personally
- Tell your existing network (friends, business contacts) about inside.ai
- Set up Google Search Console (free) — submit sitemap so Google indexes the site
- Target: 10 posts published, 100 email subscribers

**What matters here:** Consistency over quality. The writing gets better by doing it.

---

### Phase 2: Audience Building (Month 3–6)
**Goal:** Build a loyal readership and grow the email list.

- Write 1 "definitive" piece per month — something genuinely useful that people will share (e.g. "The 10 AI tools I actually use to run my business")
- Repurpose each article into 3–5 social posts (LinkedIn carousels, Twitter threads)
- Guest post on 1–2 larger AI newsletters or blogs — ask to cross-promote
- Submit to AI newsletter directories (There's An AI For That, Futurepedia)
- Engage with comments on every post — reply to every reader
- Consider a weekly email digest format on Beehiiv (same content, packaged as a newsletter)
- Target: 50 posts published, 1,000 email subscribers, 5,000 monthly page views

---

### Phase 3: Authority (Month 6–12)
**Goal:** Become a recognised voice in the "real-world AI use" space.

- Get featured in other publications — pitch to Forbes India, YourStory, Inc42 as a contributor
- Start a simple interview series — "How [founder/professional] uses AI" — brings in their audience too
- Launch a resource page: "My AI Stack" — the exact tools Sunil uses with context
- Build an SEO content calendar around high-intent queries: "best AI tool for [task]", "how to use Claude for [use case]"
- Target: 5,000+ email subscribers, 20,000+ monthly page views, inbound media requests

---

### Phase 4: Scale (Year 2+)
**Goal:** inside.ai becomes a media property, not just a blog.

- Explore a podcast or video format (AI tool walkthroughs, reactions to news)
- Build a community layer — paid Discord or Slack for premium subscribers
- Hire a part-time editor or VA to help with publishing cadence
- Target: 15,000+ email subscribers, brand partnership inquiries, passive income from monetisation

---

## 14. Monetisation Plan

Monetisation follows audience. Do not attempt any of these before Phase 2.

### Tier 1 — Low effort, starts early (Month 4–6)

**Affiliate links**
- Recommend AI tools you genuinely use — Beehiiv, Jasper, Midjourney, Claude Pro, etc.
- Join their affiliate programmes — earn 20–40% commission on every signup
- Add a "Tools I Use" page with your affiliate links
- Estimated: ₹5,000–₹25,000/month at 1,000 subscribers

**Beehiiv Boosts**
- Beehiiv's built-in ad network — other newsletters pay to be recommended to your readers
- You approve every recommendation — keeps it relevant
- Estimated: $1–3 per new subscriber referred (passive)

---

### Tier 2 — Medium effort, starts Phase 3 (Month 6–12)

**Newsletter sponsorships**
- Brands (AI tools, SaaS companies) pay to be featured in your weekly email
- Rate benchmark: ₹15,000–₹50,000 per placement at 3,000–5,000 subscribers
- Only take brands you actually use or believe in — trust is the product
- Estimated: ₹30,000–₹1,00,000/month at 5,000 subscribers (2 placements/month)

**Paid consulting / advisory**
- Readers who want help implementing AI in their own business hire Sunil directly
- 1-hour advisory call, or a short engagement
- Natural extension of the blog's positioning
- Estimated: ₹10,000–₹50,000 per engagement

---

### Tier 3 — Higher effort, Phase 4 (Year 2+)

**Paid newsletter tier (Beehiiv Premium)**
- Free tier: all posts public
- Paid tier (₹499–₹999/month): exclusive deep dives, tool teardowns, early access
- Beehiiv handles payments natively — no extra setup
- Estimated: ₹1,00,000–₹5,00,000/month at 500–1,000 paid subscribers

**Digital products**
- "My AI Workflow" — a downloadable guide/template pack (₹999–₹2,999 one-time)
- "AI for [Business Type]" — niche guides for founders, doctors, lawyers, etc.
- Sell via Gumroad or Beehiiv's native product feature
- Estimated: ₹50,000–₹2,00,000/month at scale

**Brand partnerships / sponsored content**
- Full article or series sponsored by an AI brand
- Higher value than newsletter ads — ₹75,000–₹3,00,000 per piece at authority scale
- Disclose clearly — audience trust must be protected

---

### Revenue Projection (realistic, conservative)

| Phase | Timeline | Est. Monthly Revenue |
|---|---|---|
| Phase 1 | Month 1–3 | ₹0 |
| Phase 2 | Month 4–6 | ₹5,000–₹30,000 |
| Phase 3 | Month 7–12 | ₹30,000–₹1,50,000 |
| Phase 4 | Year 2+ | ₹1,50,000–₹10,00,000+ |

**The core principle:** The blog builds trust. Trust builds audience. Audience enables every monetisation option above. Never monetise in a way that breaks the reader's trust.

---

## 12. Out of Scope (not building now)

- Search functionality
- Paid subscription / paywall
- Dark mode toggle
- Social sharing buttons
- Analytics (can add Google Analytics later — one script tag)
- Daily Log comments (kept lightweight, no Giscus on log entries)
