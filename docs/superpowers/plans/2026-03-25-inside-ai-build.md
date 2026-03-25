# inside.ai Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and launch inside.ai — a bold, editorial AI blog with a magazine-grid homepage, terminal intro animation, newsletter, and comments — ready for Sunil to write and publish without any coding.

**Architecture:** Astro 4 static site with React 18 islands for interactive components (intro animation, tag filter). Content is stored as MDX files managed by Tina CMS. Netlify auto-deploys on every GitHub commit. Beehiiv handles the newsletter via a JS embed; Giscus handles comments via GitHub login.

**Tech Stack:** Astro 4, React 18, Tailwind CSS v3, Tina CMS, Netlify, Beehiiv (JS embed), Giscus, 21st.dev magic components

> ⚠️ = **Sunil does this step** (account creation, domain, passwords)
> 🤖 = **Agent/developer does this step** (code, config, commands)

---

## File Map

```
inside-ai-blog/
├── src/
│   ├── components/
│   │   ├── Nav.astro              # Sticky nav — logo, links, subscribe button
│   │   ├── Footer.astro           # Footer — logo, links, credit
│   │   ├── TagPill.astro          # Reusable tag pill (acid green on dark, outlined on light)
│   │   ├── ArticleCard.astro      # Post card — tag, headline, excerpt, meta
│   │   ├── SidebarPost.astro      # Compact sidebar post — tag, headline, meta
│   │   ├── Ticker.astro           # Scrolling breaking news strip
│   │   ├── NewsletterBanner.astro # Dark banner with Beehiiv embed
│   │   ├── GiscusComments.astro   # Giscus comments section
│   │   └── IntroAnimation.tsx     # React island — terminal intro animation
│   ├── layouts/
│   │   └── BaseLayout.astro       # HTML shell — head, meta, font, body wrapper
│   ├── pages/
│   │   ├── index.astro            # Homepage — magazine grid
│   │   ├── about.astro            # About page
│   │   ├── articles/
│   │   │   ├── index.astro        # Articles index — tag filter + grid
│   │   │   └── [slug].astro       # Article detail page
│   │   └── log/
│   │       ├── index.astro        # Daily Log index — reverse-chron list
│   │       └── [slug].astro       # Log entry page
│   ├── content/
│   │   ├── config.ts              # Astro content collection schemas
│   │   ├── articles/
│   │   │   └── hello-world.mdx    # Sample article (placeholder)
│   │   └── log/
│   │       └── day-one.mdx        # Sample log entry (placeholder)
│   └── styles/
│       └── global.css             # Base resets + Tailwind directives
├── tina/
│   └── config.ts                  # Tina CMS collection definitions
├── public/
│   └── favicon.svg
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## Task 1: Accounts & Prerequisites

> ⚠️ **Sunil does all steps in this task.**

**What this does:** Creates the accounts needed before any code can be written or deployed.

- [ ] **Step 1: Create a GitHub account**
  Go to github.com → Sign up with your email → Verify your email → Done.
  Then create a new repository: click `+` → New repository → Name it `inside-ai-blog` → Set to **Public** → Click "Create repository". Copy the repository URL (looks like `https://github.com/YOUR-NAME/inside-ai-blog`).

- [ ] **Step 2: Create a Netlify account**
  Go to netlify.com → Sign up → Choose "Sign up with GitHub" → Authorise Netlify.
  This links them so Netlify can auto-deploy when you publish.

- [ ] **Step 3: Create a Beehiiv account**
  Go to beehiiv.com → Sign up free → Publication name: `inside.ai` → Finish setup.
  You'll get the embed code in Task 13.

- [ ] **Step 4: Install Node.js on your Mac**
  Open Terminal (press Cmd+Space, type "Terminal", press Enter).
  Run this command (paste and press Enter):
  ```bash
  curl -fsSL https://fnm.vercel.app/install | bash
  ```
  Then:
  ```bash
  fnm install 20
  fnm use 20
  node --version
  ```
  Expected output: `v20.x.x`

- [ ] **Step 5: Install Git**
  In Terminal, run:
  ```bash
  git --version
  ```
  If it asks to install developer tools, click Install and wait. Then re-run.
  Expected output: `git version 2.x.x`

---

## Task 2: Project Scaffold

> 🤖 Agent task.

**Files created:** `package.json`, `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`, `src/styles/global.css`

- [ ] **Step 1: Scaffold the Astro project**
  ```bash
  cd /Users/sunilkatal
  npm create astro@latest inside-ai-blog -- --template minimal --typescript strict --no-git --install
  cd inside-ai-blog
  ```

- [ ] **Step 2: Add React and Tailwind integrations**
  ```bash
  npx astro add react tailwind --yes
  ```

- [ ] **Step 3: Verify dev server starts**
  ```bash
  npm run dev
  ```
  Expected: Terminal shows `Local: http://localhost:4321/`. Open browser to that URL. Should see a blank Astro page. Press Ctrl+C to stop.

- [ ] **Step 4: Write `tailwind.config.mjs`**
  ```js
  /** @type {import('tailwindcss').Config} */
  export default {
    content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,mdx}'],
    theme: {
      extend: {
        colors: {
          accent: '#A8FF00',
          dark: '#111111',
          muted: '#888888',
          border: '#eeeeee',
        },
        fontFamily: {
          sans: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'sans-serif'],
        },
        letterSpacing: {
          logo: '4px',
          tag: '2px',
          wide: '3px',
        },
      },
    },
    plugins: [],
  }
  ```

