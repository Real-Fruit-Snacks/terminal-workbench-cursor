const test = require("node:test");
const assert = require("node:assert/strict");
const {
  buildGhostSvg,
  TWB_RAMP,
  resolvePalette,
  stepGhost,
  makeThrottle,
} = require("../ghost-core.js");

test("buildGhostSvg embeds the given fills and a valid svg root", () => {
  const svg = buildGhostSvg("#63f2ab", "#090c0d");
  assert.match(svg, /^<svg /);
  assert.ok(svg.includes('fill="#63f2ab"'), "body fill present");
  assert.ok(svg.includes('fill="#090c0d"'), "eye fill present");
  assert.ok(svg.includes("viewBox=\"0 0 16 16\""));
});

test("TWB_RAMP has six accent entries in cycle order", () => {
  assert.equal(TWB_RAMP.length, 6);
  assert.equal(TWB_RAMP[0].token, "--twb-accent");
  assert.equal(TWB_RAMP[0].fallback, "#63f2ab");
});

test("resolvePalette uses fallbacks when a var is empty", () => {
  const pal = resolvePalette(() => "");
  assert.equal(pal.length, 6);
  assert.equal(pal[0], "#63f2ab");
});

test("resolvePalette prefers resolved var values and trims them", () => {
  const pal = resolvePalette((t) => (t === "--twb-accent" ? "  #112233 " : ""));
  assert.equal(pal[0], "#112233");
  assert.equal(pal[1], "#6bdcff"); // still fallback
});

test("stepGhost fades to dead after its lifetime and rises over time", () => {
  const ghost = { x: 100, y: 200, start: 0, phase: 0, peakAlpha: 0.9 };
  const cfg = { lifetimeMs: 750, riseSpeed: 60, driftAmp: 6, bob: 2 };
  const early = stepGhost(ghost, 10, cfg);
  const late = stepGhost(ghost, 800, cfg);
  assert.equal(early.alive, true);
  assert.ok(early.alpha > 0 && early.alpha <= 0.9);
  assert.equal(late.alive, false);
  const mid = stepGhost(ghost, 375, cfg);
  assert.ok(mid.y < ghost.y, "ghost rises (y decreases)");
});

test("makeThrottle blocks within interval and at concurrency cap", () => {
  const gate = makeThrottle(50);
  assert.equal(gate.allow(1000, 0, 8), true);   // first allowed
  assert.equal(gate.allow(1020, 1, 8), false);  // too soon
  assert.equal(gate.allow(1060, 1, 8), true);   // interval elapsed
  assert.equal(gate.allow(2000, 8, 8), false);  // at cap
});
