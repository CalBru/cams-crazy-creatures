# Cam's Crazy Creatures

A creature-collecting exploration game designed by Cam (age 6). 199 real animals, each
with a real photo and hand-written facts. Open `index.html` in a
browser — no installs, no server. The shared copy everyone plays is
**https://calbru.github.io/cams-crazy-creatures/**, deployed from `main` by GitHub Pages.

## Who you play as

The first screen asks who is exploring. Each kid is drawn by the same code that draws
them in the game, so the picture on the card is exactly who shows up in the water.

| Kid | What they're best at |
|---|---|
| **Cam** | 🪄 Magic Trap Master — every crab hands him **two** magic traps |
| **Reece** | 🐙 Octopus Lover — octopuses, squid, cuttlefish and nautiluses pay **double** |
| **Carter** | 🦎 Reptile Keeper — every reptile pays **double**, and **Jack** only appears for him |

**Jack is real.** He is Carter's bearded dragon, the photo in `images/jack.jpg` is Jack
himself, and he waits in The Desert for whenever Carter goes looking. A creature with an
`onlyFor` field belongs to one kid: `mineToFind()` filters it out of every pool — ordinary
catches, the magic trap, the rainbow trap and the mystery trap alike — for everybody else.

Everyone shares one creature book. Swapping who is exploring never touches what anybody
has already found, and the game remembers who went last. Adding another kid means adding
an entry to `CHARACTERS` in index.html: a name, a few colours, a hair style
(`swoosh`/`sweep`/`crop`), and optionally a `loves` pattern and something printed on the
shirt.

## How you play

Pick **LAND**, **OCEAN**, **UNDERGROUND**, or **THE ISLANDS**. Move with the arrow keys
(or click where you want to go).
Get close to a rock or a trap, press **SPACE**, and see what you found. Every creature
has a real photo and real facts. Everything you find goes in your book.

The further you go, the rarer the creatures. Ocean and underground go **down**; land and
the islands go **across**.

| Ocean | Underground | Land | Islands |
|---|---|---|---|
| Sunlight x1 | The Topsoil x1 | The Backyard x1 | The Galápagos x4 |
| Twilight x2 | The Caves x3 | Deep Forest x2 | Madagascar x6 |
| Midnight x3 | Crystal Caverns x6 *(Shovel)* | The Desert x3 | Komodo & Sulawesi x8 |
| THE TRENCH x5 | THE DEEP DARK x10 *(Pickaxe)* | — | New Zealand x10 |
| THE HADAL ZONE x8 *(Deep Suit)* | | | |
| THE VOLCANO VENTS x12 *(Volcano Suit)* | | | |

**The islands are the evolution lesson.** Every island animal has an `endemicTo` field, and
its card says plainly: *"I live on Madagascar and NOWHERE else on Earth."* Darwin's finches
explain their own beaks; the flightless cormorant explains why its wings shrank. Getting
there at all needs **The Boat** (4,000 points).

Rarity runs common → uncommon → **RARE** → **EPIC** → **LEGENDARY** → **★ MYTHIC ★**
(10 / 25 / 60 / 150 / 400 / 2000 base points, times the zone bonus, doubled the first
time you find something).

**Mythics are the rarest things in the game** — The Old One (a 512-year-old Greenland
shark), The Kraken, The Ghost, Ironclad, The Ancient. They live only in the deepest water
and they get their own shrine at the top of the book. They stay findable forever: the book
counts how many times he's met each one, so a second meeting is a brag, not a duplicate.
(An earlier build made them one-time-only. Don't do that — for a six-year-old, permanently
removing the best thing in the game reads as a punishment.)

Catching a 🦀 crab earns a **magic trap**, which is the only way to catch the giants
(blue whale, colossal squid, cheetah, komodo dragon…). The giant sea sponge breaks it.

**The shop sells different gear in every place**, and the section for wherever he is
comes first. Ocean: diving suits (which unlock the two deepest zones), flashlights,
flippers, trap radar, sonar, chum bucket. Land: boots, rock hammer, binoculars, bug jar.
Islands: the boat, snorkel mask, field notebook. Underground: shovel, pickaxe, head lamps,
rope ladder (press **R** to climb out). Magic traps are sold everywhere.

Gear-gated zones are the spine of the progression: explore → earn → buy the thing →
reach animals that were literally out of reach.