- [ ] **Step 5: Write `src/styles/global.css`**
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer base {
    html { font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif; }
    body { background: #fff; color: #111; }
    h1, h2, h3, h4 { font-weight: 900; line-height: 1.2; }
    p { line-height: 1.7; }
  }

  @layer utilities {
    .tag-pill {
      @apply text-[9px] font-black uppercase tracking-[2px] px-2 py-0.5 inline-block;
    }
    .tag-pill-dark {
      @apply tag-pill bg-dark text-accent;
    }
    .tag-pill-outline {
      @apply tag-pill border border-border text-muted;
    }
    .btn-accent {
      @apply bg-accent text-dark text-[10px] font-black uppercase tracking-[2px] px-4 py-2 cursor-pointer border-none;
    }
  }
  ```

- [ ] **Step 6: Initialise git and push to GitHub**
  Replace `YOUR-GITHUB-URL` with the URL from Task 1 Step 1:
  ```bash
  git init
  git add .
  git commit -m "feat: scaffold Astro project with React + Tailwind"
  git branch -M main
  git remote add origin YOUR-GITHUB-URL
  git push -u origin main
  ```

---

## Task 3: Base Layout

> 🤖 Agent task.

**Files:** `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Write `src/layouts/BaseLayout.astro`**
  ```astro
  ---
  import '../styles/global.css'

  interface Props {
    title: string
    description?: string
  }

  const { title, description = 'AI, as I actually use it. By Sunil Katal.' } = Astro.props
  ---
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <title>{title} | inside.ai</title>
    </head>
    <body>
      <slot />
    </body>
  </html>
  ```

- [ ] **Step 2: Write `public/favicon.svg`**
  ```svg
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" fill="#111"/>
    <text x="4" y="24" font-family="monospace" font-size="18" font-weight="900" fill="#A8FF00">&gt;_</text>
  </svg>
  ```

- [ ] **Step 3: Verify**
  ```bash
  npm run dev
  ```
  Open `http://localhost:4321`. No errors in terminal. Favicon shows in browser tab. Ctrl+C to stop.

- [ ] **Step 4: Commit**
  ```bash
  git add src/layouts/BaseLayout.astro public/favicon.svg
  git commit -m "feat: add base layout and favicon"
  ```

---

## Task 4: Shared Components

> 🤖 Agent task.

**Files:** `Nav.astro`, `Footer.astro`, `TagPill.astro`, `ArticleCard.astro`, `SidebarPost.astro`, `Ticker.astro`

- [ ] **Step 1: Write `src/components/Nav.astro`**
  ```astro
  ---
  const navLinks = [
    { href: '/articles', label: 'Articles' },
    { href: '/log', label: 'Daily Log' },
    { href: '/about', label: 'About' },
  ]
  ---
  <nav class="flex justify-between items-center px-10 py-[18px] border-b-2 border-dark sticky top-0 bg-white z-50">
    <a href="/" class="text-[15px] font-black tracking-logo no-underline text-dark">INSIDE.AI</a>
    <div class="flex gap-7">
      {navLinks.map(link => (
        <a href={link.href} class="text-[11px] font-semibold tracking-tag text-muted uppercase no-underline hover:text-dark transition-colors">
          {link.label}
        </a>
      ))}
    </div>
    <a href="/#newsletter" class="btn-accent">Subscribe Free</a>
  </nav>
  ```

- [ ] **Step 2: Write `src/components/Footer.astro`**
  ```astro
  <footer class="px-10 py-6 border-t border-border flex justify-between items-center text-[10px] text-muted">
    <a href="/" class="font-black tracking-logo text-dark no-underline">INSIDE.AI</a>
    <span>By Sunil Katal · All rights reserved</span>
    <div class="flex gap-6">
      <a href="/articles" class="no-underline hover:text-dark">Articles</a>
      <a href="/log" class="no-underline hover:text-dark">Daily Log</a>
      <a href="/about" class="no-underline hover:text-dark">About</a>
    </div>
  </footer>
  ```

- [ ] **Step 3: Write `src/components/TagPill.astro`**
  ```astro
  ---
  interface Props {
    tag: string
    variant?: 'dark' | 'outline'
  }
  const { tag, variant = 'dark' } = Astro.props
  ---
  <span class={variant === 'dark' ? 'tag-pill-dark' : 'tag-pill-outline'}>
    {tag}
  </span>
  ```

- [ ] **Step 4: Write `src/components/ArticleCard.astro`**
  ```astro
  ---
  import TagPill from './TagPill.astro'

  interface Props {
    title: string
    slug: string
    tag: string
    excerpt: string
    date: Date
    readTime: string
  }
  const { title, slug, tag, excerpt, date, readTime } = Astro.props
  const formattedDate = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(date)
  ---
  <article class="py-7 border-r border-border pr-6 mr-6 last:border-r-0 last:pr-0 last:mr-0">
    <TagPill tag={tag} />
    <a href={`/articles/${slug}`} class="no-underline text-dark hover:opacity-70 transition-opacity">
      <h3 class="text-sm font-black leading-snug mt-2 mb-2">{title}</h3>
    </a>
    <p class="text-xs text-muted leading-relaxed mb-3">{excerpt}</p>
    <span class="text-[10px] text-[#bbb]">{formattedDate} · {readTime}</span>
  </article>
  ```

- [ ] **Step 5: Write `src/components/SidebarPost.astro`**
  ```astro
  ---
  import TagPill from './TagPill.astro'

  interface Props {
    title: string
    slug: string
    tag: string
    date: Date
    readTime: string
  }
  const { title, slug, tag, date, readTime } = Astro.props
  const formattedDate = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' }).format(date)
  ---
  <div class="px-7 py-6 border-b border-border hover:bg-gray-50 transition-colors">
    <TagPill tag={tag} />
    <a href={`/articles/${slug}`} class="no-underline text-dark hover:opacity-70 transition-opacity">
      <h3 class="text-[13px] font-black leading-snug mt-2 mb-2">{title}</h3>
    </a>
    <span class="text-[10px] text-muted">{formattedDate} · {readTime}</span>
  </div>
  ```

- [ ] **Step 6: Write `src/components/Ticker.astro`**
  ```astro
  ---
  interface Props {
    items: string[]
  }
  const { items } = Astro.props
  const text = items.join('     ·     ')
  ---
  <div class="bg-dark text-accent text-[10px] font-bold tracking-tag py-2 px-10 overflow-hidden whitespace-nowrap">
    <div class="animate-[marquee_30s_linear_infinite] inline-block">
      {text}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{text}
    </div>
  </div>

  <style>
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  </style>
  ```

- [ ] **Step 7: Commit**
  ```bash
  git add src/components/
  git commit -m "feat: add shared Nav, Footer, TagPill, ArticleCard, SidebarPost, Ticker components"
  ```

---

## Task 5: Content Collections + Sample Content

> 🤖 Agent task.

**Files:** `src/content/config.ts`, `src/content/articles/hello-world.mdx`, `src/content/log/day-one.mdx`

- [ ] **Step 1: Write `src/content/config.ts`**
  ```ts
  import { defineCollection, z } from 'astro:content'

  const articles = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      date: z.date(),
      tag: z.enum(['DEEP DIVE', 'TOOLS', 'OPINION']),
      excerpt: z.string().max(200),
      readTime: z.string(),
    }),
  })

  const log = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      date: z.date(),
      summary: z.string().max(100),
    }),
  })

  export const collections = { articles, log }
  ```

- [ ] **Step 2: Write sample article `src/content/articles/hello-world.mdx`**
  ```mdx
  ---
  title: "I gave Claude my entire to-do list for a week. Here's what actually happened."
  date: 2026-03-24
  tag: "DEEP DIVE"
  excerpt: "Delegation to an AI felt absurd at first. By day three, I couldn't imagine going back. But it's not what the hype says it is — it's something stranger and more useful."
  readTime: "8 min read"
  ---

  This is the sample article body. Replace this with your real content when publishing.

  ## What I expected

  Lorem ipsum placeholder content. Sunil will replace this.

  ## What actually happened

  More placeholder content here.
  ```

- [ ] **Step 3: Write sample log entry `src/content/log/day-one.mdx`**
  ```mdx
  ---
  title: "Day 1: Asked Claude to rewrite an email I'd been avoiding for three days."
  date: 2026-03-24
  summary: "It nailed the tone on the first try. Sent it without editing. Got a reply within an hour."
  ---

  It nailed the tone on the first try. I sent it without editing a single word.

  Got a reply within an hour. The email had been sitting in my drafts for three days.

  This is what AI actually does — it removes the friction from the things you're already putting off.
  ```

- [ ] **Step 4: Verify content collections load**
  ```bash
  npm run dev
  ```
  No TypeScript errors in terminal. Ctrl+C.

- [ ] **Step 5: Commit**
  ```bash
  git add src/content/
  git commit -m "feat: add content collections schema and sample content"
  ```

---

## Task 6: Homepage — Magazine Grid

> 🤖 Agent task.

**File:** `src/pages/index.astro`

- [ ] **Step 1: Write `src/pages/index.astro`**
  ```astro
  ---
  import BaseLayout from '../layouts/BaseLayout.astro'
  import Nav from '../components/Nav.astro'
  import Footer from '../components/Footer.astro'
  import TagPill from '../components/TagPill.astro'
  import ArticleCard from '../components/ArticleCard.astro'
  import SidebarPost from '../components/SidebarPost.astro'
  import Ticker from '../components/Ticker.astro'
  import NewsletterBanner from '../components/NewsletterBanner.astro'
  import { getCollection } from 'astro:content'

  const allArticles = (await getCollection('articles')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  )
  const allLogs = (await getCollection('log')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  )

  const heroPost = allArticles[0]
  const sidebarPosts = allArticles.slice(1, 4)
  const recentArticles = allArticles.slice(4, 7)
  const recentLogs = allLogs.slice(0, 3)

  const tickerItems = allArticles.slice(0, 4).map(a => a.data.title)
  ---

  <BaseLayout title="Home" description="AI, as I actually use it. By Sunil Katal.">
    <Nav />

    <Ticker items={tickerItems.length ? tickerItems : ['Welcome to inside.ai']} />

    <!-- MAGAZINE GRID -->
    {heroPost && (
      <div class="grid grid-cols-[2fr_1fr] border-b border-border mx-10">
        <!-- HERO -->
        <div class="bg-dark text-white p-10 border-r border-[#333]">
          <TagPill tag={heroPost.data.tag} />
          <a href={`/articles/${heroPost.slug}`} class="no-underline text-white hover:opacity-80 transition-opacity">
            <h1 class="text-3xl font-black leading-tight mt-4 mb-4">{heroPost.data.title}</h1>
          </a>
          <p class="text-[13px] text-[#aaa] leading-relaxed mb-6">{heroPost.data.excerpt}</p>
          <div class="flex gap-4 text-[10px] text-[#666]">
            <span>{new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(heroPost.data.date)}</span>
            <span>·</span>
            <span>{heroPost.data.readTime}</span>
          </div>
          <a href={`/articles/${heroPost.slug}`} class="btn-accent inline-block mt-6">Read Article →</a>
        </div>

        <!-- SIDEBAR -->
        <div class="flex flex-col">
          {sidebarPosts.map(post => (
            <SidebarPost
              title={post.data.title}
              slug={post.slug}
              tag={post.data.tag}
              date={post.data.date}
              readTime={post.data.readTime}
            />
          ))}
        </div>
      </div>
    )}

    <!-- RECENT ARTICLES -->
    {recentArticles.length > 0 && (
      <div>
        <div class="px-10 py-5 text-[10px] font-black tracking-wide border-b-2 border-dark flex justify-between items-center">
          <span>RECENT ARTICLES</span>
          <a href="/articles" class="text-accent no-underline font-bold">View all →</a>
        </div>
        <div class="grid grid-cols-3 px-10 border-b border-border">
          {recentArticles.map(post => (
            <ArticleCard
              title={post.data.title}
              slug={post.slug}
              tag={post.data.tag}
              excerpt={post.data.excerpt}
              date={post.data.date}
              readTime={post.data.readTime}
            />
          ))}
        </div>
      </div>
    )}

    <!-- DAILY LOG STRIP -->
    {recentLogs.length > 0 && (
      <div class="bg-gray-50 px-10 py-8 border-b border-border">
        <div class="text-[10px] font-black tracking-wide border-l-4 border-accent pl-3 mb-5">
          DAILY LOG — AI AS I ACTUALLY USE IT
        </div>
        <div class="flex flex-col gap-0">
          {recentLogs.map(entry => (
            <div class="flex gap-5 items-start py-4 border-b border-[#e0e0e0] last:border-b-0">
              <span class="text-[10px] text-[#aaa] min-w-[52px] font-semibold pt-0.5">
                {new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' }).format(entry.data.date).toUpperCase()}
              </span>
              <div>
                <a href={`/log/${entry.slug}`} class="no-underline text-dark hover:opacity-70">
                  <h4 class="text-[13px] font-bold leading-snug mb-1">{entry.data.title}</h4>
                </a>
                <p class="text-[11px] text-muted">{entry.data.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    <NewsletterBanner />
    <Footer />
  </BaseLayout>
  ```

- [ ] **Step 2: Verify homepage renders**
  ```bash
  npm run dev
  ```
  Open `http://localhost:4321`. Should see: Nav → Ticker → Magazine grid (hero + sidebar) → Recent articles → Daily log strip. Ctrl+C.

- [ ] **Step 3: Commit**
  ```bash
  git add src/pages/index.astro
  git commit -m "feat: build homepage magazine grid layout"
  ```

---

## Task 7: Newsletter Banner Component

> 🤖 Agent task.

**File:** `src/components/NewsletterBanner.astro`

> ⚠️ The Beehiiv embed code goes here. Get it in Task 13. For now, use a placeholder form.

- [ ] **Step 1: Write `src/components/NewsletterBanner.astro`**
  ```astro
  ---
  // Replace the form below with your Beehiiv embed code in Task 13
  ---
  <section id="newsletter" class="bg-dark text-white px-10 py-12 flex justify-between items-center">
    <div>
      <h2 class="text-2xl font-black leading-snug">AI, as I actually use it.<br />In your inbox.</h2>
      <p class="text-[12px] text-[#aaa] mt-2">No hype. No sponsored takes. Just real notes from daily use. Free.</p>
    </div>
    <!-- REPLACE THIS WITH BEEHIIV EMBED CODE IN TASK 13 -->
    <div class="flex">
      <input
        type="email"
        placeholder="your@email.com"
        class="bg-[#222] border border-[#444] text-white text-[12px] px-4 py-3 w-64 outline-none placeholder:text-[#666]"
      />
      <button class="btn-accent px-5 py-3">Subscribe →</button>
    </div>
  </section>
  ```

- [ ] **Step 2: Commit**
  ```bash
  git add src/components/NewsletterBanner.astro
  git commit -m "feat: add newsletter banner (Beehiiv embed placeholder)"
  ```

---

## Task 8: Intro Animation

> 🤖 Agent task.

**File:** `src/components/IntroAnimation.tsx`

- [ ] **Step 1: Write `src/components/IntroAnimation.tsx`**
  ```tsx
  import { useEffect, useRef, useState } from 'react'

  export default function IntroAnimation() {
    const [visible, setVisible] = useState(true)
    const [exiting, setExiting] = useState(false)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
      if (sessionStorage.getItem('intro-seen')) {
        setVisible(false)
        return
      }

      // Particles
      const canvas = canvasRef.current!
      const ctx = canvas.getContext('2d')!
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const particles: { x: number; y: number; speed: number; size: number; opacity: number }[] = []
      for (let i = 0; i < 60; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: canvas.height + Math.random() * 200,
          speed: 0.5 + Math.random() * 1.5,
          size: 1 + Math.random() * 2,
          opacity: 0.3 + Math.random() * 0.7,
        })
      }

      let animFrame: number
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        particles.forEach(p => {
          p.y -= p.speed
          if (p.y < -10) p.y = canvas.height + 10
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(168, 255, 0, ${p.opacity})`
          ctx.fill()
        })
        animFrame = requestAnimationFrame(animate)
      }
      animate()

      const timer = setTimeout(() => exit(), 4200)
      return () => { clearTimeout(timer); cancelAnimationFrame(animFrame) }
    }, [])

    const exit = () => {
      sessionStorage.setItem('intro-seen', '1')
      setExiting(true)
      setTimeout(() => setVisible(false), 800)
    }

    if (!visible) return null

    return (
      <div
        onClick={exit}
        style={{
          position: 'fixed', inset: 0, background: '#000', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', cursor: 'pointer',
          opacity: exiting ? 0 : 1,
          transition: 'opacity 0.8s ease',
        }}
      >
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />

        {/* Glow */}
        <div style={{
          position: 'absolute', width: 340, height: 340, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,255,0,0.07) 0%, transparent 70%)',
        }} />

        {/* Prompt */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center' }}>
            <span style={{
              color: '#A8FF00', fontSize: 32, fontFamily: 'monospace',
              animation: 'fadeIn 0.4s ease 0.3s both',
            }}>{'>'}</span>
            <span style={{
              color: '#fff', fontSize: 52, fontWeight: 900, letterSpacing: 6,
              animation: 'typeIn 1s steps(9,end) 0.7s both',
              overflow: 'hidden', whiteSpace: 'nowrap',
              display: 'inline-block',
            }}>inside.ai</span>
            <span style={{
              display: 'inline-block', width: 3, height: 52,
              background: '#A8FF00', verticalAlign: 'middle',
              animation: 'blink 0.7s step-end infinite',
            }} />
          </div>
          <p style={{
            color: '#555', fontSize: 11, letterSpacing: 4, textTransform: 'uppercase',
            marginTop: 16, animation: 'fadeIn 0.6s ease 2s both',
          }}>AI, as I actually use it.</p>
        </div>

        {/* Enter hint */}
        <p style={{
          position: 'absolute', bottom: 48, color: '#444',
          fontSize: 10, letterSpacing: 3, textTransform: 'uppercase',
          animation: 'fadeIn 0.6s ease 2.6s both',
        }}>Click anywhere to enter ↓</p>

        <style>{`
          @keyframes fadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
          @keyframes typeIn { from { width:0; } to { width:9ch; } }
          @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        `}</style>
      </div>
    )
  }
  ```

- [ ] **Step 2: Add animation to homepage**
  In `src/pages/index.astro`, add after the imports at the top:
  ```astro
  import IntroAnimation from '../components/IntroAnimation'
  ```
  And add as the first element inside `<BaseLayout>`:
  ```astro
  <IntroAnimation client:only="react" />
  ```

- [ ] **Step 3: Verify animation plays**
  ```bash
  npm run dev
  ```
  Open `http://localhost:4321` in a private/incognito window (so sessionStorage is fresh).
  Expected: Black screen → particles float → `> inside.ai` types → tagline fades → homepage appears.
  Second visit (normal window): No animation, homepage appears immediately. Ctrl+C.

