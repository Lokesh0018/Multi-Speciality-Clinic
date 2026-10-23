/**
 * Specialty panel icons.
 *  - Skin: "glowing-skin" from Iconoven (MIT) — face with sparkle, the common dermatology/beauty mark.
 *  - Hair: in-house flowing strands, drawn to match Lucide's 1.75 px rounded stroke.
 *  - Dental: in-house molar, drawn to match Lucide's 1.75 px rounded stroke.
 * All render with currentColor so they inherit the label colour.
 */
const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export function FaceIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} dangerouslySetInnerHTML={{ __html: "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.75\"><circle cx=\"10\" cy=\"14\" r=\"7.25\"/><path d=\"M6.75 13c.55.65 1.45.65 2 0m2.5 0c.55.65 1.45.65 2 0M8.5 16.75q1.5 1.125 3 0m6.5-14c.4 2 1.25 2.85 3.25 3.25c-2 .4-2.85 1.25-3.25 3.25c-.4-2-1.25-2.85-3.25-3.25c2-.4 2.85-1.25 3.25-3.25\"/></g>" }} />
  )
}

/** Hair: three flowing strands — the common haircare mark, drawn at Lucide weight. */
export function FollicleIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M7 3c2.5 2.6 2.5 5.4 0 8s-2.5 5.4 0 8" />
      <path d="M12 3c2.5 2.6 2.5 5.4 0 8s-2.5 5.4 0 8" />
      <path d="M17 3c2.5 2.6 2.5 5.4 0 8s-2.5 5.4 0 8" />
    </svg>
  )
}

/** Dental: molar with a symmetric crown and twin roots. */
export function ToothIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M8.1 3.5c1.4 0 2.4.9 3.9.9s2.5-.9 3.9-.9c2.6 0 4.1 2.1 4.1 4.7 0 2.1-.7 3.4-1.4 5.1-.8 2-1 4.5-1.7 6.4-.3.8-1.1 1-1.6.3-.9-1.3-1.3-3.6-2.1-4.6-.5-.6-1.9-.6-2.4 0-.8 1-1.2 3.3-2.1 4.6-.5.7-1.3.5-1.6-.3-.7-1.9-.9-4.4-1.7-6.4C4.7 11.6 4 10.3 4 8.2c0-2.6 1.5-4.7 4.1-4.7Z" />
      <path d="M9.2 7.4c.6-.5 1.3-.7 2-.7" />
    </svg>
  )
}

export const PANEL_ICONS = { face: FaceIcon, follicle: FollicleIcon, tooth: ToothIcon }
