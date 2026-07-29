import { useCallback, useLayoutEffect, useRef } from 'react'
import { experience } from '../data/resume'
import { useReducedMotion } from '../hooks/useMotion'

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

/** Top-down, nose pointing down the page — the direction of travel. */
function Car() {
  return (
    <svg viewBox="0 0 26 42" width="26" height="42" aria-hidden="true">
      <rect x="3" y="1.5" width="20" height="39" rx="7.5" className="car-body" />
      <rect x="0.5" y="25" width="3" height="4.5" rx="1.5" className="car-body" />
      <rect x="22.5" y="25" width="3" height="4.5" rx="1.5" className="car-body" />
      {/* rear glass, roof, then windscreen at the nose */}
      <rect x="7" y="7" width="12" height="4.5" rx="2" className="car-glass" />
      <rect x="6.5" y="13" width="13" height="12" rx="2.5" className="car-roof" />
      <path d="M7 28h12v3.5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4z" className="car-glass" />
      <circle cx="9.5" cy="38" r="1.5" className="car-lamp" />
      <circle cx="16.5" cy="38" r="1.5" className="car-lamp" />
    </svg>
  )
}

/**
 * The timeline is a road and the car drives it as you scroll. Position comes
 * from where the road crosses a line 55% down the viewport, so the car is
 * always near where you are actually reading.
 */
export default function Experience() {
  const reduced = useReducedMotion()
  const wrapRef = useRef(null)
  const roadRef = useRef(null)

  const track = useCallback(() => {
    const wrap = wrapRef.current
    const road = roadRef.current
    if (!wrap || !road) return

    const r = wrap.getBoundingClientRect()
    if (r.height === 0) return

    const p = clamp((window.innerHeight * 0.55 - r.top) / r.height, 0, 1)
    road.style.setProperty('--car-y', `${(p * r.height).toFixed(1)}px`)
    // A little drift in the lane so it never looks like it is on rails.
    road.style.setProperty('--car-tilt', `${(Math.sin(p * Math.PI * 3) * 2.4).toFixed(2)}deg`)
    road.style.setProperty('--car-sway', `${(Math.sin(p * Math.PI * 3) * 2).toFixed(2)}px`)
  }, [])

  useLayoutEffect(() => {
    if (reduced) return
    track()

    // Same rule as the cylinder: no requestAnimationFrame latch to get stuck.
    const onScroll = () => track()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [reduced, track])

  return (
    <section id="experience" className="band">
      <div className="shell">
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
          <div className="reveal">
            <p className="eyebrow">Experience</p>
            <h2 className="sect-title">Paid work, in order.</h2>
            <p className="lede">Most recent first, so the drive runs backwards through time.</p>
          </div>

          <div className="reveal road-wrap" ref={wrapRef}>
            <div className="road" ref={roadRef} aria-hidden="true">
              <span className="road-dashes" />
              <span className="road-beam" />
              <span className="road-car">
                <Car />
              </span>
            </div>

            {experience.map((job) => (
              <article key={job.id} className={`stop${job.current ? ' is-current' : ''}`}>
                <span className="stop-marker" aria-hidden="true" />

                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="font-display text-xl font-bold tracking-tight">{job.role}</h3>
                  <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-brass uppercase">
                    {job.start} — {job.end}
                  </p>
                </div>

                <p className="mt-1.5 font-mono text-xs text-slate">
                  {job.org} · {job.mode}
                </p>

                <ul className="mt-5 space-y-3">
                  {job.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex gap-3 text-[0.9375rem] leading-relaxed text-slate"
                    >
                      <span className="mt-2.5 h-px w-3 flex-none bg-slate-dim" aria-hidden="true" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