- [ ] **Step 4: Commit**
  ```bash
  git add src/components/IntroAnimation.tsx src/pages/index.astro
  git commit -m "feat: add terminal intro animation with sessionStorage guard"
  ```

---

## Task 9: Articles Index Page

> 🤖 Agent task.

**File:** `src/pages/articles/index.astro`

- [ ] **Step 1: Write `src/pages/articles/index.astro`**
  ```astro
  ---
  import BaseLayout from '../../layouts/BaseLayout.astro'
  import Nav from '../../components/Nav.astro'
  import Footer from '../../components/Footer.astro'
  import ArticleCard from '../../components/ArticleCard.astro'
  import { getCollection } from 'astro:content'

  const allArticles = (await getCollection('articles')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  )

  const tags = ['ALL', 'DEEP DIVE', 'TOOLS', 'OPINION']
  ---

  <BaseLayout title="Articles">
    <Nav />
    <div class="px-10 py-10 max-w-screen-xl mx-auto">
      <h1 class="text-5xl font-black mb-8">ALL ARTICLES</h1>

      <!-- Tag filter (client-side via JS) -->
      <div class="flex gap-3 mb-10" id="tag-filter">
        {tags.map(tag => (
          <button
            data-tag={tag}
            class="tag-pill border border-dark cursor-pointer hover:bg-dark hover:text-accent transition-colors"
            style={tag === 'ALL' ? 'background:#111;color:#A8FF00;' : ''}
          >
            {tag}
          </button>
        ))}
      </div>

      <!-- Article grid -->
      <div class="grid grid-cols-3 gap-8" id="article-grid">
        {allArticles.map(post => (
          <div data-tag={post.data.tag} class="article-item" style="display:none">
            <ArticleCard
              title={post.data.title}
              slug={post.slug}
              tag={post.data.tag}
              excerpt={post.data.excerpt}
              date={post.data.date}
              readTime={post.data.readTime}
            />
          </div>
        ))}
      </div>
      <div class="text-center mt-10">
        <button id="load-more" class="btn-accent px-8 py-3" style="display:none">Load more</button>
      </div>
    </div>
    <Footer />
  </BaseLayout>

  <script>
    const ITEMS_PER_PAGE = 10
    const buttons = document.querySelectorAll('#tag-filter button')
    const items = Array.from(document.querySelectorAll('.article-item')) as HTMLElement[]
    const loadMoreBtn = document.getElementById('load-more') as HTMLButtonElement
    let activeTag = 'ALL'
    let visibleCount = ITEMS_PER_PAGE

    function renderItems() {
      const filtered = items.filter(item =>
        activeTag === 'ALL' || item.getAttribute('data-tag') === activeTag
      )
      filtered.forEach((item, i) => {
        item.style.display = i < visibleCount ? 'block' : 'none'
      })
      if (loadMoreBtn) {
        loadMoreBtn.style.display = visibleCount >= filtered.length ? 'none' : 'block'
      }
    }

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        activeTag = btn.getAttribute('data-tag') ?? 'ALL'
        visibleCount = ITEMS_PER_PAGE
        buttons.forEach(b => { (b as HTMLElement).style.cssText = '' })
        ;(btn as HTMLElement).style.cssText = 'background:#111;color:#A8FF00;'
        renderItems()
      })
    })

    loadMoreBtn?.addEventListener('click', () => {
      visibleCount += ITEMS_PER_PAGE
      renderItems()
    })

    renderItems()
  </script>
  ```

