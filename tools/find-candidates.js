/* Some deep-sea animals have no good photo on their Wikipedia page.
   This searches Wikimedia Commons and downloads several candidate photos
   so we can look at them and pick the best one.

   Usage:  node tools/find-candidates.js <id> "<search words>"
   Saves:  images/_candidates/<id>_1.jpg ... _5.jpg  */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const UA = "CamsCrazyCreatures/1.0 (family learning project; cal@everydayspeech.com)";
const OUT = path.join(__dirname, "..", "images", "_candidates");
fs.mkdirSync(OUT, { recursive: true });

function get(url, binary) {
  return execFileSync("curl", ["-sSL", "--compressed", "-A", UA, "--max-time", "60", url],
    { maxBuffer: 64 * 1024 * 1024, encoding: binary ? "buffer" : "utf8" });
}

const id = process.argv[2];
const terms = process.argv[3];
if (!id || !terms) { console.error('usage: node tools/find-candidates.js <id> "<search words>"'); process.exit(1); }

const api = "https://commons.wikimedia.org/w/api.php?action=query&format=json" +
  "&generator=search&gsrnamespace=6&gsrlimit=14&gsrsearch=" + encodeURIComponent(terms) +
  "&prop=imageinfo&iiprop=url|size&iiurlwidth=700";

const json = JSON.parse(get(api, false));
const pages = (json.query && json.query.pages) ? Object.values(json.query.pages) : [];

const picks = pages
  .filter(p => /\.(jpg|jpeg|png)$/i.test(p.title))
  .filter(p => p.imageinfo && p.imageinfo[0] && p.imageinfo[0].thumburl)
  .filter(p => !/map|diagram|distribution|range|chart|logo|stamp|drawing|illustration|plate/i.test(p.title))
  .slice(0, 5);

picks.forEach((p, i) => {
  const buf = get(p.imageinfo[0].thumburl, true);
  fs.writeFileSync(path.join(OUT, id + "_" + (i + 1) + ".jpg"), buf);
  console.log((i + 1) + ". " + p.title);
});

if (!picks.length) console.log("no candidates found for " + terms);
