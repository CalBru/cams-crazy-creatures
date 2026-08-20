/* Adds a brand new animal to the catalog, forever.

   Usage:
     node tools/add-animal.js '<json>'

   where <json> is:
     {
       "id": "axolotl",
       "name": "Axolotl",
       "wiki": "Axolotl",
       "emoji": "🦎",
       "tier": "epic",
       "where": "wild",          // "wild" = found with the Wild Trap, not tied to a world
       "zones": [1],
       "facts": ["...", "...", "..."]
     }

   It downloads the photo, appends the creature to creatures.js, and rebuilds
   photos.js. The animal is then a permanent part of the game.

   The facts are written by hand (or by Claude at build time) rather than
   generated while Cam is playing — see WILD-TRAP.md for why. */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const a = JSON.parse(process.argv[2] || "{}");

for (const need of ["id", "name", "wiki", "emoji", "tier", "facts"]) {
  if (!a[need]) { console.error("missing field: " + need); process.exit(1); }
}
a.where = a.where || "wild";
a.zones = a.zones || [1];

/* --- 1. is this id already taken? --- */
const creaturesPath = path.join(ROOT, "creatures.js");
let src = fs.readFileSync(creaturesPath, "utf8");
if (src.indexOf('id:"' + a.id + '"') !== -1) {
  console.error("that id is already in the catalog: " + a.id);
  process.exit(1);
}

/* --- 2. teach the photo fetcher about it, then fetch --- */
const fetchPath = path.join(ROOT, "tools", "fetch-photos.js");
let fetchSrc = fs.readFileSync(fetchPath, "utf8");
if (fetchSrc.indexOf("\n  " + a.id + ":") === -1) {
  fetchSrc = fetchSrc.replace(/\n\};/, ',\n  ' + a.id + ': "' + a.wiki.replace(/"/g, '\\"') + '"\n};');
  fs.writeFileSync(fetchPath, fetchSrc);
}
execFileSync("node", [path.join(ROOT, "tools", "fetch-photos.js")], { stdio: "inherit" });

const got = ["jpg", "png"].some(e => fs.existsSync(path.join(ROOT, "images", a.id + "." + e)));
if (!got) console.log("!! no photo found — it will fall back to the emoji " + a.emoji);

/* --- 3. append the creature --- */
const entry = '\n  { id:"' + a.id + '", name:"' + a.name + '", emoji:"' + a.emoji +
  '", where:"' + a.where + '", zones:[' + a.zones.join(",") + '], tier:"' + a.tier + '"' +
  (a.tiny ? ", tiny:true" : "") +
  (a.endemicTo ? ', endemicTo:"' + a.endemicTo + '"' : "") +
  ',\n    facts:[' + a.facts.map(f => JSON.stringify(f)).join(",") + '] },\n';

/* wild animals live in their own block at the end of the list */
const marker = "\n];\n\n/* How rare each kind is";
if (src.indexOf(marker) === -1) { console.error("couldn't find the end of the creature list"); process.exit(1); }
src = src.replace(marker, entry + "];\n\n/* How rare each kind is");
fs.writeFileSync(creaturesPath, src);

execFileSync("node", [path.join(ROOT, "tools", "make-photos-js.js")], { stdio: "inherit" });
console.log("\nadded " + a.name + " to the catalog (" + a.where + ", " + a.tier + ")");
