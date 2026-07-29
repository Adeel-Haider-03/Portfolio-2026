import { useEffect, useLayoutEffect, useRef, useState } from 'react'

/** True when the visitor has asked the OS to keep motion to a minimum. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/**
 * Reveals `.reveal` elements as they scroll into view.
 *
 * The page is written to be fully legible with no JavaScript at all: the
 * entrance animation only switches on once `js-motion` is set, and it is set
 * from here. If the observer never reports back — embedded and headless views
 * sometimes never run the compositor — the class comes off again, because a
 * missing animation is a far smaller problem than an invisible page.
 */
export function useReveal() {
  useLayoutEffect(() => {
    if (!('IntersectionObserver' in window)) return

    const root = document.documentElement
    const targets = document.querySelectorAll('.reveal')
    root.classList.add('js-motion')

    let delivered = false
    const io = new IntersectionObserver(
      (entries) => {
        delivered = true
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-in')
          io.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    )

    targets.forEach((t) => io.observe(t))

    const failsafe = window.setTimeout(() => {
      if (!delivered) root.classList.remove('js-motion')
    }, 1000)

    return () => {
      window.clearTimeout(failsafe)
      io.disconnect()
      root.classList.remove('js-motion')
    }
  }, [])
}

/** Reports which section id currently owns the viewport. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  const ratios = useRef({})

  useEffect(() => {
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!nodes.length) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          ratios.current[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0
        })
        const winner = Object.entries(ratios.current).sort((a, b) => b[1] - a[1])[0]
        if (winner && winner[1] > 0) setActive(winner[0])
      },
      { threshold: [0, 0.15, 0.35, 0.6, 0.9] },
    )

    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [ids])

  return active
}
