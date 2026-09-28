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

/* Sweep by FAME, not by taxonomy.

   The taxonomy approach looked obvious and was wrong three different ways:
   Wikidata nests birds INSIDE Reptilia (cladistically correct, useless here),
   so the reptile pass returned ostriches; the shark QID matched nothing at all;
   and the fish and insect passes were heavy enough to time out.

   Sweeping fame bands instead is one cheap query per band, and what an animal
   IS comes from its own English description — which is what the card shows
   anyway. Anything whose description doesn't read like an animal is dropped,
   which also keeps plants and fungi out for free. */
const BANDS = [
  [120, 9999], [90, 120], [72, 90], [60, 72], [50, 60],
  [43, 50], [37, 43], [32, 37], [28, 32], [24, 28], [20, 24], [17, 20]
];
const WANT = 700;

/* Fame alone hands back a pool that is more than half small brown birds, and
   a Wild Trap that keeps producing warblers is the specimen-drawer problem
   wearing a different hat. Cap the big groups so the rest gets a look in. */
const CAP = { bird: 170, mammal: 200 };
const CAP_DEFAULT = 200;

/* What kind of thing is this, judging by how Wikidata describes it.

   There is no catch-all. An earlier version ended `species of` and happily
   classified bindweed, silver fir, wheat and several fungi as animals. If a
   description doesn't clearly say animal, it doesn't go in the pool. */
const NOT_ANIMAL = /\bplant\b|\btree\b|fungus|fungi|mushroom|algae|\bmoss\b|\bfern\b|flower|grass|shrub|\bherb\b|orchid|wheat|\boak\b|\bfig\b|plum|cherry|berry|lichen|seaweed|conifer|\bpalm\b|cactus|bacteri|virus|\bgenus\b|\bfamily\b|extinct/i;

const GROUPS = [
  [/\bshark\b|\bray\b|skate\b|sawfish/i,                                    "shark/ray",  "\u{1F988}"],
  [/\bfish\b|salmon|trout|\beel\b|seahorse|herring|\bcod\b|tuna|carp\b|perch|catfish|goby|wrasse/i,
                                                                                 "fish",       "\u{1F41F}"],
  [/\bbird\b|\bowl\b|eagle|parrot|penguin|\bduck\b|finch|seabird|hawk|falcon|heron|gull\b|tern\b|wader|songbird|cockatoo|pigeon|crow\b|sparrow|warbler|thrush|swan\b|goose|stork|crane\b|woodpecker|hummingbird|pheasant|quail/i,
                                                                                 "bird",       "\u{1F426}"],
  [/mammal|whale|dolphin|\bbat\b|rodent|primate|monkey|\bape\b|lemur|\bbear\b|\bcat\b|\bdog\b|deer\b|antelope|\bseal\b|squirrel|\bmouse\b|\brat\b|rabbit|\bhare\b|\bfox\b|wolf\b|horse|zebra|\bpig\b|\bboar\b|cattle|sheep|goat\b|marsupial|kangaroo|possum|otter|weasel|badger|hyena|mongoose|shrew|hedgehog|elephant|rhino|hippo|giraffe|camel|llama|sloth|armadillo|anteater|porcupine|beaver|\bvole\b/i,
                                                                                 "mammal",     "\u{1F98A}"],
  [/reptile|snake\b|lizard|turtle|tortoise|crocodil|gecko|python|viper|cobra|skink|iguana|chameleon|monitor lizard|alligator|caiman/i,
                                                                                 "reptile",    "\u{1F98E}"],
  [/amphibian|\bfrog\b|toad\b|salamander|\bnewt\b|caecilian/i,              "amphibian",  "\u{1F438}"],
  [/insect|beetle|butterfly|\bmoth\b|\bbee\b|wasp\b|\bant\b|dragonfly|grasshopper|cricket|mantis|cicada|termite|\bfly\b|weevil|aphid|earwig|damselfly|\bbug\b/i,
                                                                                 "insect",     "\u{1FAB2}"],
  [/spider|arachnid|scorpion|\bmite\b|\btick\b|harvestman/i,                 "spider",     "\u{1F577}\uFE0F"],
  [/mollusc|mollusk|crustacean|\bcrab\b|shrimp|lobster|octopus|squid|cuttlefish|jellyfish|coral\b|starfish|urchin|\bworm\b|snail|\bclam\b|sponge|anemone|barnacle|krill|nautilus/i,
                                                                                 "sea animal", "\u{1F41A}"]
];

