// ghost-core.js — pure, dependency-free helpers for the Ghost Trail effect.
// No DOM and no Obsidian imports, so this module is unit-tested directly with
// node:test. main.js require()s it at runtime.

// The Terminal Workbench Pet ghost, parameterized by body + eye fill.
// Path is the pet's body outline (rounded top, scalloped skirt); eyes are two rects.
function buildGhostSvg(bodyHex, eyeHex) {
  return (
    '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M2 16 V7 Q2 1 8 1 Q14 1 14 7 V16 L12 14.4 L10 16 L8 14.4 L6 16 L4 14.4 Z" fill="' +
    bodyHex +
    '"/>' +
    '<rect x="5" y="6" width="2" height="3" fill="' + eyeHex + '"/>' +
    '<rect x="9" y="6" width="2" height="3" fill="' + eyeHex + '"/>' +
    "</svg>"
  );
}

// Accent ramp in cycle order (mirrors the pet's boop color cycle), with the
// design system's documented dark-mode hex fallbacks.
const TWB_RAMP = [
  { token: "--twb-accent", fallback: "#63f2ab" },
  { token: "--twb-accent-alt", fallback: "#6bdcff" },
  { token: "--twb-warm", fallback: "#f0c674" },
  { token: "--twb-violet", fallback: "#b78cff" },
  { token: "--twb-orange", fallback: "#f7a35c" },
  { token: "--twb-red", fallback: "#ff6e7a" },
];

// readVar(token) -> raw computed value of a CSS custom property (or "" if unset).
function resolvePalette(readVar) {
  return TWB_RAMP.map(({ token, fallback }) => {
    const v = (readVar(token) || "").trim();
    return v || fallback;
  });
}

// Advance one ghost. Returns per-frame render params.
// ghost: { x, y, start, phase, peakAlpha }
// cfg:   { lifetimeMs, riseSpeed (px/s), driftAmp (px), bob (px) }
function stepGhost(ghost, now, cfg) {
  const elapsed = now - ghost.start;
  const t = elapsed / cfg.lifetimeMs; // 0..1
  const rise = cfg.riseSpeed * (elapsed / 1000);
  const drift = Math.sin(elapsed / 180 + ghost.phase) * cfg.driftAmp;
  const bob = Math.sin(elapsed / 90 + ghost.phase) * cfg.bob;
  const alpha = ghost.peakAlpha * Math.max(0, 1 - t * t); // ease-out fade
  return {
    alive: t < 1,
    x: ghost.x + drift,
    y: ghost.y - rise + bob,
    alpha,
    scale: 0.85 + 0.15 * Math.min(1, elapsed / 120), // subtle pop-in
  };
}

// Spawn gate: minimum interval between spawns + a hard concurrency cap.
function makeThrottle(minIntervalMs) {
  let last = -Infinity;
  return {
    allow(now, concurrent, maxConcurrent) {
      if (concurrent >= maxConcurrent) return false;
      if (now - last < minIntervalMs) return false;
      last = now;
      return true;
    },
    reset() {
      last = -Infinity;
    },
  };
}

module.exports = { buildGhostSvg, TWB_RAMP, resolvePalette, stepGhost, makeThrottle };