- [ ] **Step 2: Verify**
  ```bash
  npm run dev
  ```
  Open `http://localhost:4321/articles`. Should see page title, tag filter buttons, article grid. Click tag buttons — articles filter correctly. Ctrl+C.

- [ ] **Step 3: Commit**
  ```bash
  git add src/pages/articles/index.astro
  git commit -m "feat: add articles index page with tag filter"
  ```

---

## Task 10: Article Detail Page

> 🤖 Agent task.

**File:** `src/pages/articles/[slug].astro`

- [ ] **Step 1: Write `src/pages/articles/[slug].astro`**
  ```astro
  ---
  import BaseLayout from '../../layouts/BaseLayout.astro'
  import Nav from '../../components/Nav.astro'
  import Footer from '../../components/Footer.astro'
  import TagPill from '../../components/TagPill.astro'
  import NewsletterBanner from '../../components/NewsletterBanner.astro'
  import GiscusComments from '../../components/GiscusComments.astro'
  import { getCollection, getEntry } from 'astro:content'

  export async function getStaticPaths() {
    const posts = await getCollection('articles')
    return posts.map(post => ({ params: { slug: post.slug } }))
  }

  const { slug } = Astro.params
  const post = await getEntry('articles', slug!)
  if (!post) return Astro.redirect('/articles')

  const { Content } = await post.render()
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  }).format(post.data.date)
  ---

  <BaseLayout title={post.data.title} description={post.data.excerpt}>
    <Nav />
    <article class="px-10 py-12 max-w-[680px] mx-auto">
      <div class="mb-6">
        <TagPill tag={post.data.tag} />
        <h1 class="text-4xl font-black leading-tight mt-4 mb-4">{post.data.title}</h1>
        <div class="flex gap-4 text-[11px] text-muted">
          <span>{formattedDate}</span>
          <span>·</span>
          <span>{post.data.readTime}</span>
        </div>
      </div>
      <div class="prose prose-lg max-w-none
        [&_h2]:text-2xl [&_h2]:font-black [&_h2]:mt-10 [&_h2]:mb-4
        [&_p]:text-[15px] [&_p]:leading-[1.8] [&_p]:mb-5 [&_p]:text-dark
        [&_a]:text-accent [&_a]:no-underline [&_a:hover]:underline">
        <Content />
      </div>
    </article>
    <div class="max-w-[680px] mx-auto px-10 pb-6">
      <div class="border-t border-border pt-8 text-[11px] text-muted mb-2">Enjoyed this? Join the newsletter.</div>
    </div>
    <NewsletterBanner />
    <div class="max-w-[900px] mx-auto px-10 py-10">
      <GiscusComments />
    </div>
    <Footer />
  </BaseLayout>
  ```

