# Portfolio — Next.js · Three.js · GSAP · Lenis · Motion · Lottie

## Run
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production check
```
Node 18.18+ (20 LTS recommended).

## Deploy (Vercel)
Push to GitHub → vercel.com → "Add New Project" → import repo → Deploy. No env vars needed.

## Where to edit
| What | File |
|---|---|
| Name, role, email, socials, CV path | `data/site.ts` |
| Images (20 on home = first 20) | `data/projects.ts` |
| Skills shown as 3D blocks | `data/skills.ts` |
| Services list | `data/services.ts` |
| Accent / black / white colours, fonts | `app/globals.css` (`@theme`) |
| Resume | replace `public/cv/resume.pdf` |
| Lottie animations | `lottie/*.json` |

### Using your own images
Put files in `public/images/work/` and set `src: "/images/work/01.jpg"` with the real `width`/`height`.
Then remove the picsum entries from `next.config.ts`.

## Structure
```
app/            layout (fonts, Lenis, preloader, cursor, nav), template (route fade), / and /work
components/
  layout/       SmoothScroll (Lenis+GSAP ticker), Preloader, Cursor, Nav
  sections/     Hero, About, SelectedWork, Skills, Services, Contact
  three/        HeroScene (wireframe city), SkillsPlayground (Rapier physics blocks)
  gallery/      GalleryCard, Lightbox, WorkGallery (filters)
  anim/ ui/     RevealText, Reveal, Magnetic, LottiePlayer, SectionLabel
data/  lib/  lottie/  public/cv/
```

## Who animates what
- **GSAP + ScrollTrigger** – scroll reveals, hero intro, scrubbed text, parallax
- **Lenis** – smooth scroll (driven by GSAP ticker)
- **Motion** – preloader, menu, cursor, lightbox, filter pill, hover/magnetic UI
- **Three.js (R3F + Drei + Rapier)** – hero scene, playable skills
- **Lottie** – availability pulse, scroll indicator
