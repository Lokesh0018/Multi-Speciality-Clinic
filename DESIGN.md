# Dr. Kimidi Multispeciality Clinic — Design System

Brand theme from the logo (`src/assets/media/logo-mark.webp`): crimson cross and profile, navy tooth, clean white grounds.
Stack: React 18 · Vite 6 · Tailwind CSS v4 · GSAP 3 (ScrollTrigger, @gsap/react).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Replacing placeholders

All content lives in `src/content/clinic.js`. Anything in `[brackets]` or an empty string is a placeholder.
Publish only information the clinic has verified: contact numbers, doctor names, qualifications,
registration numbers, services, addresses, hours and FAQ answers.

- **WhatsApp / phone**: set `clinic.contact.whatsapp` (digits only, e.g. `91XXXXXXXXXX`) and `clinic.contact.phone` (`+91…`).
  Until they're set, every CTA scrolls to `#contact` so no wrong number is ever dialled. Each branch can override them.
- **Hero film**: lives in `src/assets/videos/` (webm, mp4 and a 720p mp4 for mobile) with its poster in `src/assets/images/`.
  For a seamless loop, export 12–20 s at 1080p with the last frame matching the first (or crossfade the tail into the head), with no audio, under about 6 MB.
  Until then, a slowly drifting forest-and-champagne light scene shows in its place.
- **Logo**: the header and footer use `src/assets/media/logo-mark.webp`, a transparent crop of the logo mark.
- **Sample photography**: `src/assets/media/placeholders/*.jpg` are free stock photos from Pexels (Pexels licence). Doctor portraits carry a visible "Sample photo" badge (`image.sample: true`). Replace all of them with the clinic's own photos before launch.
- **Photography**: set `image.src` on specialities, doctors and branches. Frames are fixed at 4:5 (speciality, portrait) and 16:10 (branch).
  Each frame shows a labelled placeholder until it gets an image.
- **Maps**: set `branch.mapUrl`. Until then, "Directions" runs a Google Maps search for the clinic name and branch.

## Tokens (`src/index.css` → `@theme`)

| Role | Token | Hex | Use |
|---|---|---|---|
| Ground | `paper-100` | #F7F8FB | Page background |
| Surface | `paper-50` | #FFFFFF | Cards, alternate sections |
| Text / dark surface | `navy-900` | #122451 | Headings, body, hero/journey/contact panels |
| Logo navy | `navy-800` | #162C5D | Brand reference |
| Secondary text | `muted` | #4A5573 | Body copy on paper (7.3:1) |
| Primary CTA | `crimson-500` | #AD0407 | Logo red: WhatsApp / enquiry buttons (white text 7.6:1) |
| Accent text | `crimson-600` | #9A0A10 | Eyebrows, labels, icons |
| Deep red | `crimson-700` | #6F0205 | CTA hover |
| Detail | `blush-300/400` | #F3BCC0 / #E3838A | Text on navy only; decorative numerals and lines on paper |

**Type:** Cormorant Garamond (display, 400–600 plus italic accents) and Manrope (UI/body, 400–700).
Scale: `display-xl` (hero), `display-lg` (section), `display-md` (sub-section), `lede` (17–18px), body 16px with 1.65 line-height, `eyebrow` (11.5px, 0.22em uppercase).

**Shape:** cards 28px radius, pill buttons, 1px hairlines with a champagne fade. **Shadows:** `shadow-soft`, `shadow-lift`.
**Spacing:** sections use `py-24 md:py-36`; the container is 1320px wide with 20px / 40px gutters.
**Z-index:** mobile action bar 30 · header 40 · menu 50 · skip link 60.

## Page structure