- [ ] **Step 2: Verify**
  ```bash
  npm run dev
  ```
  Open `http://localhost:4321/articles/hello-world`. Should see article with tag, headline, date, body content, newsletter banner, comments placeholder. Ctrl+C.

- [ ] **Step 3: Commit**
  ```bash
  git add src/pages/articles/[slug].astro
  git commit -m "feat: add article detail page"
  ```

---

## Task 11: Daily Log Pages

> 🤖 Agent task.

**Files:** `src/pages/log/index.astro`, `src/pages/log/[slug].astro`

- [ ] **Step 1: Write `src/pages/log/index.astro`**
  ```astro
  ---
  import BaseLayout from '../../layouts/BaseLayout.astro'
  import Nav from '../../components/Nav.astro'
  import Footer from '../../components/Footer.astro'
  import { getCollection } from 'astro:content'

  const entries = (await getCollection('log')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  )
  ---

  <BaseLayout title="Daily Log">
    <Nav />
    <div class="px-10 py-10 max-w-[720px] mx-auto">
      <h1 class="text-5xl font-black mb-2">DAILY LOG</h1>
      <p class="text-muted text-sm mb-10">AI as I actually use it, day by day.</p>
      <div class="flex flex-col" id="log-list">
        {entries.map(entry => {
          const date = new Intl.DateTimeFormat('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric'
          }).format(entry.data.date)
          return (
            <div class="log-entry flex gap-8 items-start py-6 border-b border-border last:border-b-0" style="display:none">
              <span class="text-[10px] text-[#aaa] font-semibold min-w-[72px] pt-1 uppercase">{date}</span>
              <div>
                <a href={`/log/${entry.slug}`} class="no-underline text-dark hover:opacity-70">
                  <h3 class="text-[14px] font-bold leading-snug mb-1">{entry.data.title}</h3>
                </a>
                <p class="text-[11px] text-muted">{entry.data.summary}</p>
              </div>
            </div>
          )
        })}
      </div>
      <div class="text-center mt-10">
        <button id="log-load-more" class="btn-accent px-8 py-3" style="display:none">Load more</button>
      </div>
    </div>

  <script>
    const ITEMS = 10
    const entries = Array.from(document.querySelectorAll('.log-entry')) as HTMLElement[]
    const btn = document.getElementById('log-load-more') as HTMLButtonElement
    let shown = ITEMS

    function render() {
      entries.forEach((el, i) => { el.style.display = i < shown ? 'flex' : 'none' })
      btn.style.display = shown >= entries.length ? 'none' : 'block'
    }

    btn?.addEventListener('click', () => { shown += ITEMS; render() })
    render()
  </script>
    <Footer />
  </BaseLayout>
  ```

