# How Foundable presents its product, and what BingoMart takes from it

Researched 2026-11-07 by reading foundable.com live (home, /solutions/small-businesses, /solutions/selling-online,
/solutions/run, /solutions/side-projects, /ideas, /pricing, /integrations) at desktop and phone width.
Everything under "What Foundable does" was seen on the site. Everything under "For BingoMart" is our call,
checked against `docs/strategy/mit-part1-bingo-answers.md` and `mit-part2-bingo-answers.md`.

## The one idea behind the whole site

Foundable sells a result, then shows the product doing it. It never lists features first.
Every page follows the same order: **promise (one line) → watch it work (a moving picture of the real app)
→ proof (numbers, logos) → what is handled (short tiles) → doubts answered (FAQ) → one button.**

This is the same lesson as MIT Part 2, slide 45: sell the benefit first, then the reason to believe.

## What Foundable does

### 1. Navigation: three menus, each answers one question

| Menu | Question it answers | Left column | Right column | Bottom strip |
|---|---|---|---|---|
| Product | What does it do? | "Ted builds": Websites, Selling online, Integrations | "Ted runs": Runs it for you, Marketing | Meet Ted → a demo |
| Solutions | Is it for me? | "Who it's for": Small businesses, Creators, Side projects | (none) | Start from an idea → a gallery |
| Resources | Can I trust it / learn more? | Learn: Blog, Help center, What's new | Connect: Community, Discord. Company: About, Careers | Latest blog post |

Each menu item has a 4–6 word subline in plain words ("From idea to a live site."). Every item opens its own page.

### 2. Home page: about 14,000px tall, but little text per screen

| # | Section | What is on screen | Media |
|---|---|---|---|
| 1 | Hero | One sentence, one subline, one big chat box whose placeholder types itself ("Ask Ted to build a business that…") | Animated clouds (canvas) and a mascot |
| 2 | Product reveal | A browser window that grows as you scroll and shows the real app dashboard ("What should I work on?", next steps, visitors) | A pinned, scroll-driven mockup of the app. **Not a video file**: the `<video>` tag has no source; the motion is HTML. |
| 3 | Proof | "14,000+ people have signed up" and 8 logos (Stanford, MIT, Google, Stripe…) | Logo strip |
| 4 | Story: "From idea to first customer" | Left: 5 short steps, each with a progress bar. Right: a large stage that changes to a different screen of the app per step (chat, site, prospect table, email draft, phone text) | Scroll-driven stepper, 5 canvases, ~70 SVGs |
| 5 | "Made for your business" | Tiles of things Ted makes: brand, post, deck, research, sheet. Each tile is a tiny real example, not a description | Static mockups |
| 6 | "Everything a business needs, handled" | Dark card. Left: 6 one-line promises (domain, payments, OK-before-send, phone, apps, data). Right: a grid of app icons that light up | Icon grid |
| 7 | Numbers | "4,800+ businesses started, 3,000+ websites built" | Soft gradient |
| 8 | FAQ | 7 plain questions: what is it, do I need to code, does it act without asking, cost, who owns it, payments | Accordion |

Text per item is one heading (3–7 words) plus one sentence. Paragraphs never run past two lines.

### 3. Solution pages all share one template

1. Eyebrow ("For small businesses") and a 3–5 word promise ("Ted handles the busywork.")
2. One sentence on what changes for this person, then two buttons: the main action and a sideways link.
3. "X, without Y" heading and 3 cards (feature, plus why it matters).
4. "How it works" in 3 numbered steps.
5. "What Ted handles" as 6 tiny tiles (two to five words each).
6. A FAQ written from this person's doubts.
7. One closing line ("Ted's ready. Are you?") and the button again.

/side-projects even tells the story in days: "Friday: tell Ted the idea. Sunday: it's live. Monday: it keeps going."

### 4. Other pages
- **/ideas**: a filterable gallery of 15 starting points ("A café or bakery", "A shop on your street"), each with app icons. It removes the blank-page problem.
- **/pricing**: 4 cards, a "Most popular" tag, "No card needed" under Free, then "Every plan includes", then a long, honest FAQ.
- **/integrations**: "How it works" in 3 steps, then every app, filterable by group.

### 5. Trust is built in sentences, not badges
"Ted asks first: he waits for your OK before anything goes public." "Foundable takes no fee." "Your data stays yours."
Each answers a fear before the buyer says it.

## For BingoMart: what to take, what to leave

Our goal (MIT Part 1, slide 36): "We help small online sellers in Myanmar manage orders and track deliveries by giving them one simple shop tool."
Our buyer feels pain now (MIT Part 2, slide 46): a lost order, an angry "where is my parcel?", a fake receipt.

| Foundable move | Take it? | BingoMart version |
|---|---|---|
| Show the product working, not a feature list | **Yes, first** | Replace the 6-item text grid with a stepper. Each step shows a small, animated copy of the real BingoMart screen: chat order, receipt check, parcel tracking, counter sale, profit report. We have 80 designed screens to copy from. **Built in this change.** |
| HTML mockups instead of video | **Yes** | Cheap, sharp on any screen, light on mobile data, and translatable. A video would need two languages and heavy downloads on weak Myanmar internet. |
| FAQ that answers fears | **Yes** | Answer the 4th Why (MIT Part 1, slide 23): will the AI act without me, does it work offline, which chats, what does it cost. Only claims we already make on the page. **Built in this change.** |
| One page per audience (Solutions) | Later | Template above, for chat sellers, counter shops and sellers who ship. Worth doing once the survey says which group is biggest. |
| Ideas gallery | Later, adapted | "Start from your shop type": fashion, beauty, food, each with a sample shop. Needs real sample shops first. |
| Proof numbers and logos | **Not yet** | We have no shops yet. Inventing numbers breaks trust. Add "X shops in early access" when it is true. |
| Integrations icon grid | Not yet | Payment apps and couriers we can actually connect to are not confirmed (see `myanmar-courier-api-research` notes). Show only what works. |
| Typing chat box in the hero | No | It fits an AI that builds anything. Our hero should show an order, which it already does. |
| Long pricing page | Not yet | Prices are still [TO CHECK] in MIT Part 2. |

## Rules for writing BingoMart pages, taken from Foundable
1. One promise per section, 3–7 words. One sentence under it.
2. Show a screen before you describe it.
3. Say who stays in control ("you approve every receipt") wherever the AI acts.
4. Every page ends with the same single action: join early access.
5. Burmese first for sellers: every visual must carry translatable text, not text baked into images.
