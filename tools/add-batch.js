/* Adds a whole batch of animals to the catalog at once.

   Usage:  node tools/add-batch.js batch/<file>.json

   The batch file is a list of animals, each with hand-written facts. Photos are
   fetched once at the end, so adding 40 animals costs one pass, not forty.

   The facts are written by hand at build time rather than generated while Cam is
   playing — no API key in a public page, works offline, and every fact gets read
   by a human before he ever sees it. */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const file = process.argv[2];
if (!file) { console.error("usage: node tools/add-batch.js batch/<file>.json"); process.exit(1); }

const batch = JSON.parse(fs.readFileSync(file, "utf8"));
const creaturesPath = path.join(ROOT, "creatures.js");
const fetchPath = path.join(ROOT, "tools", "fetch-photos.js");

let src = fs.readFileSync(creaturesPath, "utf8");
let fetchSrc = fs.readFileSync(fetchPath, "utf8");

const skipped = [];
const added = [];
let entries = "";

for (const a of batch) {
  for (const need of ["id", "name", "wiki", "emoji", "tier", "where", "zones", "facts"]) {
    if (a[need] === undefined) { console.error(a.id + ": missing " + need); process.exit(1); }
  }
  if (a.facts.length < 3) { console.error(a.id + ": needs at least 3 facts"); process.exit(1); }
  if (src.indexOf('id:"' + a.id + '"') !== -1) { skipped.push(a.id); continue; }

  entries += '\n  { id:"' + a.id + '", name:"' + a.name + '", emoji:"' + a.emoji +
    '", where:"' + a.where + '", zones:[' + a.zones.join(",") + '], tier:"' + a.tier + '"' +
    (a.tiny ? ", tiny:true" : "") +
    (a.magicOnly ? ", magicOnly:true" : "") +
    (a.endemicTo ? ', endemicTo:"' + a.endemicTo + '"' : "") +
    ',\n    facts:[' + a.facts.map(f => JSON.stringify(f)).join(",") + '] },\n';

  if (fetchSrc.indexOf("\n  " + a.id + ":") === -1) {
    fetchSrc = fetchSrc.replace(/\n\};/, ',\n  ' + a.id + ': "' + a.wiki.replace(/"/g, '\\"') + '"\n};');
  }
  added.push(a.id);
}

if (!added.length) { console.log("nothing new to add"); process.exit(0); }

const marker = "\n];\n\n/* How rare each kind is";
if (src.indexOf(marker) === -1) { console.error("couldn't find the end of the creature list"); process.exit(1); }
src = src.replace(marker, entries + "];\n\n/* How rare each kind is");

fs.writeFileSync(creaturesPath, src);
fs.writeFileSync(fetchPath, fetchSrc);

execFileSync("node", ["--check", creaturesPath], { stdio: "inherit" });
console.log("added " + added.length + " animals" + (skipped.length ? "  (already there: " + skipped.join(", ") + ")" : ""));

console.log("\nfetching photos...");
execFileSync("node", [path.join(ROOT, "tools", "fetch-photos.js")], { stdio: "inherit" });
execFileSync("node", [path.join(ROOT, "tools", "make-photos-js.js")], { stdio: "inherit" });