- [ ] **Step 2: Write `src/pages/log/[slug].astro`**
  ```astro
  ---
  import BaseLayout from '../../layouts/BaseLayout.astro'
  import Nav from '../../components/Nav.astro'
  import Footer from '../../components/Footer.astro'
  import { getCollection, getEntry } from 'astro:content'

  export async function getStaticPaths() {
    const entries = await getCollection('log')
    return entries.map(entry => ({ params: { slug: entry.slug } }))
  }

  const { slug } = Astro.params
  const entry = await getEntry('log', slug!)
  if (!entry) return Astro.redirect('/log')

  const entries = (await getCollection('log')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  )
  const idx = entries.findIndex(e => e.slug === slug)
  const prev = entries[idx + 1]
  const next = entries[idx - 1]

  const { Content } = await entry.render()
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  }).format(entry.data.date)
  ---

  <BaseLayout title={entry.data.title} description={entry.data.summary}>
    <Nav />
    <article class="px-10 py-12 max-w-[680px] mx-auto">
      <span class="tag-pill-dark">DAILY LOG</span>
      <div class="text-4xl font-black mt-4 mb-2">{formattedDate}</div>
      <h1 class="text-2xl font-black leading-snug mb-8">{entry.data.title}</h1>
      <div class="[&_p]:text-[15px] [&_p]:leading-[1.8] [&_p]:mb-5 [&_p]:text-dark">
        <Content />
      </div>
      <div class="flex justify-between mt-12 pt-6 border-t border-border text-[11px]">
        {prev
          ? <a href={`/log/${prev.slug}`} class="text-dark no-underline hover:text-accent">← {prev.data.title}</a>
          : <span />
        }
        {next && (
          <a href={`/log/${next.slug}`} class="text-dark no-underline hover:text-accent">{next.data.title} →</a>
        )}
      </div>
    </article>
    <Footer />
  </BaseLayout>
  ```

- [ ] **Step 3: Verify**
  ```bash
  npm run dev
  ```
  Open `http://localhost:4321/log` — see list of log entries.
  Open `http://localhost:4321/log/day-one` — see log entry with prev/next navigation. Ctrl+C.

- [ ] **Step 4: Commit**
  ```bash
  git add src/pages/log/
  git commit -m "feat: add daily log index and entry pages"
  ```

---

## Task 12: About Page

> 🤖 Agent task. ⚠️ Sunil: fill in the bio text after the page is built.

**File:** `src/pages/about.astro`

