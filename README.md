# ITZFIZZ Scroll-Driven Hero

A hero section that matches the reference demo: scrolling drives an original sports car across a charcoal road, leaving a mint trail behind it. The trail reveals the black headline (it starts light on the dark road), and four stat cards sit in one row at the bottom and appear as you scroll.

**Stack:** HTML, CSS, JavaScript, GSAP (ScrollTrigger), Next.js (React), Tailwind CSS.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Deploy to GitHub Pages

1. Create a GitHub repo and push this project to the `main` branch.
2. In the repo go to **Settings > Pages** and set **Source** to **GitHub Actions**.
3. Push again (or run the workflow manually). The site goes live at
   `https://<your-username>.github.io/<repo-name>/`.

The workflow in `.github/workflows/deploy.yml` builds a static export (`output: "export"`) and sets the base path from the repo name automatically.

## How it works

| Requirement | Where |
| --- | --- |
| Letter-spaced headline, stats around the road | `components/Hero.jsx` |
| Load animation: headline reveals letter by letter and the vehicle fades in | intro timeline in `Hero.jsx` |
| Stat cards in one row at the bottom, revealed one by one (with count-up) as you scroll | scroll timeline in `Hero.jsx` |
| Headline letters spread apart as you scroll | per-letter `transform` tweens in `Hero.jsx` (no layout reflow) |
| Scroll-driven motion tied to scroll progress | `ScrollTrigger` with `pin` and `scrub: 1` in `Hero.jsx` |
| Green trail behind the vehicle | A masked layer: its wrapper slides right while its content slides left by the same amount, so the text stays put |
| Easing / interpolation | `scrub: 1` lets everything catch up to the scroll position over about a second |
| Performance | Only `transform` and `opacity` are animated. Nothing is measured or laid out during scroll |
| Accessibility | `prefers-reduced-motion` shows the final state with no pinning; screen readers get a single `h1`; content is visible if JS is off |

## Structure

```
app/          layout, global styles (Tailwind), page
components/
  Hero.jsx    layout + all GSAP animation
  Car.jsx     original top-view sports car as inline SVG
```

## Using your own image

The built-in visual is an original sports car drawn as an SVG. To use your own image or render instead, save it as `public/car.png` (or `public/car.webp`). The site picks it up automatically at build time and falls back to the built-in car if the file isn't there. Use a top-down view with the nose pointing right, roughly twice as wide as tall, with a transparent background.
