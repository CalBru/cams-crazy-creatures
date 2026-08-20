/* Downloads one photo per creature from Wikipedia into images/.
   Run with:  node tools/fetch-photos.js
   Photos are saved locally so the game works with no internet. */

const fs = require("fs");
const UA = "CamsCrazyCreatures/1.0 (family learning project; cal@everydayspeech.com)";
const path = require("path");

const OUT = path.join(__dirname, "..", "images");
fs.mkdirSync(OUT, { recursive: true });

/* id -> Wikipedia article title */
const WIKI = {
  /* ---- ocean ---- */
  crab: "Crab",
  starfish: "Pisaster ochraceus",
  urchin: "Sea urchin",
  clownfish: "Amphiprioninae",
  jellyfish: "Jellyfish",
  pufferfish: "Diodon holocanthus",
  seahorse: "Seahorse",
  turtle: "Sea turtle",
  octopus: "Octopus",
  dolphin: "Bottlenose dolphin",
  barracuda: "Barracuda",
  marlin: "Marlin",
  mantaray: "Manta ray",
  hammerhead: "Hammerhead shark",
  greatwhite: "Great white shark",
  sunfish: "Ocean sunfish",
  nautilus: "Nautilus",
  mantisshrimp: "Mantis shrimp",
  leafyseadragon: "Leafy seadragon",
  bluedragon: "Glaucus atlanticus",
  anglerfish: "Humpback anglerfish",
  viperfish: "Chauliodus sloani",
  lanternfish: "Lanternfish",
  vampiresquid: "Vampire squid",
  dumbo: "Grimpoteuthis",
  giantisopod: "Bathynomus giganteus",
  gulpereel: "Eurypharynx pelecanoides",
  frilledshark: "Frilled shark",
  goblinshark: "Goblin shark",
  narwhal: "Narwhal",
  blobfish: "Psychrolutes phrictus",
  yeticrab: "Kiwa hirsuta",
  coelacanth: "Coelacanth",
  oarfish: "Regalecus glesne",
  immortaljelly: "Turritopsis dohrnii",
  spermwhale: "Sperm whale",
  giantsquid: "Architeuthis",
  colossalsquid: "Colossal squid",
  megamouth: "Megamouth shark",
  greenlandshark: "Greenland shark",
  whaleshark: "Whale shark",
  orca: "Killer whale",
  humpback: "Humpback whale",
  bluewhale: "Blue whale",
  sponge: "Xestospongia muta",

  /* ---- land ---- */
  rolypoly: "Armadillidiidae",
  earthworm: "Earthworm",
  ant: "Ant",
  snail: "Land snail",
  bee: "Honey bee",
  cricket: "Gryllus campestris",
  grasshopper: "Grasshopper",
  beetle: "Chrysochroa fulgidissima",
  spider: "Jumping spider",
  frog: "Agalychnis callidryas",
  gecko: "Gecko",
  hornet: "Hornet",
  mantis: "Mantis",
  blackwidow: "Latrodectus",
  tarantula: "Brachypelma hamorii",
  millipede: "Archispirostreptus gigas",
  stagbeetle: "Stag beetle",
  rhinobeetle: "Dynastes hercules",
  atlasmoth: "Attacus atlas",
  walkingstick: "Phasmatodea",
  orchidmantis: "Hymenopus coronatus",
  poisondartfrog: "Poison dart frog",
  glassfrog: "Glass frog",
  goliathbirdeater: "Theraphosa blondi",
  hedgehog: "Hedgehog",
  viper: "Gaboon viper",
  chameleon: "Chameleon",
  pangolin: "Manis temminckii",
  titanbeetle: "Titanus giganteus",
  scorpion: "Scorpion",
  sidewinder: "Crotalus cerastes",
  gilamonster: "Gila monster",
  thornydevil: "Thorny devil",
  fennecfox: "Fennec fox",
  jerboa: "Jerboa",
  camelspider: "Solifugae",
  tarantulahawk: "Tarantula hawk",
  hornedlizard: "Horned lizard",
  deserttortoise: "Desert tortoise",
  kingcobra: "King cobra",
  komodo: "Komodo dragon",
  cheetah: "Cheetah",
  galapagostortoise: "Galápagos tortoise",

  /* ---- the deep: hadal zone, volcano vents, and the mythics ---- */
  hatchetfish: "Marine hatchetfish",
  giantamphipod: "Alicella gigantea",
  seapig: "Scotoplanes globosa",
  glasssquid: "Cranchiidae",
  barreleye: "Macropinna microstoma",
  dragonfish: "Barbeled dragonfish",
  ghostshark: "Chimaera",
  combjelly: "Ctenophora",
  hadalsnailfish: "Snailfish",
  zombieworm: "Osedax",
  ventshrimp: "Rimicaris exoculata",
  tubeworm: "Riftia pachyptila",
  pompeiiworm: "Alvinella pompejana",
  deepseaoctopus: "Graneledone boreopacifica",
  scalyfootsnail: "Chrysomallon squamiferum",
  theoldone: "Greenland shark",
  theghost: "Bigfin squid",
  thekraken: "Colossal squid",
  ironclad: "Chrysomallon squamiferum",
  theancient: "Gal\u00e1pagos tortoise",

  /* ---- islands and underground ---- */
  darwinsfinch: "Medium ground finch",
  marineiguana: "Marine iguana",
  bluefootedbooby: "Blue-footed booby",
  flightlesscormorant: "Flightless cormorant",
  galapagospenguin: "Galápagos penguin",
  ringtailedlemur: "Ring-tailed lemur",
  pantherchameleon: "Panther chameleon",
  tomatofrog: "Dyscophus antongilii",
  giraffeweevil: "Giraffe weevil",
  ayeaye: "Aye-aye",
  fossa: "Fossa (animal)",
  babirusa: "Babirusa",
  maleo: "Maleo",
  spectraltarsier: "Gursky's spectral tarsier",
  bearcuscus: "Sulawesi bear cuscus",
  kea: "Kea",
  kiwi: "Kiwi (bird)",
  giantweta: "Giant weta",
  tuatara: "Tuatara",
  kakapo: "Kakapo",
  lonesomegeorge: "Lonesome George",
  springtail: "Springtail",
  grub: "Larva",
  soilcentipede: "Geophilomorpha",
  cicadanymph: "Magicicada",
  mole: "Mole (animal)",
  antqueen: "Lasius niger",
  cavecricket: "Rhaphidophoridae",
  pseudoscorpion: "Pseudoscorpion",
  bat: "Mexican free-tailed bat",
  cavespider: "Meta menardi",
  glowworm: "Arachnocampa luminosa",
  cavecrayfish: "Cambarus",
  blindcavefish: "Mexican tetra",
  starnosedmole: "Star-nosed mole",
  nakedmolerat: "Naked mole-rat",
  texasblindsalamander: "Texas blind salamander",
  olm: "Olm",
  caverobberfly: "Asilidae",
  caveshrimp: "Kentucky cave shrimp",
  illacme: "Illacme plenipes",
  movilecentipede: "Cryptops speleorex",
  devilworm: "Halicephalobus mephisto",
  thesleeper: "Olm",
  theempress: "Lasius niger"
};

