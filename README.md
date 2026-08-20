# Cam's Crazy Creatures

A creature-collecting exploration game designed by Cam (age 6). Open `index.html` in a
browser — no installs, no server, works offline.

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

## Adding creatures

1. Add an entry to `creatures.js` with a unique `id`, a `tier`, and the `zones` it lives in.
2. Add `id: "Wikipedia Article Title"` to the `WIKI` map in `tools/fetch-photos.js`.
3. Run:

```bash
node tools/fetch-photos.js     # skips photos already downloaded
node tools/make-photos-js.js   # rebuilds photos.js
```

A creature with no photo still works — it falls back to its emoji.

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
