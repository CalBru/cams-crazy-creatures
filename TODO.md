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
- [ ] Rebuild the shareable copy (`node tools/build-share.js`) and republish

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
- [ ] **His brother Reece as a character.** Recommended: a companion who follows Cam,
      points at rare things, and has his own favourite kind of creature that pays a bonus
      when Cam catches one. Let Reece pick the favourite himself.

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

## Open questions for Cam

- Does he want the islands reached by **boat** (buy it once) or should they be open
  from the start? *(Assumed: boat, so there's something to save up for.)*
- Underground: dig anywhere, or find a **cave entrance** first? *(Assumed: dig anywhere.)*
