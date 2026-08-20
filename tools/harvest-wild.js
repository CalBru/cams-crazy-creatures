/* Harvests a pool of famous real animals from Wikidata, for the Wild Trap.

   Run:  node tools/harvest-wild.js
   Out:  wild.js  — name, what kind of thing it is, photo filename, article

   Why build time and not while Cam is playing: a live query takes 9-12 seconds
   and, without a fame filter, serves up obscure molluscs photographed in museum
   specimen trays. See WILD-TRAP.md. */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const UA = "CamsCrazyCreatures/1.0 (family learning project; cal@everydayspeech.com)";
const ROOT = path.join(__dirname, "..");

/* the animal groups worth drawing from, and how many of each */
const GROUPS = [
  { name: "mammal",     qid: "Q7377",   emoji: "🦊", want: 110, fame: 28 },
  { name: "bird",       qid: "Q5113",   emoji: "🐦", want: 90,  fame: 26 },
  { name: "reptile",    qid: "Q10811",  emoji: "🦎", want: 55,  fame: 20 },
  { name: "amphibian",  qid: "Q10908",  emoji: "🐸", want: 30,  fame: 16 },
  { name: "shark/ray",  qid: "Q189370", emoji: "🦈", want: 30,  fame: 14 },
  { name: "fish",       qid: "Q27207",  emoji: "🐟", want: 55,  fame: 18 },
  { name: "insect",     qid: "Q1390",   emoji: "🪲", want: 55,  fame: 18 },
  { name: "spider",     qid: "Q1358",   emoji: "🕷️", want: 25,  fame: 14 },
  { name: "sea animal", qid: "Q25326",  emoji: "🐚", want: 25,  fame: 16 }
];

function sparql(q) {
  const out = execFileSync("curl", ["-sSL", "-G",
    "--data-urlencode", "query=" + q,
    "-H", "Accept: application/sparql-results+json",
    "-A", UA, "--max-time", "180",
    "https://query.wikidata.org/sparql"], { maxBuffer: 64 * 1024 * 1024, encoding: "utf8" });
  return JSON.parse(out).results.bindings;
}

function query(group) {
  return `SELECT ?itemLabel ?desc ?img ?article ?sl WHERE {
    ?item wdt:P31 wd:Q16521 ; wdt:P105 wd:Q7432 ; wdt:P18 ?img ;
          wdt:P171* wd:${group.qid} ; wikibase:sitelinks ?sl .
    FILTER(?sl > ${group.fame})
    ?article schema:about ?item ; schema:isPartOf <https://en.wikipedia.org/> .
    OPTIONAL { ?item schema:description ?desc FILTER(LANG(?desc)="en") }
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
  } ORDER BY DESC(?sl) LIMIT ${group.want * 3}`;
}

/* photos we don't want a six-year-old to open */
const BAD_PHOTO = /skull|skelet|fossil|dissect|anatomy|parasit|roadkill|dead|carcass|specimen|museum|drawing|illustration|plate|map|range|distribution|diagram|chart|stamp|coin|logo|sign/i;

/* names that are really groups, or that read badly */
const BAD_NAME = /^Q\d+$|\(|virus|bacteri/i;

const existing = new Set();
{
  const src = fs.readFileSync(path.join(ROOT, "creatures.js"), "utf8");
  (src.match(/name:"([^"]+)"/g) || []).forEach(m => existing.add(m.slice(6, -1).toLowerCase()));
}

const pool = [];
const seen = new Set();

GROUPS.forEach(group => {
  let rows = [];
  try { rows = sparql(query(group)); }
  catch (e) { console.log("  " + group.name + ": query failed (" + e.message.slice(0, 40) + ")"); return; }

  let added = 0;
  for (const r of rows) {
    if (added >= group.want) break;
    const name = r.itemLabel.value.trim();
    const file = decodeURIComponent(r.img.value.split("/").pop());
    const key = name.toLowerCase();

    if (seen.has(key) || existing.has(key)) continue;
    if (BAD_NAME.test(name)) continue;
    if (BAD_PHOTO.test(file)) continue;
    if (!/\.(jpg|jpeg|png)$/i.test(file)) continue;

    seen.add(key);
    pool.push({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      kind: (r.desc ? r.desc.value : group.name + " species"),
      group: group.name,
      emoji: group.emoji,
      file: file,
      article: r.article.value,
      fame: Number(r.sl.value)
    });
    added++;
  }
  console.log("  " + group.name + ": " + added);
});

pool.sort((a, b) => b.fame - a.fame);
fs.writeFileSync(path.join(ROOT, "wild.js"),
  "/* Famous real animals that are NOT in the hand-written catalog.\n" +
  "   The Wild Trap catches these, and they start out with no facts at all.\n" +
  "   Built by tools/harvest-wild.js — don't edit by hand. */\n" +
  "var WILD = " + JSON.stringify(pool, null, 1) + ";\n");

console.log("\nwild pool: " + pool.length + " animals");
console.log("most famous: " + pool.slice(0, 12).map(p => p.name).join(", "));
