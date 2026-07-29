import { profile } from '../data/resume'
import Wordmark from './Wordmark'

const Arrow = () => (
  <svg className="lnk-arrow" width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
    <path d="M1 10 10 1M10 1H3.5M10 1v6.5" stroke="currentColor" strokeWidth="1.4" />
  </svg>
)

export default function Hero() {
  return (
    <header id="top" className="band band-open pt-8 pb-16 lg:pt-10 lg:pb-24">
      <div className="shell">
        {/* slim masthead */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-14 lg:pb-16">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-slate">
            {profile.location}
          </p>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2" aria-label="Profiles">
            <a className="lnk" href={profile.github} target="_blank" rel="noreferrer">
              GitHub <Arrow />
            </a>
            <a className="lnk" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <Arrow />
            </a>
          </nav>
        </div>

        <p
          className="rise font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-brass"
          style={{ animationDelay: '0.05s' }}
        >
          {profile.availability}
        </p>

        <Wordmark />

        <div
          className="rise mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line-soft pt-6 font-mono text-xs tracking-[0.12em] text-slate uppercase"
          style={{ animationDelay: '0.22s' }}
        >
          <span>{profile.role}</span>
          <span className="text-slate-dim" aria-hidden="true">
            /
          </span>
          <span>MERN + Python</span>
          <span className="text-slate-dim" aria-hidden="true">
            /
          </span>
          <span>{profile.graduation}</span>
        </div>

        <div className="mt-16 grid gap-x-16 gap-y-10 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
          <h2 className="rise hero-line" style={{ animationDelay: '0.3s' }}>
            {profile.headline[0]}
            <br />
            <em>{profile.headline[1]}</em>
          </h2>

          <div className="rise" style={{ animationDelay: '0.38s' }}>
            <p className="text-slate leading-relaxed">{profile.summary}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a className="btn btn-solid" href={`mailto:${profile.email}`}>
                Email me
              </a>
              <a className="btn" href={profile.resumeFile} download>
                Download résumé
              </a>
            </div>
          </div>
        </div>

      </div>
    </header>
  )
}