- [ ] **Step 1: Write `src/pages/about.astro`**
  ```astro
  ---
  import BaseLayout from '../layouts/BaseLayout.astro'
  import Nav from '../components/Nav.astro'
  import Footer from '../components/Footer.astro'
  import NewsletterBanner from '../components/NewsletterBanner.astro'
  ---

  <BaseLayout title="About" description="Sunil Katal writes about using AI every day.">
    <Nav />
    <div class="px-10 py-16 max-w-[720px] mx-auto">
      <h1 class="text-4xl font-black leading-tight mb-8">
        I'm Sunil. I use AI every day so you don't have to figure it out alone.
      </h1>

      <!-- ⚠️ SUNIL: Replace this paragraph with your real bio -->
      <p class="text-[15px] leading-[1.8] text-dark mb-6">
        I'm a co-founder based in Gurugram. I started inside.ai because I couldn't find a single honest account of how AI actually gets used in a real business — not the hype, not the theory, just the day-to-day reality. So I write it myself.
      </p>
      <p class="text-[15px] leading-[1.8] text-dark mb-10">
        Every day I use Claude, ChatGPT, Gemini, Midjourney, Perplexity, and a dozen other tools. Some of them are genuinely transformative. Some are overhyped. I write about both.
      </p>

      <div class="border-l-4 border-accent pl-6 mb-12">
        <h2 class="text-[13px] font-black uppercase tracking-tag mb-4">What to expect on inside.ai</h2>
        <ul class="flex flex-col gap-3 text-[13px] text-dark">
          <li>📋 <strong>Deep Dives</strong> — Long-form experiments, comparisons, and honest reviews</li>
          <li>📅 <strong>Daily Logs</strong> — Short, dated notes on what I used and what happened</li>
          <li>🔧 <strong>Tool Reviews</strong> — Specific takes on the AI tools worth your time</li>
          <li>💬 <strong>Opinions</strong> — Unfiltered views on where AI is actually going</li>
        </ul>
      </div>
    </div>

    <NewsletterBanner />
    <Footer />
  </BaseLayout>
  ```

- [ ] **Step 2: Verify**
  ```bash
  npm run dev
  ```
  Open `http://localhost:4321/about`. Ctrl+C.

- [ ] **Step 3: Commit**
  ```bash
  git add src/pages/about.astro
  git commit -m "feat: add about page"
  ```

---

## Task 13: Tina CMS Setup

> 🤖 Agent task + ⚠️ Sunil creates a Tina Cloud account.

**Files:** `tina/config.ts`

- [ ] **Step 1: Install Tina CMS**
  ```bash
  npx @tinacms/cli@latest init
  ```
  When prompted: choose "Self-hosted" → press Enter through defaults.

- [ ] **Step 2: Write `tina/config.ts`**
  Replace the contents with:
  ```ts
  import { defineConfig } from 'tinacms'

  export default defineConfig({
    branch: 'main',
    clientId: process.env.TINA_PUBLIC_CLIENT_ID ?? '',
    token: process.env.TINA_TOKEN ?? '',
    build: { outputFolder: 'admin', publicFolder: 'public' },
    media: { tina: { mediaRoot: 'images', publicFolder: 'public' } },
    schema: {
      collections: [
        {
          name: 'articles',
          label: 'Articles',
          path: 'src/content/articles',
          format: 'mdx',
          fields: [
            { type: 'string', name: 'title', label: 'Title', required: true, isTitle: true },
            { type: 'datetime', name: 'date', label: 'Date', required: true },
            { type: 'string', name: 'tag', label: 'Tag', required: true,
              options: ['DEEP DIVE', 'TOOLS', 'OPINION'] },
            { type: 'string', name: 'excerpt', label: 'Excerpt (max 200 chars)', required: true },
            { type: 'string', name: 'readTime', label: 'Read Time (e.g. 5 min read)', required: true },
            { type: 'rich-text', name: 'body', label: 'Body', isBody: true },
          ],
        },
        {
          name: 'log',
          label: 'Daily Log',
          path: 'src/content/log',
          format: 'mdx',
          fields: [
            { type: 'string', name: 'title', label: 'Title', required: true, isTitle: true },
            { type: 'datetime', name: 'date', label: 'Date', required: true },
            { type: 'string', name: 'summary', label: 'One-line summary (max 100 chars)', required: true },
            { type: 'rich-text', name: 'body', label: 'Body', isBody: true },
          ],
        },
      ],
    },
  })
  ```

- [ ] **Step 3: ⚠️ Sunil — Create Tina Cloud account**
  Go to app.tina.io → Sign in with GitHub → Create a project → Connect your `inside-ai-blog` repo.
  Copy the **Client ID** and **Token** from the Tina dashboard.

- [ ] **Step 4: Test Tina locally**
  ```bash
  npx tinacms dev -c "astro dev"
  ```
  Open `http://localhost:4321/admin`. Should see the Tina CMS editor with Articles and Daily Log sections. Ctrl+C.

- [ ] **Step 5: Commit**
  ```bash
  git add tina/ public/admin/
  git commit -m "feat: configure Tina CMS with articles and log collections"
  ```

---

## Task 14: Beehiiv Newsletter Embed

> ⚠️ Sunil does Steps 1-2. 🤖 Agent does Step 3.

- [ ] **Step 1: ⚠️ Get Beehiiv embed code**
  Log into beehiiv.com → Settings → Embed → Copy the JavaScript embed snippet. It looks like:
  ```html
  <div id="beehiiv-embed"></div>
  <script src="https://beehiiv.com/embed/..."></script>
  ```

- [ ] **Step 2: ⚠️ Share the embed code** with the agent (paste it in the chat).

- [ ] **Step 3: 🤖 Replace placeholder in `src/components/NewsletterBanner.astro`**
  Find the `<!-- REPLACE THIS WITH BEEHIIV EMBED CODE IN TASK 13 -->` comment and the placeholder form below it. Replace both with the Beehiiv embed code from Step 1.

- [ ] **Step 4: Verify embed renders**
  ```bash
  npm run dev
  ```
  Open `http://localhost:4321`. Scroll to newsletter section. Should see Beehiiv email input and subscribe button. Ctrl+C.

