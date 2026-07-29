import { awards, education } from '../data/resume'

const CX = 100
const CY = 90
const R = 70
const SWEEP = 240 // degrees of travel, centred on straight up
const START = -SWEEP / 2

const polar = (angle, radius) => {
  const rad = (angle * Math.PI) / 180
  return [CX + radius * Math.sin(rad), CY - radius * Math.cos(rad)]
}

/**
 * A precision dial for the grade. The page already speaks in rulers,
 * registration marks and bills of materials — a measurement deserves an
 * instrument, not another number in a paragraph.
 */
function Gauge({ value, max }) {
  const frac = Math.min(1, Math.max(0, value / max))
  const arcLength = 2 * Math.PI * R * (SWEEP / 360)

  const [x0, y0] = polar(START, R)
  const [x1, y1] = polar(START + SWEEP, R)
  const track = `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${R} ${R} 0 1 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`

  const ticks = []
  for (let v = 0; v <= max; v += 0.5) {
    const major = Number.isInteger(v)
    const a = START + (v / max) * SWEEP
    const [ax, ay] = polar(a, R)
    const [bx, by] = polar(a, R - (major ? 11 : 6))
    ticks.push({ v, major, ax, ay, bx, by, label: polar(a, R - 24) })
  }

  return (
    <svg className="gauge" viewBox="0 0 200 134" role="img" aria-label={`${value} out of ${max}`}>
      <path className="gauge-track" d={track} />
      <path
        className="gauge-fill"
        d={track}
        style={{
          strokeDasharray: arcLength.toFixed(2),
          '--from': arcLength.toFixed(2),
          '--to': (arcLength * (1 - frac)).toFixed(2),
        }}
      />

      {ticks.map((t) => (
        <g key={t.v}>
          <line
            className={t.major ? 'gauge-tick is-major' : 'gauge-tick'}
            x1={t.ax}
            y1={t.ay}
            x2={t.bx}
            y2={t.by}
          />
          {t.major ? (
            <text className="gauge-num" x={t.label[0]} y={t.label[1]}>
              {t.v}
            </text>
          ) : null}
        </g>
      ))}

      <g
        className="gauge-needle"
        style={{ '--from': `${START}deg`, '--to': `${(START + frac * SWEEP).toFixed(2)}deg` }}
      >
        <path d={`M ${CX} ${CY - R + 8} L ${CX + 3.2} ${CY + 4} L ${CX - 3.2} ${CY + 4} Z`} />
        <circle cx={CX} cy={CY} r="5.5" />
      </g>

      <text className="gauge-value" x={CX} y={CY + 34}>
        {value.toFixed(2)}
      </text>
    </svg>
  )
}

/** A notched ring, the way a stamp bites the edge of a certificate. */
function Seal({ kind }) {
  return (
    <span className="seal" aria-hidden="true">
      <svg viewBox="0 0 40 40">
        <circle className="seal-notch" cx="20" cy="20" r="18" />
        <circle className="seal-ring" cx="20" cy="20" r="13.5" />
        {kind === 'Award' ? (
          <path
            className="seal-mark"
            d="M20 12.5l2.3 4.7 5.2.8-3.8 3.7.9 5.2-4.6-2.4-4.6 2.4.9-5.2-3.8-3.7 5.2-.8z"
          />
        ) : (
          <path className="seal-mark" d="M14.5 20.3l3.8 3.8 7.2-7.6" fill="none" />
        )}
      </svg>
    </span>
  )
}

export default function Background() {
  const [rawValue, rawMax] = education.cgpa.split('/').map((s) => parseFloat(s.trim()))

  return (
    <section id="background" className="band">
      <div className="shell">
        <div className="grid gap-x-16 gap-y-16 lg:grid-cols-2">
          <div className="reveal">
            <p className="eyebrow">Education</p>

            <h3 className="font-display mt-8 text-2xl leading-tight font-bold tracking-tight">
              {education.school}
            </h3>

            <div className="gauge-row">
              <Gauge value={rawValue} max={rawMax} />

              <dl className="gauge-legend">
                <div>
                  <dt>Grade</dt>
                  <dd>{education.cgpa}</dd>
                </div>
                {education.rank ? (
                  <div>
                    <dt>Rank</dt>
                    <dd className="text-brass">{education.rank}</dd>
                  </div>
                ) : null}
                <div>
                  <dt>Degree</dt>
                  <dd>{education.degree}</dd>
                </div>
                <div>
                  <dt>Dates</dt>
                  <dd>
                    {education.start} — {education.end}
                    {education.graduated ? ' · Graduated' : ''}
                  </dd>
                </div>
              </dl>
            </div>

            <p className="mt-10 font-mono text-[0.6875rem] tracking-[0.18em] text-slate-dim uppercase">
              Coursework
            </p>
            <ul className="course-grid">
              {education.coursework.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>

          <div className="reveal">
            <p className="eyebrow">Awards &amp; certification</p>

            <ul className="seal-list">
              {awards.map((a) => (
                <li key={a.title} className="seal-row">
                  <Seal kind={a.kind} />
                  <div>
                    <p className="seal-kind">{a.kind}</p>
                    <p className="seal-title">{a.title}</p>
                    <p className="seal-meta">
                      {[a.issuer, a.period].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
