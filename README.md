# Cam's Crazy Creatures

A creature-collecting exploration game designed by Cam (age 6). 236 real animals and
36 legends, each with a real picture and hand-written facts — plus one dragon. Open `index.html` in a
browser — no installs, no server. The shared copy everyone plays is
**https://calbru.github.io/cams-crazy-creatures/**, deployed from `main` by GitHub Pages.

## Who you play as

The first screen asks who is exploring. Each kid is drawn by the same code that draws
them in the game, so the picture on the card is exactly who shows up in the water.

| Kid | What they're best at |
|---|---|
| **Cam** | 🪄 Magic Trap Master — every crab hands him **two** magic traps |
| **Reece** | 🐙 Octopus Lover — octopuses, squid, cuttlefish and nautiluses pay **double** |
| **Carter** | 🦎 Reptile Keeper — every reptile pays **double**, and **Jack** is his real pet |
| **Campbell** | 🩷 Axolotl Friend — axolotls, salamanders, newts and the olm pay **double** |

**Jack is real.** He is Carter's bearded dragon, the photo in `images/jack.jpg` is Jack
himself, and he is out in The Desert as a legendary for anybody to find.

**Every kid keeps their own book.** What you have discovered, how many times, what's in
your bucket and how deep you have ever been belong to whoever found them — `state.books`
holds one book per kid, and `state.found` / `state.counts` / `state.bucket` /
`state.deepest` are windows onto the book of whoever is exploring, so the rest of the game
reads them exactly as it always did. Points, gear, traps and animals added with ➕ Add are
shared, so a three-year-old picking Reece isn't stuck in the shallow water while Cam has
the Volcano Suit.

**No creature belongs to one kid.** Anybody can find anything, Jack included — a favourite
animal pays double, it is never a lock. The pick screen shows how far along each book is,
and the game remembers who went last. Every kid is on the shared link, so anybody who
opens it can pick any of them.

Saves from before books existed hold one book at the top level, and that book was Cam's —
`mergeInto()` migrates it into `books.cam` and ignores the top-level mirror that newer
saves keep for older copies of the game.

Adding another kid means adding an entry to `CHARACTERS` in index.html: a name, a few
colours, a hair style (`swoosh`/`sweep`/`crop`/`bob`), and optionally `dress: true`, a
`loves` pattern, and something printed on the shirt. Ages are deliberately not a field —
asking everybody their age added a step and told the game nothing.

## How you play

Pick **LAND**, **OCEAN**, **UNDERGROUND**, **THE ISLANDS**, **PREHISTORIC** or
**MYTHICAL**. Move with the arrow keys (or click where you want to go).
Get close to a rock or a trap, press **SPACE**, and see what you found. Every creature
has a real photo and real facts. Everything you find goes in your book.

The further you go, the rarer the creatures. Ocean and underground go **down**; land, the
islands and prehistoric go **across**.

| Ocean | Underground | Land | Islands | Prehistoric | Mythical |
|---|---|---|---|---|---|
| Sunlight x1 | The Topsoil x1 | The Backyard x1 | The Galápagos x4 | The Triassic x3 | The Enchanted Forest x3 |
| Twilight x2 | The Caves x3 | Deep Forest x2 | Madagascar x6 | The Jurassic x5 | The Misty Mountains x5 |
| Midnight x3 | Crystal Caverns x6 *(Shovel)* | The Desert x3 | Komodo & Sulawesi x8 | The Cretaceous x7 | The Deep Waters x8 |
| THE TRENCH x5 | THE DEEP DARK x10 *(Pickaxe)* | — | New Zealand x10 | THE ANCIENT SEA x12 *(Diving Bell)* | THE UNDERWORLD x14 *(Everlight)* |
| THE HADAL ZONE x8 *(Deep Suit)* | | | | | |
| THE VOLCANO VENTS x12 *(Volcano Suit)* | | | | | |

**The Dragon is the exception.** Cam asked for a dragon in the Deep Forest, so there is
one — a mythic, and the only creature in the book with no photo. Its card says so:
*"Every other animal in this book is real. This one is Cam's."*

He is as long as a school bus, so he needs the **magic trap**, and he carries
`firstFindGift`: the **first** magic trap opened in the Deep Forest finds him no matter
what, once per kid, because meeting your own dragon shouldn't come down to the dice. After
that he shares the forest with the king cobra — about one magic trap in sixteen. A plain
rock flip never turns him up.

**Mythical is the one world where nothing is real, and every card says so.** Cam asked for
unicorns and a chupacabra; what he got is 36 legends from 27 different cultures, and the
honest version of each one. Walking right goes **The Enchanted Forest → The Misty Mountains
→ The Deep Waters → THE UNDERWORLD**, and it needs **The Storybook** (9,000 points) to get
in at all and **The Everlight** (3,500) to go down into the last of it.