- [ ] **Step 5: Commit**
  ```bash
  git add src/components/NewsletterBanner.astro
  git commit -m "feat: integrate Beehiiv newsletter embed"
  ```

---

## Task 15: Giscus Comments

> ⚠️ Sunil does Steps 1-2. 🤖 Agent does Step 3.

- [ ] **Step 1: ⚠️ Enable Giscus on your GitHub repo**
  Go to github.com → your `inside-ai-blog` repo → Settings → Features → tick **Discussions**.
  Then go to giscus.app → enter your repo name → copy the generated `<script>` tag.

- [ ] **Step 2: ⚠️ Share the Giscus script tag** with the agent.

- [ ] **Step 3: 🤖 Write `src/components/GiscusComments.astro`**
  ```astro
  <!-- Paste the Giscus script tag generated at giscus.app here -->
  <!-- Example structure (values will differ): -->
  <script src="https://giscus.app/client.js"
    data-repo="YOUR-NAME/inside-ai-blog"
    data-repo-id="YOUR-REPO-ID"
    data-category="General"
    data-category-id="YOUR-CATEGORY-ID"
    data-mapping="pathname"
    data-reactions-enabled="1"
    data-theme="light"
    crossorigin="anonymous"
    async>
  </script>
  ```

- [ ] **Step 4: Verify**
  ```bash
  npm run dev
  ```
  Open `http://localhost:4321/articles/hello-world`. Scroll to bottom. Should see Giscus comments section (may require GitHub login to comment). Ctrl+C.

- [ ] **Step 5: Commit**
  ```bash
  git add src/components/GiscusComments.astro
  git commit -m "feat: add Giscus comments to article pages"
  ```

---

## Task 16: Deploy to Netlify

> ⚠️ Sunil does Steps 1-3. 🤖 Agent does Step 4.

- [ ] **Step 1: ⚠️ Push all code to GitHub**
  ```bash
  git push origin main
  ```

- [ ] **Step 2: ⚠️ Connect repo to Netlify**
  Log into netlify.com → Add new site → Import from GitHub → Choose `inside-ai-blog` →
  - Build command: `npx tinacms build && astro build`
  - Publish directory: `dist`
  - Click **Deploy site**

- [ ] **Step 3: ⚠️ Add environment variables in Netlify**
  Netlify dashboard → Site settings → Environment variables → Add:
  - `TINA_PUBLIC_CLIENT_ID` = (value from Task 13 Step 3)
  - `TINA_TOKEN` = (value from Task 13 Step 3)

- [ ] **Step 4: 🤖 Add Netlify adapter to Astro config**
  ```bash
  npx astro add netlify --yes
  ```
  Then update `astro.config.mjs`:
  ```js
  import { defineConfig } from 'astro/config'
  import react from '@astrojs/react'
  import tailwind from '@astrojs/tailwind'
  import netlify from '@astrojs/netlify'

  export default defineConfig({
    integrations: [react(), tailwind()],
    output: 'static',
    adapter: netlify(),
  })
  ```

- [ ] **Step 5: Push and verify deploy**
  ```bash
  git add astro.config.mjs
  git commit -m "chore: add Netlify adapter"
  git push origin main
  ```
  In Netlify dashboard, watch the deploy log. Expected: green ✅ "Published". Click the Netlify URL (looks like `https://random-name.netlify.app`) — site should be live.

---

## Task 17: Connect inside.ai Domain

> ⚠️ Sunil does all steps.

- [ ] **Step 1: Add custom domain in Netlify**
  Netlify dashboard → Domain management → Add custom domain → Type `inside.ai` → Verify.

- [ ] **Step 2: Update DNS at your domain registrar**
  Log into wherever you bought inside.ai → DNS settings → Add/update:
  - Type: `A` | Name: `@` | Value: `75.2.60.5` (Netlify's load balancer)
  - Type: `CNAME` | Name: `www` | Value: `YOUR-SITE.netlify.app`

- [ ] **Step 3: Wait for DNS to propagate**
  This takes 15 minutes to 48 hours. Check progress at dnschecker.org.

- [ ] **Step 4: Enable HTTPS**
  Netlify dashboard → Domain management → HTTPS → Click "Verify DNS configuration" → Enable SSL. Netlify handles this for free automatically.

- [ ] **Step 5: Verify live site**
  Open `https://inside.ai` in browser. Should load the full site with intro animation, nav, homepage. ✅

---

## Task 18: End-to-End Publish Test

> ⚠️ Sunil does this — verifies the full writing workflow.

- [ ] **Step 1: Open Tina CMS**
  Go to `https://inside.ai/admin` → Log in with GitHub.

- [ ] **Step 2: Write your first real post**
  Click Articles → New Article → Fill in: title, date (today), tag, excerpt, read time, body → Click Save.

- [ ] **Step 3: Wait ~60 seconds**
  Netlify auto-detects the GitHub commit from Tina and rebuilds.

- [ ] **Step 4: Verify post is live**
  Open `https://inside.ai`. New post should appear as the hero on the homepage and at `/articles/your-slug`.

- [ ] **Step 5: Test newsletter subscribe**
  Enter your own email in the subscribe form → Check your inbox for the Beehiiv confirmation email.

- [ ] **Step 6: Test comments**
  Go to your new article → Scroll to comments → Leave a test comment via GitHub login.

**If all 6 steps pass: inside.ai is live and fully functional. 🎉**

---

## Post-Launch: Growth Checklist (Phase 1)

> ⚠️ Sunil does these after the site is live.

- [ ] Submit sitemap to Google Search Console: `https://search.google.com/search-console` → Add property `inside.ai` → Submit `https://inside.ai/sitemap.xml`
- [ ] Share your first post on LinkedIn (personal post, not page)
- [ ] Share on Twitter/X with `#AI #BuildingInPublic`
- [ ] Tell 10 people you know personally — ask them to subscribe
- [ ] Write your second post within 48 hours of launch (momentum matters most in week 1)
