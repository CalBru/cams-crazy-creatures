/* Builds a single self-contained HTML file of the game that can be shared
   with anyone — every photo is shrunk and embedded, so there are no
   external requests at all.

   Run:  node tools/build-share.js
   Out:  share/cams-crazy-creatures.html  */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const IMAGES = path.join(ROOT, "images");
const TMP = path.join(ROOT, ".build-thumbs");
const OUTDIR = path.join(ROOT, "share");

fs.mkdirSync(TMP, { recursive: true });
fs.mkdirSync(OUTDIR, { recursive: true });

/* Stamp the build first, so the copy that goes up and the version.json next to
   it always agree — see tools/stamp-build.js. */
execFileSync("node", [path.join(__dirname, "stamp-build.js")], { stdio: "inherit" });

/* ---------- 1. shrink every photo, then embed it as a data: URI ---------- */
eval(fs.readFileSync(path.join(ROOT, "photos.js"), "utf8").replace("var PHOTOS", "globalThis.PHOTOS"));

/* One file has to hold every photo in the game, and the catalog keeps growing.
   Rather than hand-tuning these two numbers every time a world is added, try
   the nicest setting first and step down until the whole thing fits. */
const PRESETS = [
  { width: 460, quality: 62 },   /* the card shows about 500px wide */
  { width: 420, quality: 52 },
  { width: 380, quality: 44 },
  { width: 340, quality: 38 }
];
const LIMIT_MB = 15;                       /* the artifact ceiling is 16 */
const CODE_ALLOWANCE = 0.6 * 1024 * 1024;  /* room for the game itself */

function embedAll(width, quality) {
  const out = {};
  let bytes = 0;
  Object.keys(PHOTOS).forEach((id, i) => {
    const src = path.join(IMAGES, PHOTOS[id].file);
    const tmp = path.join(TMP, id + ".jpg");
    if (!fs.existsSync(src)) { console.log("missing " + src); return; }
    /* sips ships with macOS — resize and re-compress as JPEG */
    execFileSync("sips", ["-Z", String(width),
                          "-s", "format", "jpeg",
                          "-s", "formatOptions", String(quality),
                          src, "--out", tmp], { stdio: "ignore" });
    const b64 = fs.readFileSync(tmp).toString("base64");
    bytes += b64.length;
    out[id] = { data: "data:image/jpeg;base64," + b64, title: PHOTOS[id].title, url: PHOTOS[id].url };
    if (i % 20 === 0) process.stdout.write(".");
  });
  return { embedded: out, bytes: bytes };
}

let embedded, totalBytes, used;
for (let i = 0; i < PRESETS.length; i++) {
  used = PRESETS[i];
  const r = embedAll(used.width, used.quality);
  embedded = r.embedded; totalBytes = r.bytes;
  const mb = totalBytes / 1024 / 1024;
  console.log("\n" + Object.keys(embedded).length + " photos at " + used.width +
              "px q" + used.quality + " — " + Math.round(mb * 10) / 10 + " MB of base64");
  if (totalBytes + CODE_ALLOWANCE < LIMIT_MB * 1024 * 1024) break;
  if (i === PRESETS.length - 1) {
    console.error("build-share: even the smallest setting won't fit under " + LIMIT_MB + " MB.\n" +
                  "  Add another step to PRESETS, or the shared copy has to drop some photos.");
    process.exit(1);
  }
  console.log("  too big — trying a smaller setting");
}

/* Every edit below rewrites a specific piece of index.html. If index.html is
   refactored and one of them stops matching, .replace() quietly does nothing and
   the shared copy ships subtly broken — which is exactly what happened to the
   photo swap. So the ones that matter go through here and fail loudly. */
function mustReplace(text, find, replaceWith, what) {
  const out = text.replace(find, replaceWith);
  if (out === text) {
    console.error("build-share: could not find " + what + " in index.html.\n" +
                  "  Something was refactored. Fix this replacement before shipping.");
    process.exit(1);
  }
  return out;
}

/* ---------- 2. stitch the game into one file ---------- */
let html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const creatures = fs.readFileSync(path.join(ROOT, "creatures.js"), "utf8");
/* counted, not typed, so the blurb can't go stale the next time a batch lands */
const creatureCount = require("vm").runInNewContext(creatures + ";CREATURES.length");

const photoScript = "var PHOTOS = " + JSON.stringify(embedded) + ";\n";

html = mustReplace(html, /<script src="photos\.js[^"]*"><\/script>/,
                   "<script>" + photoScript + "</script>", "the photos.js tag");
