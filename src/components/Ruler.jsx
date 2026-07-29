import { sections } from '../data/resume'
import { useActiveSection } from '../hooks/useMotion'

const ids = sections.map((s) => s.id)

/** A measurement rail. It reports where you are and moves you there. */
export default function Ruler() {
  const active = useActiveSection(ids)

  return (
    <nav className="ruler" aria-label="Sections">
      {sections.map((s) => (
        <button
          key={s.id}
          type="button"
          className={`ruler-item${active === s.id ? ' is-active' : ''}`}
          aria-current={active === s.id ? 'true' : undefined}
          onClick={() =>
            document.getElementById(s.id)?.scrollIntoView({ block: 'start' })
          }
        >
          <span className="ruler-tick" aria-hidden="true" />
          <span className="ruler-label">{s.label}</span>
        </button>
      ))}
    </nav>
  )
}
