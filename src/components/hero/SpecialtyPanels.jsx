import { hero } from '../../content/clinic'
import SpecialtyPanel from './SpecialtyPanel'

/**
 * Desktop: three overlapping slanted panels pinned to the right half, full hero height.
 * The hovered (or keyboard-focused) panel widens; its neighbours give way.
 *
 * Equal visible widths: each inner panel loses 64px (52px slant + 12px covered
 * by the next panel). The last panel has a straight right edge, so it only loses
 * 26px on average; its -38px right margin pushes the difference past the
 * section edge (clipped by the hero's overflow-hidden), so all three show the
 * same amount of image. Keep these in sync with `--s` in SpecialtyPanel.
 * Below lg: a compact three-up row under the hero copy.
 */
export default function SpecialtyPanels({ onSelect }) {
  return (
    <nav
      aria-label="Specialities"
      className="relative grid h-44 grid-cols-3 gap-2 sm:h-56 lg:absolute lg:inset-y-0 lg:right-0 lg:flex lg:h-auto lg:w-[50%] lg:gap-0 lg:pl-[4%] xl:w-[46%]"
    >
      {hero.panels.map((p, i) => (
        <div
          key={p.id}
          className="h-full lg:flex-1 lg:-mr-16 lg:transition-[flex-grow] lg:duration-700 lg:ease-[var(--ease-cinematic)] lg:last:-mr-[38px] lg:hover:grow-[1.7] lg:has-[:focus-visible]:grow-[1.7]"
        >
          <SpecialtyPanel panel={p} index={i} last={i === hero.panels.length - 1} onSelect={onSelect} />
        </div>
      ))}
    </nav>
  )
}
