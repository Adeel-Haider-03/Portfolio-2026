import { useRef, useState } from "react";
import { stack } from "../data/resume";
import { useReducedMotion } from "../hooks/useMotion";

/**
 * Each category is a bubble, sized by how much it holds, drifting on its own
 * clock. Picking one pops a ring off it and the skills inside burst out below.
 */
export default function Skills() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(stack[0].group);
  const current = stack.find((s) => s.group === active) ?? stack[0];

  const panelRef = useRef(null);

  const scrollPanelIfNeeded = () => {
    const el = panelRef.current;
    if (!el) return;

    const overhang = el.getBoundingClientRect().bottom - window.innerHeight;
    if (overhang > 0) {
      window.scrollBy({
        top: overhang + 24,
        behavior: reduced ? "auto" : "smooth",
      });
    }
  };

  const handleSelect = (group) => {
    setActive(group);
    requestAnimationFrame(scrollPanelIfNeeded);
  };

  return (
    <section id="stack" className="band">
      <div className="shell">
        <div className="reveal">
          <p className="eyebrow">Skills</p>
          <h2 className="sect-title">What I reach for.</h2>
          <p className="lede">
            Six groups, sized by how much lives in each. Pick one to see inside.
          </p>
        </div>

        <div className="reveal bub-field">
          {stack.map((row, i) => {
            const on = row.group === active;
            return (
              <button
                key={row.group}
                type="button"
                className={`bub${on ? " is-on" : ""}`}
                aria-pressed={on}
                aria-controls="skills-panel"
                style={{
                  "--size": `${102 + row.items.length * 12}px`,
                  "--dur": `${7.5 + (i % 4) * 1.7}s`,
                  "--delay": `${i * -1.4}s`,
                }}
                onClick={() => handleSelect(row.group)}
              >
                <span className="bub-label">{row.group}</span>
                {on ? (
                  <span
                    className="bub-ring"
                    key={row.group}
                    aria-hidden="true"
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <div
          className="bub-panel"
          id="skills-panel"
          ref={panelRef}
          aria-live="polite"
        >
          <ul className="bub-list" key={current.group}>
            {current.items.map((item, i) => (
              <li key={item} className="bub-item" style={{ "--i": i }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
