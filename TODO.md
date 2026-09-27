# Cam's Crazy Creatures — to do

Three changes from Cam (and Dad), 2026-08-14. Ordered by build sequence, since the
shop refactor has to land before the two new worlds can sell their own gear.

---

## 1. Shop: more items, and different gear in every place

The shop is one flat list today, and every item is ocean gear. It should feel like a
different shop depending on where he's exploring.

- [x] Give every shop item a `where` field: `ocean`, `land`, `island`, `underground`, or `any`
- [x] Shop screen shows a section per place, with the section for where he's currently
      exploring at the top; `any` items (magic traps) always available
- [x] Ocean gear (existing + new)
  - [x] Deep Suit, Volcano Suit, Big Flashlight, Super Floodlight, Speed Flippers,
        Rocket Flippers, Trap Radar *(already built)*
  - [x] **Chum Bucket** — makes the big roaming creatures show up more often
  - [x] **Sonar Ping** — lights up every trap on screen for a few seconds
- [x] Land gear
  - [x] **Hiking Boots** / **Rocket Boots** — walk and jump further
  - [x] **Rock Hammer** — flip rocks instantly, no waiting for them to come back
  - [x] **Binoculars** — see what's under a rock before you flip it
  - [x] **Bug Jar** — a second chance when something scuttles away
- [x] Island gear
  - [x] **The Boat** — the gate: without it he can't reach the islands at all
  - [x] **Snorkel Mask** — search the tide pools, not just the land
  - [x] **Field Notebook** — shows which island each creature is from
- [x] Underground gear
  - [x] **Shovel** then **Pickaxe** — dig deeper; these gate the bottom two layers
  - [x] **Head Lamp** — the underground version of the flashlight
  - [x] **Rope Ladder** — climb back to the surface instantly
- [x] Keep every existing purchase valid — a saved `gear` object must never lose a level

## 2. Islands: creatures that live in ONE place on Earth and nowhere else

This is the evolution conversation Cam and Dad were having, made playable. Rather than
one island, it's an **archipelago you travel across** — the same kind of animal turns
out different on each island, which is the whole point.

- [x] New world type `island`, reached by boat from the home screen
- [x] Four islands as the four zones, rarer the further he sails:
  - [x] **Galápagos** — marine iguana, blue-footed booby, flightless cormorant,
        Galápagos penguin, Darwin's finch, Galápagos giant tortoise
  - [x] **Madagascar** — ring-tailed lemur, aye-aye, panther chameleon, tomato frog,
        fossa, giraffe weevil
  - [x] **Komodo & Sulawesi** — Komodo dragon *(already in the game — reuse the id)*,
        babirusa, maleo, Sulawesi bear cuscus
  - [x] **New Zealand** — kiwi, kākāpō, tuatara, giant wētā, kea
- [x] New `endemicTo` field on a creature, and the card says it plainly:
      *"I live on ONE island in the whole world and nowhere else."*
- [x] Searching an island = looking in nests, bushes and tide pools (not rocks/traps)
- [x] Island mythic: **Lonesome George**, the last Pinta Island tortoise
- [x] Art: beach and palms, jungle, volcano cone, ocean between islands

## 3. Underground: dig down through dirt, caves, crystal, and the deep dark

The vertical progression of the ocean, but through rock — and the animals down there
are blind, pale, and strange, which is a good pairing with the island idea.

- [x] New world type `underground`, dug DOWN like the ocean is swum down
- [x] Four layers:
  - [x] **The Topsoil** — earthworm *(reuse)*, mole, cicada nymph, ant queen, springtail
  - [x] **The Caves** — cave cricket, bat, cave spider, glowworm, pseudoscorpion
  - [x] **Crystal Caverns** — olm ("baby dragon"), blind cave fish, Texas blind
        salamander, cave crayfish, naked mole-rat, star-nosed mole
  - [x] **The Deep Dark** — devil worm (lives 2 miles down), cave robber fly,
        Movile Cave scorpion, tube-dwelling nematodes
- [x] Shovel gates layer 3, Pickaxe gates layer 4
- [x] Underground mythic: **The Sleeper**, a 100-year-old olm that has not moved in years
- [x] Art: dirt with roots and pebbles, cave walls, glittering crystal, red depth glow
- [x] Head Lamp drives the light radius the way the flashlight does underwater

## 4. Wrap-up for all three

- [x] Photos for every new creature (`tools/fetch-photos.js`, then `make-photos-js.js`)
- [x] **Look at every new photo with vision** — Wikipedia leads are often diagrams,
      dead specimens, or multi-species plates. Replace the bad ones with
      `tools/find-candidates.js`
- [x] Home screen: four place cards (Land, Ocean, Islands, Underground), with locked
      ones showing what unlocks them
- [x] Book: sections for the new worlds, endemic island grouping
- [x] Verify saves still merge, and that no existing creature `id` changed
- [x] Rebuild the shareable copy (`node tools/build-share.js`) and republish

---

# Round 2 — from Cam, 2026-08-14

## Fixed already