function sparql(q) {
  const out = execFileSync("curl", ["-sSL", "-G",
    "--data-urlencode", "query=" + q,
    "-H", "Accept: application/sparql-results+json",
    "-A", UA, "--max-time", "180",
    "https://query.wikidata.org/sparql"], { maxBuffer: 64 * 1024 * 1024, encoding: "utf8" });
  return JSON.parse(out).results.bindings;
}

function query(lo, hi) {
  return `SELECT ?desc ?img ?article ?sl WHERE {
    ?item wdt:P31 wd:Q16521 ; wdt:P105 wd:Q7432 ; wdt:P18 ?img ; wikibase:sitelinks ?sl .
    FILTER(?sl > ${lo} && ?sl <= ${hi})
    ?article schema:about ?item ; schema:isPartOf <https://en.wikipedia.org/> .
    OPTIONAL { ?item schema:description ?desc FILTER(LANG(?desc)="en") }
  } ORDER BY DESC(?sl) LIMIT 900`;
}

/* photos we don't want a six-year-old to open */
const BAD_PHOTO = /skull|skelet|fossil|dissect|anatomy|parasit|roadkill|dead|carcass|specimen|museum|drawing|illustration|plate|map|range|distribution|diagram|chart|stamp|coin|logo|sign/i;

/* A Wikipedia article titled with a bare binomial means there IS no common
   English name, and "Bolinus brandaris" on a card teaches a six-year-old
   nothing. Catching those is fiddlier than it looks: "Glossy ibis" and
   "Common octopus" have the same shape. Two signals together do it — a Latin
   ending on the epithet, and an epithet no other entry reuses — with an
   escape hatch for names that start with an ordinary English modifier. */
const LATIN_TAIL = /^[A-Z][a-z]+ [a-z]+(us|um|is|ii|ae|ensis|icus|ica|inus|oides|formis|aris|atus|ata|ella|ifer|ipes)$/;
const ENGLISH_FIRST = new Set(("glossy european virginia chambered pygmy common mimic giant red great " +
  "little northern southern eastern western atlantic pacific sea wood water house field garden black " +
  "white brown grey gray golden spotted striped banded green blue yellow american african asian indian " +
  "japanese chinese australian arctic desert mountain river tree ground king queen dwarf lesser greater " +
  "spiny hairy long short big small false true").split(" "));

function looksScientific(name, lastWordCounts) {
  if (!LATIN_TAIL.test(name)) return false;
  const words = name.toLowerCase().split(" ");
  if (ENGLISH_FIRST.has(words[0])) return false;
  return (lastWordCounts[words[words.length - 1]] || 0) <= 1;
}

