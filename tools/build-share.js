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

/* ---------- 1. shrink every photo, then embed it as a data: URI ---------- */
eval(fs.readFileSync(path.join(ROOT, "photos.js"), "utf8").replace("var PHOTOS", "globalThis.PHOTOS"));

const WIDTH = 460;          /* the card shows about 500px wide */
const QUALITY = 62;

const embedded = {};
let totalBytes = 0;

Object.keys(PHOTOS).forEach((id, i) => {
  const src = path.join(IMAGES, PHOTOS[id].file);
  const out = path.join(TMP, id + ".jpg");
  if (!fs.existsSync(src)) { console.log("missing " + src); return; }

  /* sips ships with macOS — resize and re-compress as JPEG */
  execFileSync("sips", ["-Z", String(WIDTH),
                        "-s", "format", "jpeg",
                        "-s", "formatOptions", String(QUALITY),
                        src, "--out", out], { stdio: "ignore" });

  const b64 = fs.readFileSync(out).toString("base64");
  totalBytes += b64.length;
  embedded[id] = { data: "data:image/jpeg;base64," + b64, title: PHOTOS[id].title, url: PHOTOS[id].url };
  if (i % 20 === 0) process.stdout.write(".");
});

console.log("\nphotos embedded: " + Object.keys(embedded).length +
            " (" + Math.round(totalBytes / 1024 / 1024 * 10) / 10 + " MB of base64)");

/* ---------- 2. stitch the game into one file ---------- */
let html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const creatures = fs.readFileSync(path.join(ROOT, "creatures.js"), "utf8");

const photoScript = "var PHOTOS = " + JSON.stringify(embedded) + ";\n" +
  /* photoOf() normally builds a path; here the photo is already inline */
  "function __sharedPhotoOf(id) { return PHOTOS[id] ? PHOTOS[id].data : null; }\n";

html = html.replace('<script src="photos.js"></script>', "<script>" + photoScript + "</script>");
html = html.replace('<script src="creatures.js"></script>', "<script>" + creatures + "</script>");

/* use the inline photo data instead of a file path */
html = html.replace('function photoOf(id) { return PHOTOS[id] ? "images/" + PHOTOS[id].file : null; }',
                    'function photoOf(id) { return __sharedPhotoOf(id); }');

/* ---------- 3. shared-version tweaks ---------- */

/* Some browsers block storage inside a shared frame. Never let that break the game. */
html = html.replace(
  "function load() {\n  const merged =",
  "function load() {\n  try { void localStorage.length; } catch (e) { return; }   /* storage blocked — play without saving */\n  const merged =");

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
  '  <p class="byline">Designed by Cam, age 6. All 153 creatures are real, with a real ' +
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
