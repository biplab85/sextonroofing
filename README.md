# Sexton Roofing

Professional roofing, siding, windows, and doors contractor website for Sexton Roofing — serving Western Massachusetts for 40+ years.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** SCSS with BEM methodology
- **Animations:** Swiper.js (coverflow), CSS keyframes, requestAnimationFrame constellation effects
- **Gallery:** Fancyapps UI lightbox

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/          # Next.js App Router pages & layout
  components/
    home/       # Homepage sections (Hero, Services, FAQ, Testimonials, etc.)
    layout/     # Header, Footer
    ui/         # Reusable UI components (Icons, SectionHeader, etc.)
  data/         # Content data (content.tsx)
  hooks/        # Custom React hooks (useScrollReveal)
  styles/
    _variables.scss
    _mixins.scss
    globals.scss
    components/   # Component-level SCSS
    pages/        # Page-level SCSS
public/           # Static assets (images, fonts)
```

## Scripts

| Command         | Description              |
|-----------------|--------------------------|
| `npm run dev`   | Start dev server         |
| `npm run build` | Production build         |
| `npm run start` | Serve production build   |
| `npm run lint`  | Run ESLint               |
