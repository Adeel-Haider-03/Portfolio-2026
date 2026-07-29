import Background from './components/Background'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Hero from './components/Hero'
import ProjectCylinder from './components/ProjectCylinder'
import Ruler from './components/Ruler'
import Skills from './components/Skills'
import { useLayoutEffect } from 'react'
import { useReveal } from './hooks/useMotion'

export default function App() {
  useReveal()

  // Belt and braces with history.scrollRestoration in main.jsx: some browsers
  // restore the offset after the first paint. A link to #work is still honoured.
  useLayoutEffect(() => {
    if (window.location.hash) return
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-brass focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-ink"
      >
        Skip to work
      </a>

      <Ruler />

      <main>
        <Hero />
        <ProjectCylinder />
        <Skills />
        <Experience />
        <Background />
        <Contact />
      </main>
    </>
  )
}