/* names that are really groups, or that read badly */
const BAD_NAME = /^Q\d+$|\(|virus|bacteri|^List |disambiguation/i;

const existing = new Set();
{
  const src = fs.readFileSync(path.join(ROOT, "creatures.js"), "utf8");
  (src.match(/name:"([^"]+)"/g) || []).forEach(m => existing.add(m.slice(6, -1).toLowerCase()));
}

/* The very famous animals live in fame bands that time out, but the old
   taxonomy query reached them fine for these five groups — that is where
   Lion, Tiger and Giant panda come from. Reptiles are deliberately not here:
   Wikidata nests birds inside Reptilia, so that query returns ostriches. */
const CORE = [
  { qid: "Q7377",  fame: 55 },   /* mammals   */
  { qid: "Q5113",  fame: 55 },   /* birds     */
  { qid: "Q10908", fame: 30 },   /* amphibians*/
  { qid: "Q1358",  fame: 22 },   /* spiders   */
  { qid: "Q25326", fame: 26 }    /* sea life  */
];
function coreQuery(c) {
  return `SELECT ?desc ?img ?article ?sl WHERE {
    ?item wdt:P31 wd:Q16521 ; wdt:P105 wd:Q7432 ; wdt:P18 ?img ;
          wdt:P171* wd:${c.qid} ; wikibase:sitelinks ?sl .
    FILTER(?sl > ${c.fame})
    ?article schema:about ?item ; schema:isPartOf <https://en.wikipedia.org/> .
    OPTIONAL { ?item schema:description ?desc FILTER(LANG(?desc)="en") }
  } ORDER BY DESC(?sl) LIMIT 400`;
}

/* Re-runs top the pool up rather than starting over, so a band that times out
   today can be picked up tomorrow without losing what already worked. */
const pool = [];
const seen = new Set();
const counts = {};
const wildPath = path.join(ROOT, "wild.js");
if (fs.existsSync(wildPath)) {
  try {
    const prev = require("vm").runInNewContext(
      fs.readFileSync(wildPath, "utf8") + ";WILD");
    prev.sort((a, b) => b.fame - a.fame).forEach(w => {
      const kind = w.kind || "";
      if (NOT_ANIMAL.test(kind)) return;
      const hit = GROUPS.find(gp => gp[0].test(kind));
      if (!hit) return;
      if ((counts[hit[1]] || 0) >= (CAP[hit[1]] || CAP_DEFAULT)) return;
      seen.add(w.name.toLowerCase());
      counts[hit[1]] = (counts[hit[1]] || 0) + 1;
      /* re-label, so nothing keeps a group from an older classifier */
      pool.push(Object.assign({}, w, { group: hit[1], emoji: hit[2] }));
    });
    console.log("kept " + pool.length + " from the previous pool");
  } catch (e) { console.log("(couldn't read the previous wild.js)"); }
}

function absorb(rows, label) {
  let added = 0;
  for (const r of rows) {
    if (pool.length >= WANT) break;
    /* the article title is the common name; the Wikidata label is often the
       binomial, which is how the first run produced "Ursus maritimus" */
    const title = decodeURIComponent(r.article.value.split("/wiki/")[1] || "").replace(/_/g, " ");
    const file = decodeURIComponent(r.img.value.split("/").pop());
    const key = title.toLowerCase();
    const desc = r.desc ? r.desc.value : "";
    if (!title || seen.has(key) || existing.has(key)) continue;
    if (BAD_NAME.test(title)) continue;
    if (BAD_PHOTO.test(file)) continue;
    if (!/\.(jpg|jpeg|png)$/i.test(file)) continue;
    if (!desc || NOT_ANIMAL.test(desc)) continue;
    const hit = GROUPS.find(gp => gp[0].test(desc));
    if (!hit) continue;
    if ((counts[hit[1]] || 0) >= (CAP[hit[1]] || CAP_DEFAULT)) continue;
    seen.add(key);
    counts[hit[1]] = (counts[hit[1]] || 0) + 1;
    pool.push({
      name: title.charAt(0).toUpperCase() + title.slice(1),
      kind: desc, group: hit[1], emoji: hit[2],
      file: file, article: r.article.value, fame: Number(r.sl.value)
    });
    added++;
  }
  console.log("  " + label + ": +" + added + "  (pool " + pool.length + ")");
}

for (const c of CORE) {
  if (pool.length >= WANT) break;
  let rows = [];
  for (let a = 0; a < 3 && !rows.length; a++) {
    try { rows = sparql(coreQuery(c)); } catch (e) {}
  }
  absorb(rows, "core " + c.qid);
}

for (const [lo, hi] of BANDS) {
  if (pool.length >= WANT) break;
  let rows = [];
  for (let a = 0; a < 3 && !rows.length; a++) {
    try { rows = sparql(query(lo, hi)); } catch (e) {}
  }
  absorb(rows, "fame " + lo + "-" + hi);
}

/* strip bare scientific names, now that the whole pool is known */
{
  const lastWordCounts = {};
  pool.forEach(w => {
    const l = w.name.toLowerCase().split(" ").pop();
    lastWordCounts[l] = (lastWordCounts[l] || 0) + 1;
  });
  const before = pool.length;
  for (let i = pool.length - 1; i >= 0; i--) {
    if (looksScientific(pool[i].name, lastWordCounts)) pool.splice(i, 1);
  }
  if (before !== pool.length) console.log("dropped " + (before - pool.length) + " bare scientific names");
}

pool.sort((a, b) => b.fame - a.fame);
fs.writeFileSync(path.join(ROOT, "wild.js"),
  "/* Famous real animals that are NOT in the hand-written catalog.\n" +
  "   The Wild Trap catches these, and they start out with no facts at all.\n" +
  "   Built by tools/harvest-wild.js \u2014 don't edit by hand. */\n" +
  "var WILD = " + JSON.stringify(pool, null, 1) + ";\n");

console.log("\nwild pool: " + pool.length + " animals");
console.log("by kind: " + JSON.stringify(counts));
console.log("most famous: " + pool.slice(0, 12).map(p => p.name).join(", "));
