import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { projects } from '../data/resume'
import { useReducedMotion } from '../hooks/useMotion'

const N = projects.length
const THETA = 360 / N
const VH_PER_PROJECT = 72

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

/**
 * The work section is a hollow cylinder of project screenshots.
 *
 * Scroll position is the single source of truth: it drives the rotation, and
 * clicking a panel scrolls rather than animating separately, so the two can
 * never disagree. Panels face outward with their backs hidden, so the far side
 * of the ring drops away and you see straight through it.
 */
export default function ProjectCylinder() {
  const reduced = useReducedMotion()
  const [front, setFront] = useState(0)

  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const cylRef = useRef(null)
  const frontRef = useRef(0)

  // Panel size and ring radius are derived, never measured off a transformed
  // node — perspective scaling would make that reading a lie.
  const layout = useCallback(() => {
    const stage = stageRef.current
    if (!stage) return
    // Also bounded by the height left over after the header, readout and rail,
    // so a short window scales the ring down instead of clipping it. The 16/9
    // factor converts that spare height back into a panel width.
    const roomForPanel = (window.innerHeight - 350) * (16 / 9)
    const w = clamp(Math.min(760, window.innerWidth * 0.86, roomForPanel), 240, 760)
    const radius = (w / 2 / Math.tan(Math.PI / N)) * 1.18
    stage.style.setProperty('--panel-w', `${w}px`)
    stage.style.setProperty('--radius', `${radius}px`)
  }, [])

  const readScroll = useCallback(() => {
    const sec = sectionRef.current
    const cyl = cylRef.current
    if (!sec || !cyl) return

    const total = sec.offsetHeight - window.innerHeight
    const travelled = -sec.getBoundingClientRect().top
    const p = total > 0 ? clamp(travelled / total, 0, 1) : 0

    cyl.style.setProperty('--rot', `${(-p * (N - 1) * THETA).toFixed(3)}deg`)

    const idx = Math.round(p * (N - 1))
    if (idx !== frontRef.current) {
      frontRef.current = idx
      setFront(idx)
    }
  }, [])

  useLayoutEffect(() => {
    if (reduced) return
    layout()
    readScroll()

    // Deliberately not gated behind requestAnimationFrame: a dropped frame
    // callback would leave the guard latched and freeze the cylinder for good.
    // The handler is one rect read and one custom-property write, and passive
    // scroll events are already coalesced to the frame rate.
    const onScroll = () => readScroll()
    const onResize = () => {
      layout()
      readScroll()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [reduced, layout, readScroll])

  const goTo = useCallback(
    (i) => {
      const sec = sectionRef.current
      if (!sec) return
      const total = sec.offsetHeight - window.innerHeight
      const top = sec.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: top + (i / (N - 1)) * total })
    },
    [],
  )

  const activate = useCallback(
    (i) => {
      if (i !== frontRef.current) {
        goTo(i)
        return
      }
      const p = projects[i]
      const href = p.live || p.code
      if (href) window.open(href, '_blank', 'noopener')
    },
    [goTo],
  )

  const current = projects[front]

  // No cylinder without motion: the same projects, laid out flat.
  if (reduced) {
    return (
      <section id="work" className="band">
        <div className="shell">
          <p className="eyebrow">Selected work</p>
          <h2 className="sect-title">Six things I built and shipped.</h2>
          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="work"
      ref={sectionRef}
      className="cyl-scroll"
      style={{ height: `calc(100vh + ${(N - 1) * VH_PER_PROJECT}vh)` }}
    >
      <div className="cyl-stage" ref={stageRef}>
        <div className="shell cyl-head">
          <p className="eyebrow">Selected work</p>
          <p className="cyl-count">
            <span className="cyl-count-now">{current.index}</span>
            <span className="cyl-count-of">/ {String(N).padStart(2, '0')}</span>
          </p>
        </div>

        <div className="cyl-viewport">
          <div className="cyl" ref={cylRef}>
            {projects.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className={`cyl-panel${i === front ? ' is-front' : ''}`}
                style={{ '--i': i, '--theta': `${THETA}deg` }}
                aria-current={i === front ? 'true' : undefined}
                aria-label={
                  i === front
                    ? `${p.name}. ${p.live || p.code ? 'Open project' : 'No public link yet'}`
                    : `Bring ${p.name} to the front`
                }
                onClick={() => activate(i)}
                onFocus={() => i !== frontRef.current && goTo(i)}
              >
                {p.image ? (
                  // Eager: a panel that pops in blank as the ring turns is
                  // worse than the bytes. These screenshots are the content.
                  <img src={p.image} alt={`${p.name} interface`} decoding="async" />
                ) : (
                  <span className="cyl-noshot">
                    <span className="cyl-noshot-name">{p.name}</span>
                    <span className="cyl-noshot-tag">{p.stack.slice(0, 3).join(' · ')}</span>
                  </span>
                )}
                <span className="cyl-plate">
                  <span className="cyl-plate-idx">{p.index}</span>
                  <span className="cyl-plate-name">{p.name}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="shell cyl-readout" key={current.id}>
          <div className="cyl-readout-main">
            <h2 className="cyl-name">{current.name}</h2>
            <p className="cyl-tagline">{current.tagline}</p>
          </div>

          <div className="cyl-readout-side">
            <ul className="flex flex-wrap gap-2">
              {current.stack.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              {current.live ? (
                <a className="btn btn-solid" href={current.live} target="_blank" rel="noreferrer">
                  Open live site
                </a>
              ) : null}
              {current.code ? (
                <a className="btn" href={current.code} target="_blank" rel="noreferrer">
                  Source
                </a>
              ) : null}
              {!current.live && !current.code ? (
                <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-slate-dim uppercase">
                  Link not published yet
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="shell cyl-rail" aria-hidden="true">
          {projects.map((p, i) => (
            <span key={p.id} className={`cyl-rail-tick${i === front ? ' is-on' : ''}`} />
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {current.name}. {current.tagline}
      </p>
    </section>
  )
}

function ProjectCard({ project: p }) {
  const href = p.live || p.code
  return (
    <article>
      {p.image ? (
        <img className="w-full border border-line-soft" src={p.image} alt={`${p.name} interface`} />
      ) : null}
      <p className="proj-idx mt-5">{p.index}</p>
      <h3 className="proj-name mt-2">{p.name}</h3>
      <p className="proj-tagline">{p.tagline}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {p.stack.map((t) => (
          <li key={t} className="chip">
            {t}
          </li>
        ))}
      </ul>
      {href ? (
        <a className="lnk mt-5" href={href} target="_blank" rel="noreferrer">
          {p.live ? 'Open live site' : 'Source'}
        </a>
      ) : null}
    </article>
  )
}