const { execFileSync } = require("child_process");

/* Node's own https requests kept getting rate-limited, so we shell out to curl. */
function get(url, binary) {
  const args = ["-sSL", "--compressed", "-A", UA, "--max-time", "60", url];
  return execFileSync("curl", args, { maxBuffer: 64 * 1024 * 1024, encoding: binary ? "buffer" : "utf8" });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

function sleepSync(ms) { execFileSync("sleep", [String(ms / 1000)]); }

/* Wikipedia rate-limits bursts, so back off and try again a few times. */
/* Wikimedia answers a burst of requests with an HTML error page. Saving that
   as a .jpg is how we ended up with broken photos, so check the bytes. */
function looksLikeImage(buf) {
  if (!buf || buf.length < 5000) return false;
  const jpeg = buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF;
  const png  = buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47;
  return jpeg || png;
}

function getRetry(url, binary, tries) {
  tries = tries || 5;
  for (let i = 0; i < tries; i++) {
    try {
      const out = get(url, binary);
      if (!binary && out.indexOf("<!DOCTYPE html") === 0) throw new Error("got a web page, not data");
      if (binary && !looksLikeImage(out)) throw new Error("that wasn't an image (" + out.length + " bytes)");
      return out;
    } catch (e) {
      if (i === tries - 1) throw e;
      sleepSync(4000 * (i + 1));
    }
  }
}

async function fetchOne(id, title) {
  const api = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages" +
    "&piprop=thumbnail&pithumbsize=640&redirects=1&titles=" + encodeURIComponent(title);
  const json = JSON.parse(getRetry(api, false));
  const pages = json.query.pages;
  const page = pages[Object.keys(pages)[0]];
  if (!page || !page.thumbnail) throw new Error("no photo");

  const img = getRetry(page.thumbnail.source, true);
  const ext = page.thumbnail.source.toLowerCase().endsWith(".png") ? "png" : "jpg";
  fs.writeFileSync(path.join(OUT, id + "." + ext), img);
  return { id, file: id + "." + ext, title: page.title,
           url: "https://en.wikipedia.org/wiki/" + encodeURIComponent(page.title.replace(/ /g, "_")) };
}

(async () => {
  const creditsPath = path.join(OUT, "credits.json");
  const existing = fs.existsSync(creditsPath) ? JSON.parse(fs.readFileSync(creditsPath, "utf8")) : {};
  const credits = {};
  const missing = [];
  const ids = Object.keys(WIKI);

  for (const id of ids) {
    /* already downloaded? skip it, so re-running picks up where it left off */
    const done = ["jpg", "png"].map(e => path.join(OUT, id + "." + e))
      .find(f => fs.existsSync(f) && looksLikeImage(fs.readFileSync(f)));
    if (done && existing[id]) { credits[id] = existing[id]; process.stdout.write("-"); continue; }
    try {
      const r = await fetchOne(id, WIKI[id]);
      credits[id] = { file: r.file, title: r.title, url: r.url };
      process.stdout.write(".");
    } catch (e) {
      missing.push(id + " (" + WIKI[id] + "): " + e.message);
      process.stdout.write("x");
    }
    await sleep(400);   /* be polite to Wikipedia */
  }

  fs.writeFileSync(creditsPath, JSON.stringify(credits, null, 2));
  console.log("\n\nsaved " + Object.keys(credits).length + " of " + ids.length + " photos");
  if (missing.length) console.log("MISSING:\n" + missing.join("\n"));
})();
