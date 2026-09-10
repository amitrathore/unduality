# Design System · Unduality

## Product context

- **What this is:** An open inquiry where people investigate thought, emotion, identity, and the self through short practices they can verify in direct experience.
- **Who it is for:** Curious Gen Z and millennial visitors tired of treating their inner lives as permanent self-improvement projects.
- **Project type:** Static marketing site, interactive open inquiry, and growing publication.
- **Primary action:** Run an experiment. Secondary action: follow the inquiry.

## Aesthetic direction

- **Direction:** The Open Inquiry.
- **Mood:** Clear, alive, skeptical, and humane. More direct observation than sanctuary. More participation than teaching.
- **Visual rule:** Color is assigned to meaning and large observation fields, not sprinkled through interface decoration.

## Typography

- **Display:** Anybody Variable, width 108–113 for major questions and statements.
- **Reading:** Newsreader Variable, optical sizing enabled, with a 60–68 character measure.
- **Protocol data:** IBM Plex Mono for experiment duration, steps, status, and evidence labels only.
- **Scale:** Poster `clamp(3.8rem, 9vw, 10rem)`; section `clamp(3.2rem, 7.2vw, 8rem)`; intro `clamp(1.3rem, 2vw, 1.8rem)`; body `clamp(1.05rem, 1.25vw, 1.22rem)`; protocol `0.71rem`.

## Color

- **Inquiry ice:** `#EAF1FF`, open background and clarity.
- **Paper:** `#FBFAF5`, reading surfaces.
- **Ink:** `#12130F`, primary text and grounding.
- **Inquiry blue:** `#2457FF`, active questions, links, and experiments.
- **Correction coral:** `#F15B40`, objections, boundaries, and safety.
- **Attention yellow:** `#F1CA4B`, direct attention and moments of noticing.
- **Observation mint:** `#65CDB3`, recorded observation and return.
- **Quiet lavender:** `#B6A8EB`, psychological models and one side of comparisons.
- **Muted text:** `#62655D`, secondary reading text on light surfaces.
- **Rules:** `#B9BEB3`, structural dividers on light surfaces.
- **Dark theme surfaces:** `#171C2C` for inquiry ice and `#12130F` for paper, with lightened semantic accents for readable contrast.

Never use all accents in a single small component. Large color fields can combine two or three colors when the visual depicts observation, overlap, or comparison.

## Layout

- Composition-first, with full-viewport questions and large interactive fields.
- Twelve-column desktop logic, six on tablet, four on mobile.
- Maximum content width `96rem`; outer padding `clamp(1.25rem, 4.5vw, 4.75rem)`.
- Body copy is left aligned. No centered marketing stacks except focused full-screen practice steps.
- Cards are avoided. Ruled experiment rows and full color plates encode structure.

## Motion

- One orchestrated hero type-settle on load.
- Pointer and keyboard motion inside the observation field responds directly to input.
- Practice transitions occur only when the participant advances.
- No parallax, scroll hijacking, ambient loops, or cursor trails.
- `prefers-reduced-motion` renders all states without transitional motion.

## Assets

- **Favicon:** Interrupted U on inquiry blue. It reads as a U at 16px while never fully closing.
- **Homepage OG:** “WHO IS READING THIS?” with WHO corrected to WHAT, plus an observation field.
- **Experiment OG:** A distinct blue observation plate and the experiment's exact question.

## Safety and accessibility

- All practices are user-paced, eyes-open by default, and include a visible exit.
- Grounding language returns attention to the screen, room, and supporting surface.
- Minimum interactive target is 44px. Keyboard focus is always visible.
- Interactive visual fields support arrow keys and include accessible labeling.
- Unduality is consistently distinguished from therapy, diagnosis, and crisis care.

## Decisions log

| Date | Decision | Rationale |
|---|---|---|
| 2026-09-10 | Reframed from an editorial project to a participatory inquiry | Visitors should participate and verify practices, not passively consume ideas. |
| 2026-09-10 | Expanded the palette through semantic color fields | The site needed more visual energy without decorative noise. |
| 2026-09-10 | Shipped as framework-free static files | GitHub Pages needs no build pipeline and the first version remains durable. |
| 2026-09-10 | Defined duality, nondualism, and Unduality separately | Visitors should understand the inquiry without relying on Advaita shorthand or accepting a doctrine. |
| 2026-09-10 | Moved the 22-dialogue outline to a dedicated book page | The homepage remains an open inquiry while the full intellectual architecture belongs to the forthcoming book. |
| 2026-09-10 | Positioned Guides before Guided Sessions | The role, discipline, safety boundaries, and standards matter before presenting a future service. |
| 2026-09-10 | Replaced “live lab” with “open inquiry” | The public framing should feel welcoming to non-technical, non-clinical visitors while retaining rigor through experiments and verification. |
| 2026-09-10 | Made the book’s two voices visible | A split lavender–blue–mint conversation field identifies Amit Rathore and The Psychologist without relying on generic biography cards or inventing credentials. |
| 2026-09-10 | Documented neutral and dark-theme tokens | Supporting colors now remain governed by the same semantic, accessible color system as the primary palette. |
