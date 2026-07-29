# Portfolio — Design Notes

A personal developer portfolio, built as a single dark page.

The whole design comes out of one sentence: *from database schema through to a deployment behind Nginx.* That is a claim about working across a whole system, so the page is built out of the things that measure and move systems — a ruler, a machine, a road, a dial, a plate riveted to the side of it all.

---

## The idea

Most developer portfolios present work as a grid of cards. That reads as a catalogue, and a catalogue is a passive thing to look at.

This one treats the page as a piece of equipment. Every section is an instrument that does something: the rail down the left measures where you are, the work section is a machine that turns, the timeline is a road with something travelling along it, the grade is a dial with a needle. Nothing is decoration for its own sake — each device encodes information that would otherwise be a line of text.

The tone is engineering drawing, not neon. A faint grid sits behind everything at a few percent opacity, corners carry registration marks, and rules are hairlines. It should feel like a technical document that happens to be alive.

---

## Colour

| | | |
| --- | --- | --- |
| Ink | `#0E1420` | The ground. Blue-black rather than pure black, which is easier on the eye and reads as drafting paper at night. |
| Paper | `#E8E6E1` | Body text. Warm off-white, never pure white. |
| Slate | `#7C8798` | Secondary text and quiet structure. |
| Brass | `#E0A458` | The only accent. |

**One accent, and that is the discipline of the whole thing.** Brass is a status-lamp amber — a warm signal colour, not a neon one. Every highlight on the page is the same brass: the active project, the chosen skill, the current job, the needle on the dial, the letter underline, the headlights. Because nothing else competes for attention, brass always means *this is the thing you are looking at.*

Contrast is comfortable rather than merely legal — paper reads at 15.4:1, slate at 6.4:1, brass at 8.5:1.

### Why there is no light mode

Brass falls to 2.2:1 on white, which fails accessibility standards for text of any size. A light theme would therefore need a different accent, and a different accent is a different identity, not the same one inverted.

More to the point, the page's best moments are *made of* darkness: headlights throwing a cone down a road, dust hanging in the air after an impact, panels receding into shadow, a glow around the thing you have selected. On white, light does not glow — it smudges. Half of the design would have to be re-invented rather than recoloured, and the result would be a second, weaker design maintained alongside the first.

---

## Type

**Archivo** for display. Wide, industrial, closer to signage than to a magazine. Set very tight at large sizes so the name reads as a built object.

**IBM Plex Sans** for body copy, and **IBM Plex Mono** for labels, data and captions. Plex was drawn for technical documentation, which is exactly the subject matter. Using the sans and the mono from one family means the page carries two voices, not three.

Labels are mono, uppercase, and widely spaced — they read as annotations on a drawing rather than as headings. Body copy is generous, around 65 characters to the line.

---

## The set pieces

Six moments carry the page. Each one is tied to what it describes.

**The name arrives as falling bricks.** Letters drop in one at a time and land, compressing against their own baseline on impact before settling through a rebound and a smaller second bounce. The fall accelerates like gravity; the settle decelerates. They land out of order — a fixed scramble, so it never reads as a left-to-right sweep — and each letter kicks two puffs of dust sideways at the exact moment it hits. It is a name being built, not typed.

**Work is a hollow cylinder.** Project screenshots sit on a ring that turns as you scroll, their backs hidden so the far side of the ring falls away and you can see straight through it. The front panel is bright; the others dim and desaturate, receding rather than fading. Clicking one brings it round to the front. Screenshots are matted rather than cropped, because cropping an interface is cropping the work.

**Skills are bubbles.** One per group, each sized by how much it holds, so the field is readable before anything is clicked. They drift on their own clocks, never quite in sync. Choosing one sheds a ring off the bubble — the pop — and the skills inside burst out below in quick succession.

**Experience is a road.** The timeline is a strip of asphalt with a dashed centre line, and a car drives down it as you scroll, positioned so it stays near whatever you are actually reading. Each job is a waypoint on the road surface, and the car passes over them. It drifts slightly in the lane, because a car that holds a perfect line looks like it is on rails.

**The grade is a dial.** A sweep of arc with ticks and a needle, which climbs from zero to its true reading when the section comes into view. The page is already full of measuring devices; a measurement deserves an instrument rather than another number in a paragraph.

**The footer is a nameplate.** An engraved plate with a rivet in each corner and its fields laid out like a specification. If the whole site is a machine, the footer is the plate screwed to the side of it.

---

## Motion

Motion is used to explain, not to fill time. Nothing moves ambiently, nothing loops for its own sake, and every animation on the page is attached to a thing that is genuinely happening — arriving, turning, choosing, travelling, measuring.

The rules it holds to:

- **Weight before speed.** Objects accelerate into a landing and decelerate out of it. Things that hit something squash and recover.
- **Never perfectly regular.** Bricks land out of order, bubbles drift on different clocks, the car wanders in its lane. Perfect timing reads as mechanical, and mechanical reads as cheap.
- **Scroll is the driver, not a trigger.** The cylinder and the car are tied directly to scroll position, so the page responds continuously to the reader rather than firing an animation at them and finishing on its own schedule.
- **Motion is an enhancement, never a requirement.** The page is complete and fully readable without a single animation. If motion is switched off, or unavailable, nothing hides and nothing waits — the content is simply there.

Anyone who has asked their system to reduce motion gets the calm version: no cylinder, no driving, no falling, no dust. The same content, laid out flat, with the dial resting at its true value.

---

## Restraint

The temptation with a page like this is to keep adding. The counterweight is that spectacle is only impressive when it is scarce — six moments across a whole page, with quiet, disciplined space between them.

So: one accent colour. Two typeface families. Hairline rules instead of boxes. No gradients used as decoration, no shadows that aren't doing a job, no motion without a reason. The loud parts are only loud because everything around them is deliberately quiet.