- [x] **The snorkel didn't open the tide pools.** It was quietly adding more of the same
      nests instead of anything he could see. Tide pools are now their own thing: a real
      pool drawn on the wet sand, holding sea creatures (starfish, urchins, crabs) instead
      of island birds — and a crab in a tide pool still earns a magic trap.
- [x] **A magic trap in New Zealand opened a Komodo animal.** The picker fell back to
      "anything in this world" when a zone had no giants, so it reached across the map.
      It can never leave his zone now. Where nothing giant lives (New Zealand, the
      Backyard), the magic trap does a **rare hunt** instead — still an animal from right
      where he's standing, but it seeks out the rarest thing there, and the card says so.
- [x] Spots no longer spawn on top of each other, so every rock, nest and pool is
      reachable on its own.

## Still to build

- [x] **A bucket to keep the creatures he catches in.** Everything he catches goes in it,
      and inside the bucket they are ALIVE — swimming and crawling around in a tank he can
      tap. Two commons trade for a Giant Trap (so duplicates stop being a letdown), five
      bucket bonuses to fill, and tipping it into the book banks a big score.
- [x] **Add animals from inside the game.** ➕ Add button: search Wikipedia live, pick from
      photo thumbnails, then Cam chooses which world, which zone, and how many stars it's
      worth. It's a real creature straight away, and he writes its facts himself. Export
      to a file to promote them into the permanent catalog.
- [x] **Reece and Carter as playable characters.** A character-select screen is now the
      first thing the game shows. Each kid is drawn with the same code the game draws Cam
      with, so the picture on the card is exactly who turns up in the water:
      - **Cam** — MAGIC TRAP MASTER. Every crab hands him two magic traps instead of one.
      - **Reece** — OCTOPUS LOVER. His chalkboard said "I LOVE Octopus", so octopuses,
        squid, cuttlefish and nautiluses are worth double for him. He wears his floaty
        ring in the water, because he's little.
      - **Carter** — REPTILE KEEPER. Every reptile is worth double for him, he wears his
        bearded dragon on his shirt, and **Jack** — his real bearded dragon, with his real
        photo in `images/jack.jpg` — is a legendary out in the desert for anybody to find.
      - **Campbell** — AXOLOTL FRIEND. Axolotls, salamanders, newts and the olm are worth
        double for her. The axolotl is legendary and lives in the Crystal Caverns, so her
        favourite animal is a reason to buy the Shovel and dig.

      Every kid keeps their own book, their own bucket and their own deepest dive. Points,
      gear, traps and animals added with ➕ Add are shared, so nobody starts out stuck in
      the shallow water. No creature belongs to one kid — a favourite animal pays double,
      it is never a lock. Old saves from before books existed become Cam's book.

- [ ] **More characters.** The roster is `CHARACTERS` in index.html — a name, a few
      colours, a hair style (`swoosh`/`sweep`/`crop`/`bob`), optionally `dress: true`, and
      a `loves` pattern is a whole new kid. Ages were dropped on purpose: asking everybody
      their age added a step and told the game nothing. Anybody with the link gets all of
      them, so a new kid only has to be added once.

## Dad's read on what Cam actually loves

Variety in creatures, using magic traps to do magic things, and shop items that give
him powers. Anything we build should feed one of those three.

- [x] **Magic traps that do different magic things.** Five kinds now, switchable from a
      tray (or number keys 1-5):
      🪄 Giant — the original.
      🔬 Shrink — catches the tiniest creature and shows it blown up giant, x5 points.
      🌈 Rainbow — always something he has never seen, hunting wider and wider until it
      finds one; refunds itself if he has found all 153.
      ✌️ Double — two creatures, two cards, one press.
      ❓ Mystery — reaches anywhere in the world, including places he cannot get to yet,
      and tells him where it went.
- [x] **Shop items that feel like powers.** Four he presses, each on a cooldown:
      📢 Whistle (everything nearby pops open one after another), ⏱️ Time Freeze (holds a
      roaming giant still), 🧲 Super Magnet (yanks three traps to him), 🥸 X-Ray Goggles
      (see the rarity inside everything — and the pick honours what it showed him).
- [x] **More variety.** 44 new animals added at build time, each with hand-written facts:
      **153 → 198 creatures.** Ladybugs and fireflies in the backyard, a vinegaroon that
      squirts vinegar, a pistol shrimp whose claw bangs like a gunshot, a wombat with cube
      poop, a hagfish that turns a bucket of water to slime, coconut crabs on the islands,
      and an axolotl in the Crystal Caverns. Every new photo was vision-checked; 8 of 45
      were rejected and replaced. Repeatable with `tools/add-batch.js` — see README.
- [ ] **The Wild Trap** — catches a real animal that isn't in the game, with no facts
      written, and Cam writes the facts himself. Full spec in `WILD-TRAP.md`, including
      why the live-Wikipedia version was tested and rejected (12 seconds a pull, and it
      served up specimen-drawer molluscs).

---

# Round 3 — Prehistoric, from Cam, 2026-09-15

Cam asked for "a level that's mostly dinosaurs, and a Megalodon."

- [x] New world type `prehistoric`, walked ACROSS like land — and walking right is
      walking forward through **time**
