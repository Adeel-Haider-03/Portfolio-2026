import { profile } from '../data/resume'

// Bricks don't land in reading order. A fixed scramble keeps the sequence
// identical on every load while never reading as a left-to-right sweep.
const DROP_ORDER = [3, 0, 7, 1, 9, 5, 2, 10, 4, 8, 6]
const BASE = 0.12
const STEP = 0.065
const FALL = 1.05 // must match the brickFall duration in index.css
const IMPACT = 0.48 // point in the fall where the letter hits the ground

/**
 * The name drops in a letter at a time and lands, each brick squashing on
 * impact and kicking dust out to either side.
 *
 * The name comes from aria-label rather than a duplicate visually-hidden
 * span: the letters have to be aria-hidden so screen readers don't spell the
 * name out, and a second copy in the DOM would break copy and paste.
 */
export default function Wordmark() {
  let letter = -1

  return (
    <h1 className="wordmark brickline mt-6" aria-label={profile.name}>
      <span aria-hidden="true">
        {[...profile.name].map((ch, i) => {
          // Keeps a real space in the text so the heading still copies as
          // "Adeel Haider" rather than running the two words together.
          if (ch === ' ')
            return (
              <span key={i} className="brick-gap">
                {' '}
              </span>
            )

          letter += 1
          const slot = DROP_ORDER[letter % DROP_ORDER.length]
          const delay = BASE + slot * STEP

          return (
            <span
              key={i}
              className="brick"
              style={{
                '--d': `${delay.toFixed(3)}s`,
                '--dust': `${(delay + FALL * IMPACT).toFixed(3)}s`,
                '--r': `${(letter % 2 ? 1 : -1) * (3 + (slot % 4))}deg`,
              }}
            >
              {ch}
            </span>
          )
        })}
      </span>
    </h1>
  )
}
