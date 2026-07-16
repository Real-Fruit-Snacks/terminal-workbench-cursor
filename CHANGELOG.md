# Changelog

All notable changes to Terminal Workbench Cursor are documented here. The format
follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions
follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.4] - 2026-07-15

### Changed
- New project cover banner — added depth (pane shadow and an accent bloom) and a
  graceful multicolour ghost plume — plus a high-resolution 3:2 PNG for the
  README, listings, and social previews. No changes to the plugin code since 1.0.3.

## [1.0.3] - 2026-07-15

### Changed
- Overhauled the settings panel: grouped into clear sections (General,
  Appearance, Blinking, Smooth movement, Ghost Trail, Effects, Torch spotlight),
  each with a short intro and a description on every control.
- Ghost Trail now defaults to the multicolour **Cycle palette** mode.
- Renamed the **CRT** effect to **Cursor trail** (a fading afterimage of the
  caret as it moves) and made the afterimage more visible.

## [1.0.2] - 2026-07-15

### Changed
- Removed reduced-motion gating. All effects now animate regardless of the OS
  `prefers-reduced-motion` setting. Every effect stays individually toggleable in
  settings, and Ghost Trail remains off by default, so motion is always the
  user's choice — turn off (or don't turn on) whatever you don't want.

## [1.0.1] - 2026-07-15

### Fixed
- The Ghost Trail now works on Obsidian/Electron builds that do not resolve a
  relative `require()` from a plugin's `main.js`, which previously left the
  effect silently disabled. The ghost helpers are inlined into `main.js`, so the
  plugin is a single self-contained file with no second runtime file to load.
- The ghost sprite is given an explicit `width`/`height` so it always rasterizes
  onto the canvas.

### Changed
- Manual installs now need only `main.js`, `manifest.json`, `styles.css`, and
  `versions.json` — `ghost-core.js` is no longer required at runtime.
- The default ghost size is larger (24), and the **Size** slider now ranges up to 64.

## [1.0.0] - 2026-07-15

Initial release. Terminal Workbench Cursor is a cursor engine for the Terminal
Workbench family, forged from [cursor-smith](https://github.com/Sadsnake1/cursor-smith)
(MIT) and integrated with the
[Terminal Workbench design system](https://github.com/Real-Fruit-Snacks/terminal-workbench-design-system).

### Added
- **Ghost Trail effect** — a miniature
  [Terminal Workbench Pet](https://github.com/Real-Fruit-Snacks/terminal-workbench-pet)
  ghost peels off the text as you type, and optionally as the caret moves. It
  rises, drifts, and fades. Size, rise speed, drift, lifetime, opacity, spawn
  density, triggers, and colour mode (accent / cycle palette / match cursor) are
  all adjustable. Off by default. Every spawn respects `prefers-reduced-motion`.
- **Terminal Workbench integration** — cursor and ghost colours resolve from the
  `--twb-*` accent ramp with graceful hex fallbacks, so the plugin looks native
  under the Terminal Workbench theme and degrades cleanly without it. The
  settings panel is restyled in the terminal idiom.

### Inherited from cursor-smith
- Box, Line, and Underline cursor styles with smooth gliding motion.
- Torch spotlight, motion smear, pixel trail, CRT, and energy-beam effects.
- Motion smear and the energy beam now also honour `prefers-reduced-motion`.
