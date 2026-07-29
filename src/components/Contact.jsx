import { profile } from '../data/resume'

const Arrow = () => (
  <svg className="lnk-arrow" width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
    <path d="M1 10 10 1M10 1H3.5M10 1v6.5" stroke="currentColor" strokeWidth="1.4" />
  </svg>
)

export default function Contact() {
  return (
    <section id="contact" className="band pb-20 lg:pb-24">
      <div className="shell">
        <div className="reveal">
          <p className="eyebrow">Contact</p>
          <h2 className="sect-title">Degree done. Looking for what comes next.</h2>
          <p className="lede">
            Available now for full-time work, remote or on-site. If you want to talk through
            anything above, or see the code behind it, write to me.
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="font-display mt-12 inline-block text-[clamp(1.35rem,4.2vw,3rem)] leading-none font-bold tracking-tight break-all text-paper underline decoration-brass decoration-1 underline-offset-[0.18em] transition-colors hover:text-brass"
          >
            {profile.email}
          </a>

          <div className="mt-14 grid gap-8 border-t border-line-soft pt-10 sm:grid-cols-3">
            <div>
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-slate-dim">
                Phone
              </p>
              <a
                className="mt-2 block font-mono text-sm text-paper hover:text-brass"
                href={`tel:${profile.phoneHref}`}
              >
                {profile.phone}
              </a>
            </div>

            <div>
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-slate-dim">
                GitHub
              </p>
              <a
                className="lnk mt-2"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                {profile.githubHandle} <Arrow />
              </a>
            </div>

            <div>
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-slate-dim">
                LinkedIn
              </p>
              <a
                className="lnk mt-2"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                {profile.linkedinHandle} <Arrow />
              </a>
            </div>
          </div>

          {/* An engraved nameplate, the kind riveted to the side of a machine.
              The page is built from instruments; this is its spec plate. */}
          <footer className="plate">
            <span className="plate-rivet" aria-hidden="true" />
            <span className="plate-rivet" aria-hidden="true" />
            <span className="plate-rivet" aria-hidden="true" />
            <span className="plate-rivet" aria-hidden="true" />

            <dl className="plate-fields">
              <div>
                <dt>Built by</dt>
                <dd>{profile.name}</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt>Materials</dt>
                <dd>React · Vite · Tailwind</dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd>2026</dd>
              </div>
            </dl>
          </footer>
        </div>
      </div>
    </section>
  )
}