Every creature carries a `storyFrom` field, and the card says plainly: *"🌍 This story comes
from Japan. Nobody has ever proved I'm real."* The facts do not pretend either — the
jackalope admits a taxidermist invented it in 1932, the chupacabra admits every body ever
handed to a scientist turned out to be a coyote with mange, and the Loch Ness Monster
admits the famous photo was a toy submarine. The interesting thing isn't whether they're
real; it's that every corner of the world made monsters up, and you can still go and look
at the carvings and tapestries they made.

Which is what the pictures are. **There are no photos here**, so a card shows the actual
object: the Lady and the Unicorn tapestry, a Bodleian bestiary manticore, the Nine-Dragon
Wall, a Māori carved panel, Hokusai-era yokai woodblocks, the Kelpies at Falkirk, a
Bodleian phoenix in gold leaf. Two are deliberately honest jokes — the Nian's picture is
the lion dance people invented to scare it off, and the selkie's picture is just a grey
seal, which is exactly the point.

The mythic is **THE PHOENIX**, because the game's rule that mythics can be found again and
again *is* the phoenix's own story. Its card says so.

**Prehistoric is the extinction lesson**, and it is the one world where walking right is
walking forward through **time**: the Triassic, the Jurassic, the Cretaceous, and then the
ground runs out and you wade into the ancient sea. 37 animals, and every one of them is
gone. Their cards say so — *"I lived 67 million years ago. There are none of us left
anywhere on Earth."* — which is why their pictures are either real fossils or paintings
made from the bones, and the book says that out loud rather than pretending otherwise.

Getting there at all needs **The Time Machine** (7,000 points); the ancient sea, where the
**MEGALODON** is, needs the **Diving Bell** on top of that. The mythic down there is
**SUE** — the most complete Tyrannosaurus anybody has ever found, and the only mythic in
the book Cam could go and stand in front of, because she is in a museum in Chicago.
Out in the Jurassic and later, something enormous occasionally stomps past and roars;
chase it down with a magic trap armed, exactly like the giants in the deep sea.

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
rope ladder (press **R** to climb out). Prehistoric: the time machine, diving bell, fossil
brush (the binoculars of the dinosaur world) and bone armour (its bug jar). Mythical: the
storybook, the everlight, a crystal ball and a lucky charm — the same peek-and-second-chance
pair again. Magic traps are sold everywhere.

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

**Extinct animals need a different kind of picture.** Wikipedia's lead image for a dinosaur
is nearly always a museum skeleton, which is not what a six-year-old wants on a card. Every
prehistoric animal's photo was swapped for a life restoration — painted or modelled from the
bones — pulled out of the Wikipedia article's own images rather than its lead. Four kept a
real fossil on purpose, because the fossil *is* the story: Archaeopteryx's feathered slab,
the Pterodactylus slab that was the first flying fossil ever found, the golden ammonite
spiral, and SUE's mounted skeleton.

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

## Telling him something new has arrived

He plays this from a home-screen icon on an iPad, and that is not the same thing as the
same URL in Safari: it is a separate little web app with **its own cache and its own
storage**. It will happily keep showing a months-old copy of the game forever, because
nothing ever makes it ask the server again. Two pieces solve that.

**The game checks its own version.** `tools/stamp-build.js` hashes `index.html`,
`creatures.js` and `photos.js` and writes the same id into a `BUILD` constant in the page
and into `version.json`. On launch — and again every time the iPad brings the game back to
the front — the page fetches `version.json` with `cache: "no-store"` and compares. If they
disagree there is a newer game, and it reloads itself at `?v=<new>`, which is a URL the web
app has never seen and therefore has to go and fetch. **A query string does not change the
origin**, so localStorage, and with it Cam's book, is untouched. Offline, the fetch fails
and he just keeps playing. Run the stamper before publishing — `build-share.js` runs it for
you.

**Then the game tells him what he got.** `state.seen` is the list of creature ids he has
already been shown and `state.seenWorlds` the same for places; anything not on the list is
new. That needs no server data at all — the catalog that arrived *is* the announcement, so
it works offline and cannot get out of step. A **✨** button sits in the top bar with a red
count on it, and the What's New screen shows new worlds as big cards and new creatures
face-up with their photos, because knowing a MEGALODON is out there is the fun part. It
opens by itself on launch when something new has landed. It also has a **🔄 Check for more**
button, which is the manual override for exactly the iPad problem above.

Creatures added with ➕ Add are skipped — those are his, not news. A brand-new book is
marked all-seen so a first-time player isn't told all 273 creatures are new.

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
- **A home-screen web app and Safari are two different saves.** iOS gives the home-screen
  icon its own storage container, so points earned in one do not appear in the other, and
  deleting the icon deletes its book. Move a book between them with the backup file. Save
  the backup *before* deleting or re-adding a home-screen icon, not after.
