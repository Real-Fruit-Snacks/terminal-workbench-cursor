# Changelog

All notable changes to Terminal Workbench Cursor are documented here. The format
follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions
follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
