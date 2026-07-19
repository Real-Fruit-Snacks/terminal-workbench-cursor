// Verifies the ghost helpers inlined in main.js still match the tested
// reference implementations in ghost-core.js. Comments and blank lines are
// ignored; any code difference fails the check. Run with: node test/check-ghost-sync.js

const fs = require("fs");
const path = require("path");

const SHARED_FUNCTIONS = ["buildGhostSvg", "resolvePalette", "stepGhost", "makeThrottle"];

function extractFunction(source, name) {
  const start = source.indexOf(`function ${name}(`);
  if (start === -1) return null;
  let depth = 0;
  let seenBrace = false;
  for (let i = start; i < source.length; i++) {
    const ch = source[i];
    if (ch === "{") {
      depth++;
      seenBrace = true;
    } else if (ch === "}") {
      depth--;
      if (seenBrace && depth === 0) return source.slice(start, i + 1);
    }
  }
  return null;
}

function normalize(code) {
  // No $ anchor: on CRLF checkouts each line keeps a trailing \r, which $
  // (a line-terminator-aware anchor) refuses to match past. `.` already
  // stops at the line end, so the bare pattern strips comments either way.
  return code
    .split("\n")
    .map((line) => line.replace(/\/\/.*/, "").trim())
    .filter((line) => line.length > 0)
    .join("\n");
}

const root = path.join(__dirname, "..");
const core = fs.readFileSync(path.join(root, "ghost-core.js"), "utf8");
const main = fs.readFileSync(path.join(root, "main.js"), "utf8");

let failed = false;
for (const name of SHARED_FUNCTIONS) {
  const coreFn = extractFunction(core, name);
  const mainFn = extractFunction(main, name);
  if (!coreFn || !mainFn) {
    console.error(`MISSING: ${name} (${coreFn ? "" : "ghost-core.js"}${!coreFn && !mainFn ? ", " : ""}${mainFn ? "" : "main.js"})`);
    failed = true;
    continue;
  }
  if (normalize(coreFn) !== normalize(mainFn)) {
    console.error(`OUT OF SYNC: ${name} differs between ghost-core.js and main.js`);
    failed = true;
  }
}

if (failed) {
  console.error("ghost-core.js is the tested reference; update the inlined copies in main.js to match.");
  process.exit(1);
}
console.log(`ghost sync OK: ${SHARED_FUNCTIONS.length} shared functions match`);