html = mustReplace(html, /<script src="creatures\.js[^"]*"><\/script>/,
                   "<script>" + creatures + "</script>", "the creatures.js tag");

/* The photo is already inline here, so don't go looking for a file beside us.
   Animals Cam added himself keep their Wikipedia URL, so that line stays. */
html = mustReplace(html, '  if (PHOTOS[id]) return "images/" + PHOTOS[id].file;',
                   "  if (PHOTOS[id]) return PHOTOS[id].data;", "the photo path lookup");

/* ---------- 3. shared-version tweaks ---------- */

/* The Wild Trap fetches a photo from Wikimedia when the card opens, and a
   shared single file makes no external requests at all — that is the whole
   reason the photos are embedded. So it is stripped out of this build rather
   than shipped as a trap that silently shows a broken image. */
html = mustReplace(html, /<script src="wild\.js[^"]*"><\/script>/, "<script>var WILD = [];</script>",
                   "the wild.js tag");
html = html.replace(/\n  document\.write\('<script src="wild\.js"><\\\/script>'\);/, "");

/* There is no version.json sitting next to a single shared file, and a visitor
   has nothing to update to anyway. "shared" switches that check off. */
html = mustReplace(html, /const BUILD = "[^"]*";/, 'const BUILD = "shared";', "the BUILD stamp");

/* Some browsers block storage inside a shared frame. Never let that break the game. */
html = mustReplace(html,
  "function load() {\n  const merged =",
  "function load() {\n  try { void localStorage.length; } catch (e) { return; }   /* storage blocked — play without saving */\n  const merged =",
  "the load() guard");

/* Give a visitor enough points to buy the Deep Suit right away, so they can
   actually go see the strange things instead of grinding for them. */
html = html.replace(
  "let state = { score: 0, magic: 1, found: [], counts: {},",
  "let state = { score: 9000, magic: 3, found: [], counts: {},");
html = html.replace(
  "const merged = { score: 0, magic: 1, found: [], counts: {},",
  "const merged = { score: 9000, magic: 3, found: [], counts: {},");

/* Who made this, for the grown-ups it's being shared with */
html = html.replace(
  '<p class="sub">The deeper you go, the weirder the creatures get.</p>',
  '<p class="sub">The deeper you go, the weirder the creatures get.</p>\n' +
  '  <p class="byline">Designed by Cam, age 6. All ' + creatureCount + ' creatures are real, with a real ' +
  'photo and real facts — a 512-year-old shark, a snail that builds armor out of iron, a ' +
  'fish with a see-through head, and islands full of animals that live in one place on ' +
  'Earth and nowhere else.<br><b>You start with 9,000 points</b> — spend them in the shop ' +
  'on a Deep Suit or the Boat and go find the strange stuff.</p>');

html = html.replace(
  "  .howto {",
  "  .byline {\n" +
  "    max-width: 620px; margin: -8px auto 20px; font-size: 15px;\n" +
  "    color: #cfe6ff; line-height: 1.5; opacity: .92;\n" +
  "  }\n" +
  "  .howto {");

/* A shared page can't hand the visitor a file, so drop the backup buttons
   instead of shipping controls that do nothing — and strip the code behind them. */
html = html.replace(/<div id="bookTools">[\s\S]*?<\/div>\s*/, "");
html = html.replace(
  /function exportSave\(\) \{[\s\S]*?\n\}\n/,
  "function exportSave() { /* not available in a shared copy */ }\n");
html = html.replace(
  /function importSave\(input\) \{[\s\S]*?\n\}\n/,
  "function importSave() { /* not available in a shared copy */ }\n");

/* Be honest that a shared copy starts fresh every time */
html = html.replace(
  '<div id="saveNote">Your book saves by itself. It stays even when the game gets updated.</div>',
  '<div id="saveNote">This shared copy starts fresh each visit — nothing is saved.</div>');
html = html.replace(
  '"Your book saves by itself. It stays even when the game gets updated.";',
  '"This shared copy starts fresh each visit — nothing is saved.";');

const outFile = path.join(OUTDIR, "cams-crazy-creatures.html");
fs.writeFileSync(outFile, html);

const mb = Math.round(fs.statSync(outFile).size / 1024 / 1024 * 10) / 10;
console.log("wrote " + outFile + "  (" + mb + " MB)");
if (mb > 15) console.log("!! too big for an artifact (16 MB limit) — lower WIDTH or QUALITY");

fs.rmSync(TMP, { recursive: true, force: true });
