# The Wild Trap — spec

*Written 2026-08-20, after testing whether the game can pull real animals from
Wikipedia while Cam is playing.*

The idea Cam would care about: a trap that catches an animal **that isn't in the game
at all** — a real creature nobody has written kid-facts for, that he is the first to
find. "Even we've never seen this one before."

---

## What I tested first, and what it says

I ran the live version end to end before speccing it, because the whole idea depends
on being able to ask Wikipedia for a random real animal mid-game.

**It works, and it's CORS-clean.** A Wikidata query from the live GitHub Pages site
returned real species with photos, status 200, no proxy needed.

**But it fails on two counts that matter:**

| | Result |
|---|---|
| Speed | **9–12.5 seconds** per query, measured from the live site |
| Quality | Obscure species with museum-drawer photos — `Bittium impendens`, "species of mollusc", photographed in a specimen tray at the Naturalis Biodiversity Center |

Twelve seconds is unusable for a six-year-old pressing a button, and the long tail of
"all animal species" is overwhelmingly tiny molluscs and beetles shot in collection
drawers. That is the opposite of the payoff we want.

**The fix is a fame filter.** Wikidata records how many language Wikipedias cover each
species, which is a good proxy for "an animal a kid has heard of." Filtering to
`sitelinks > 40` and sorting by that returned, in order:

> lion, tiger, grey wolf, leopard, wild boar, polar bear, red fox, cheetah,
> hippopotamus, giant panda, giraffe, brown bear, snow leopard, water buffalo,
> jaguar, moose, koala, cougar…

That's the list we want. But the query still takes ~9.5 seconds, which confirms the
real conclusion:

> **Do the harvest at build time, not at play time.**

## Recommendation: don't pull live — ship a "wild pool"

Harvest a few hundred famous animals once, offline, into a data file. At play time the
Wild Trap picks from that pool instantly and fetches only the single photo it needs.

What this keeps:
- The feeling Cam is chasing — an animal from outside his book, with no facts written.
- Enormous variety: **153 curated creatures → roughly 700 findable animals.**

What it fixes:
- Instant instead of 12 seconds.
- Famous animals instead of specimen-drawer molluscs.
- The photos can be **checked in bulk with the same vision pass** used on the existing
  152, rather than being a lottery on every single card.

## What Cam experiences

1. He buys a **🌍 Wild Trap** in the shop (recommend keeping the ❓ Mystery Trap as it
   is — it's reliable and he understands it — and making this a separate, pricier trap).
2. He arms it and opens anything.
3. The reveal runs longer than normal, with its own colour, and the card comes up
   headed **🌍 A WILD ONE!**
4. The card shows the photo, the animal's real name, and what kind of thing it is
   ("species of big cat"). Where the facts normally go, it says:

   > **Nobody has written about this one yet. You found it first!**

5. And a button: **📝 Write what you know.** He dictates a fact, Dad types it, and it
   is saved forever and shown on that card from then on. He becomes the author of the
   facts for every wild animal he finds.

That last part is the whole reason to build this. The existing game teaches him facts;
this part asks him for them.

## Scoring and the book

- New tier **🌍 WILD**, flat 300 points × the zone bonus, doubled the first time — so a
  wild find in the Volcano Vents is worth real money, same rules as everything else.
- Wild finds get their own **🌍 Wild Finds** section in the book, showing his own
  written notes.
- They are counted separately, so "153 of 153" stays achievable and isn't diluted.

## Photos

Fetch the one photo it needs at play time from Wikimedia (~150ms), and cache it in the
save for anything he keeps.

**This means the Wild Trap cannot work in the shareable artifact copy** — that page has
a strict content policy that blocks all external requests, which is exactly why the
photos are embedded there. So: the Wild Trap is hidden in the artifact build, and works
on the hosted site and locally. Worth knowing before building it.

## Safety, honestly

Wild photos are not individually vetted, and Wikipedia has skulls, dissections and
roadkill in it. Four mitigations, in order of how much they actually help:

1. **The fame filter** does most of the work — famous animals have nice photos.
2. **Filename blacklist** — skip anything matching skull / skeleton / fossil /
   dissection / parasite / roadkill / map / range / diagram.
3. **A bulk vision pass** over the few hundred most likely draws, same as the existing
   photos got.
4. **A 🚫 Not that one button on the card** — one tap blacklists that animal locally and
   re-rolls. This is the real backstop: if something grim slips through, an adult kills
   it in one tap and it never returns.

I would not ship this without number 4.

## Build plan

| Piece | Notes |
|---|---|
| `tools/harvest-wild.js` | Wikidata query by taxon group + fame threshold, dedupe by species, drop anything already among the 153, write `wild.js` |
| `wild.js` | ~600 entries: name, "kind of thing", image filename, article URL, group |
| Trap wiring | New trap in `TRAPS` + shop, its own reveal colour and longer build-up |
| Wild card | Photo fetch, "you found it first" state, the fact editor |
| Save | `state.wild = { id: {found, note} }`, merged like everything else |
| Book | 🌍 Wild Finds section |
| Veto | `state.vetoed = []`, honoured by the picker |
| Artifact build | Strip the Wild Trap out of `build-share.js` |

Roughly a session's work. The harvest and the vision pass are the slow parts, and both
are automated.

## Open decisions for Dad

1. **Separate 🌍 Wild Trap, or a 1-in-3 chance on the existing ❓ Mystery Trap?**
   Recommend separate — the Mystery Trap stays predictable, and buying the Wild Trap is
   a deliberate "I want the weird stuff" choice.
2. **How famous?** `sitelinks > 40` gives roughly the top few thousand animals — lion to
   koala. Lowering it to 15 adds thousands more and gets stranger and less pretty.
   Recommend starting at 40 and lowering it if he burns through them.
3. **Should wild finds count toward his creature total?** Recommend no — keep the 153 as
   the "real" collection so it stays finishable.