- [x] Four zones: **The Triassic** (x3), **The Jurassic** (x5), **The Cretaceous** (x7),
      **THE ANCIENT SEA** (x12)
- [x] 37 animals with hand-written facts: T. rex, Triceratops, Stegosaurus, Spinosaurus,
      Velociraptor (feathered, turkey-sized, and the card says the movies got it wrong),
      Quetzalcoatlus, Brachiosaurus, Archaeopteryx, Dimetrodon (which is *not* a dinosaur
      and says so), and down in the sea Dunkleosteus, Helicoprion's buzzsaw jaw,
      Mosasaurus, Elasmosaurus, Archelon and the **MEGALODON**
- [x] **The Time Machine** (7,000) gates the world; the **Diving Bell** (3,000) gates the
      ancient sea, so the Megalodon is something to save up for
- [x] Fossil Brush and Bone Armour — the prehistoric versions of the binoculars and the
      bug jar, so the two land powers exist here too
- [x] New `livedWhen` field: the card says *"I lived 67 million years ago. There are none
      of us left anywhere on Earth."* The book section says the same thing about the photos
- [x] Prehistoric mythic: **SUE**, the most complete T. rex ever found — the only mythic
      in the book you could go and stand in front of
- [x] Something enormous stomps past in the Jurassic and later, with a roar, and needs the
      magic trap — the land version of the deep-sea roamers
- [x] Art: volcanoes that smoke and cool off as time goes by, cycads and conifers, fossils
      and egg clutches to open instead of rocks, and a real waterline where the sea starts
- [x] Every one of the 37 photos looked at with vision; the dinosaurs use life
      restorations, not museum skeletons (see README)
- [x] **Two bugs found on the way:** the Rope Ladder's button called a `climbOut()` that
      was never written, and `maxZoneAllowed()` treated gear at level 0 as level 1, so any
      zone gated on level-1 gear would have been open from the start

---

# Round 4 — Mythical, from Cam, 2026-09-27

Cam asked for "a mythical level, with unicorns, chupacabra, etc." Dad asked for a way to
see from the front end when new animals and levels have landed, because the iPad
home-screen app had been quietly showing an old build.

- [x] New world type `mythical`, walked across: **The Enchanted Forest → The Misty
      Mountains → The Deep Waters → THE UNDERWORLD**
- [x] 36 legends from **27 different cultures**, with hand-written facts: unicorn,
      chupacabra, yeti, sasquatch, kitsune, tengu, kappa, qilin, Chinese dragon, simurgh,
      taniwha, bunyip, ahuizotl, leshy, Nian, thunderbird, the Roc, Jörmungandr, Fenrir,
      the Hydra, Cerberus, the Minotaur, the manticore, the basilisk, the Loch Ness
      Monster, the Kelpie, a selkie, a mermaid — and a jackalope that admits it was
      invented by a taxidermist in 1932
- [x] New `storyFrom` field: the card says *"🌍 This story comes from Japan. Nobody has
      ever proved I'm real."* Every fact is honest about what's known
- [x] **The Storybook** (9,000) gates the world; **The Everlight** (3,500) gates the
      Underworld. Crystal Ball and Lucky Charm are the peek / second-chance pair
- [x] Mythic: **THE PHOENIX** — the game's own rule that mythics come back again and again
      is literally the phoenix's story, and its card says so
- [x] Art: magic twilight and glowing toadstools, snow peaks with mist that only hangs
      over the mountains, a black loch in the middle of the map, an underworld that burns
      from below. Rune stones and fairy rings instead of rocks. Will-o'-the-wisps
- [x] A winged silhouette glides past from the Misty Mountains on, with its own cry
- [x] Every one of the 36 pictures checked with vision — for nudity and violence as well
      as clarity, because classical art is full of both. 21 of 36 were replaced
- [x] **The Dragon's card was lying.** It said "every other animal in this book is real",
      which stopped being true. It now says everything else either really lived or is
      really told about, and he is the one Cam made up

## Seeing what's new (the iPad problem)

- [x] `tools/stamp-build.js` + `version.json` + a `BUILD` constant: the game asks the
      server whether it is out of date, on launch and every time it comes back to the
      front, and reloads itself at `?v=<new>` to beat the cache. `?v=` does not change the
      origin, so the book is untouched
- [x] `state.seen` / `state.seenWorlds`: anything in the catalog he has not been shown is
      new. No server list needed — the catalog IS the announcement, so it works offline
- [x] A **✨** button in the top bar with a red count, and a What's New screen that shows
      new worlds as cards and new creatures face-up
- [x] It opens by itself on launch when something has landed, and has a **🔄 Check for
      more** button as the manual override
- [x] Two layout bugs this shook out: the seventh top-bar button wrapped the bar onto a
      second row (the title now drops its words under 1200px, and the menu screens measure
      the bar instead of assuming 58px), and the Back button was positioned against the
      viewport rather than its own screen

---

## Open questions for Cam

- Does he want the islands reached by **boat** (buy it once) or should they be open
  from the start? *(Assumed: boat, so there's something to save up for.)*
- Underground: dig anywhere, or find a **cave entrance** first? *(Assumed: dig anywhere.)*