**Encounters.** Below the Midnight Zone, a giant silhouette sometimes swims past with
whale song. Chase it down and press SPACE before it escapes — the giants need the magic
trap armed first. Every catch also runs a suspense build-up: the trap shakes, a drum roll
speeds up, and the glow turns gold only when it's something great.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole game — drawing, movement, saving |
| `creatures.js` | Every creature: rarity, zones, facts. **Add new creatures here.** |
| `photos.js` | Generated map of creature id → photo file (don't hand-edit) |
| `images/` | One photo per creature, downloaded from Wikipedia |
| `TODO.md` | The running to-do list |
| `tools/build-share.js` | Builds the single-file shareable copy with photos embedded |
| `tools/fetch-photos.js` | Downloads the photos |
| `tools/make-photos-js.js` | Rebuilds `photos.js` from `images/` |
| `tools/find-candidates.js` | Pulls several candidate photos from Wikimedia Commons when an article's own photo is bad |

## Checking photos

Wikipedia's lead image is often a diagram, an antique illustration, or a dead museum
specimen — bad for a 6-year-old. Every photo in `images/` has been eyeballed and the bad
ones replaced. **If you add creatures, look at the photos before shipping them.** For
animals whose article photo is unusable:

```bash
node tools/find-candidates.js <id> "<search words>"   # downloads 5 options
# look at images/_candidates/<id>_*.jpg, copy the best over images/<id>.jpg
node tools/make-photos-js.js
```

Some animals genuinely have no good free photo in existence (bigfin squid, viperfish,
gulper eel, the cave robber fly). Those use the best available option. The devil worm has
no photo at all and falls back to its emoji, which is fine.

**The fetcher validates image bytes.** Wikimedia answers a burst of requests with an HTML
error page, and an earlier version saved those as `.jpg` — seven silently broken photos.
`looksLikeImage()` now checks the JPEG/PNG magic bytes and the file size, and re-running
the fetcher re-downloads anything that failed that check.

## Adding animals from inside the game

There is an **➕ Add** button in the game. Type any real animal, pick it from a grid of
Wikipedia photos, and then Cam answers two questions: **where does it live** (which world
and which zone) and **how cool is it** (one to five stars, which sets its points — his
own rule from the very first interview). It becomes a real creature immediately: findable
in traps and under rocks, in his book, in his bucket.

Animals added this way start with **no facts**, because nobody has written any. There's a
**📝 Add a fact** button — Cam says it, you type it, and it sticks.

Two things worth knowing:

- A grown-up is at the keyboard doing the typing, which means an adult sees the photo on a
  thumbnail before it ever enters the game. That's the review step that makes this safe.
- Animals added in the game live in **that browser's save**. To make them permanent for
  every device, press **💾 Save these to a file** and run the downloaded file through
  `tools/add-batch.js` (it's written in exactly that format). Then they're in the catalog
  for good, with a proper photo in `images/` and facts anyone can read.

Search results are filtered to things whose Wikipedia description sounds like a living
thing, so "praying mantis" doesn't offer the rock band or the 1988 naval operation.

## Adding creatures

This is how the catalog grows, and it's meant to be easy — if Cam names an animal he
wants, it can be in the game in a couple of minutes.

**One animal:**

```bash
node tools/add-animal.js '{"id":"axolotl","name":"Axolotl","wiki":"Axolotl",
  "emoji":"🦎","tier":"legendary","where":"underground","zones":[3],
  "facts":["If I lose a leg, I grow a whole new one.","..."]}'
```

**A batch** — write a JSON list in `batch/`, then:

```bash
node tools/add-batch.js batch/001-forty-more.json
```

It appends the creatures, registers their Wikipedia titles, fetches every photo in one
pass, and rebuilds `photos.js`. Then **look at the new photos** (see above) before shipping.

`tools/harvest-wild.js` is a helper for deciding *who* to add: it asks Wikidata for
famous animals not already in the game, ranked by how many language Wikipedias cover
them, which is a good proxy for "an animal a kid has heard of."

A creature with no photo still works — it falls back to its emoji.

### Why the facts are written at build time

The facts are hand-written (by a person, or by Claude at build time with a human reading
them before they ship) rather than generated live while Cam is playing. Three reasons:

1. A live generator needs an API key, and the game is a public web page — anything in
   the page can be read and spent by anyone.
2. Unreviewed facts reach a six-year-old who will believe and repeat them. Every fact in
   here has been read by an adult first.
3. Build-time facts work offline, in the shared single-file copy, and on the iPad.

`WILD-TRAP.md` has the full reasoning, including the measured latency and quality of the
live-Wikipedia version that was tested and rejected.

## ⚠️ Never break Cam's book

His saved book is the thing he cares about most, and it has been lost once already.
The rules:

- **The save key is `camsCrazyCreatures` and it must never change.** Renaming or
  versioning it is what lost his book the first time.
- Loading **merges** every `camsCrazyCreatures*` key it finds in localStorage, so an
  old save from an earlier version is recovered rather than replaced. Keep that behavior.
- Creature `id` values are the save format. **Never rename or reuse an id** — a renamed
  id makes a found creature disappear from his book. Changing a creature's name, photo,
  tier, or facts is always safe; changing its `id` is not.
- Saves are per-origin. Opening the game from a different path or a local web server
  looks like a different save to the browser. Keep opening it the same way.
- The book has **💾 Save a backup file** and **📂 Load a backup** buttons. Before any
  big change, have him save a backup — that file survives anything.