1. **Floating header**: glass pill over the hero that turns solid ivory once you scroll past it. Holds Call and "Book on WhatsApp"; full-screen menu on mobile.
2. **Hero**: full-screen video slot, masked headline reveal, WhatsApp and phone CTAs, three speciality shortcuts, and a pause/play control (WCAG 2.2.2).
3. **Trust marquee** (`TrustMarquee.jsx`): white band under the hero; four facts scroll left continuously, faded at both edges. Each item: rounded-square crimson icon chip (fills solid crimson on hover, title turns crimson), Cormorant title over a muted detail line. Items are separated by small crimson medical crosses echoing the logo. 60 s loop, pauses on hover; static wrapped row under reduced motion. Content in `trustPoints`.
4. **Clinic intro**: editorial split with overlapping photography, a story placeholder and a quote slot.
5. **Specialities**: alternating 7/5 editorial rows for Skin, Hair and Dental. Each has a number, a summary, a service grid and an enquiry CTA that pre-fills WhatsApp.
6. **Your visit**: forest section with a four-step patient journey.
7. **Doctors**: three profile cards (portrait, speciality, qualifications, registration).
8. **Branches**: PM Palem and MVP Colony cards with address, hours, WhatsApp, Call and Directions.
9. **FAQ**: sticky heading and an accessible accordion.
10. **Contact**: inset forest panel with an enquiry form that writes a WhatsApp message (no backend, nothing sent automatically) and a privacy note.
11. **Footer**: links, branches and a medical disclaimer. On mobile, a sticky Call / WhatsApp bar stays at the bottom.

## Motion (`src/App.jsx`)

All motion is declared with data attributes and runs inside `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`.
With reduced motion on, nothing animates and the hero film shows its poster frame instead of autoplaying.

| Attribute | Effect |
|---|---|
| `data-reveal` | Fade-up 36px once, at 88% of the viewport |
| `data-parallax` | ±5% drift inside photography frames |

### Hero (`src/components/hero/`)

Four layers: `HeroVideo` (poster painted first, film fades in once it plays; hidden on autoplay refusal, source error or reduced motion), a navy gradient strongest on the left, `HeroContent` (eyebrow, ECG line, headline, CTAs, location) and `SpecialtyPanels` — three slanted, overlapping panels (`skewX(-9deg)` outer, counter-skewed image) pinned to the right half at lg+, a three-up card row below lg. A film pause/play control sits at the foot.

**Assets** (all in-repo, verified): `src/assets/videos/clinic-hero.{mp4,webm}` + `clinic-hero-720.mp4` (encoded from the clinic's film, played forward then reversed → ~19.8 s seamless loop), `src/assets/images/clinic-hero-poster.webp`, `skin-care.webp` (Pexels 8923173), `hair-care.webp` (Pexels 23349902), `dental-care.webp` (Pexels 6627574). Pexels licence: free for commercial use, no attribution required. Replace with the clinic's own film and photography when available — paths live in `src/content/clinic.js` as `asset('…')` calls, resolved by `src/lib/assets.js` (`clinic.media.heroVideo`, `hero.panels`).

**Entrance (lg+, one GSAP timeline, `power3/power4.out`, 0.6–1.1 s beats):** header → eyebrow → ECG line draws → headline lines rise through masks → copy → CTAs (stagger) → location → panels slide in from the right (stagger) → panel labels → scroll cue. The panel images settle in from a 1.16× zoom and a single diagonal light sweep crosses each one; afterwards they drift on a 16–22 s alternating Ken Burns loop (scale 1.07, ~1% pan, yoyo). Afterwards the ECG line softly breathes every ~4 s (no flashing). On scroll the content lifts and fades faster than the film; the panels stay fixed (no scroll or cursor parallax) and run the full hero height. Panel images enter with a top-down curtain wipe plus a zoom settle and then hold still (no continuous zoom); a light sweep crosses the three panels every ~7 s. On hover/focus a panel widens (`flex-grow` 1 → 1.7) and its icon lifts. Below lg a single staggered fade-up runs instead. Reduced motion: nothing animates and the film stays on its poster.

**Film-timed copy:** the hero copy steps aside from 2 s to 6 s of the forward pass only (loop time 2–6 s), then animates back in and stays for the rest of the loop, reverse pass included. Out: CTAs, copy, headline (rising out of its masks), eyebrow; the legibility shade fades with it. In: the reverse, like the entrance. Starts only after the entrance; hides even under the mouse, but never while keyboard focus (`:focus-visible`) is inside the copy; inactive when the film isn't playing. Window constants live at the top of `HeroSection.jsx`.

Micro-interactions use 200–300 ms colour and border transitions only. Nothing scales on hover, so layout never shifts.

## Accessibility

Skip link, semantic landmarks, labelled sections, visible sage focus rings, touch targets of at least 44–48px, form labels with inline errors and `aria-invalid`, an accordion using `aria-expanded`/`region`, the decorative video hidden from assistive tech, and a polite live region for form status.
