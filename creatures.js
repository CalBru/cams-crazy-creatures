/* ============================================================
   ALL THE CREATURES IN CAM'S CRAZY CREATURES

   tier   = how rare it is: common, uncommon, rare, epic, legendary
   zones  = which zones it lives in
              OCEAN 1 = Sunlight  2 = Twilight  3 = Midnight  4 = The Trench
              LAND  1 = Backyard  2 = Deep Forest  3 = The Desert
   The deeper you swim (or the farther you walk), the rarer things get.
   magicOnly creatures are too big for a normal trap — you need the magic trap.
   ============================================================ */

const CREATURES = [

  /* ================= OCEAN — ZONE 1: THE SUNLIGHT ZONE ================= */
  { id:"starfish", name:"Starfish", emoji:"⭐", where:"ocean", zones:[1], tier:"common",
    facts:["If I lose an arm, I grow a whole new one.","I have no brain and no blood.","My stomach comes OUT of my body to eat!","I have a tiny eye on the end of every arm."] },

  { id:"urchin", name:"Sea Urchin", emoji:"🟣", where:"ocean", zones:[1], tier:"common",
    facts:["I'm a ball of spikes that walks on hundreds of tiny tube feet.","My mouth is on my bottom and it has five teeth.","Some of my family live to be 200 years old!"] },

  { id:"clownfish", name:"Clownfish", emoji:"🐠", where:"ocean", zones:[1], tier:"common",
    facts:["I live inside a stinging anemone, but it never stings me.","A slimy coat protects me like a raincoat.","I never swim very far from my home."] },

  { id:"crab", name:"Crab", emoji:"🦀", where:"ocean", zones:[1,2], tier:"uncommon", givesMagic:true,
    facts:["I walk sideways because of the way my knees bend.","My eyes are on little stalks so I can look all around.","When I get too big for my shell, I grow a brand new one."] },

  { id:"jellyfish", name:"Jellyfish", emoji:"🪼", where:"ocean", zones:[1,2], tier:"uncommon",
    facts:["I have no brain, no heart, and no bones.","I'm 95% water — almost the same as the ocean around me.","Jellyfish were here 500 million years before the dinosaurs."] },

  { id:"pufferfish", name:"Puffer Fish", emoji:"🐡", where:"ocean", zones:[1], tier:"uncommon",
    facts:["I blow up like a spiky balloon when I'm scared.","I gulp water super fast to puff up big.","I draw beautiful circle patterns in the sand with my fins."] },

  { id:"seahorse", name:"Seahorse", emoji:"🐴", where:"ocean", zones:[1], tier:"uncommon",
    facts:["The DADS have the babies, not the moms!","I hold onto seaweed with my tail so I don't float away.","I'm the slowest fish in the whole ocean."] },

  { id:"barracuda", name:"Barracuda", emoji:"🐟", where:"ocean", zones:[1,2], tier:"uncommon",
    facts:["I'm one of the fastest fish — as fast as a car on the highway.","I have two rows of razor teeth, and some point backwards.","I hang perfectly still, then ZOOM out of nowhere."] },

  { id:"turtle", name:"Sea Turtle", emoji:"🐢", where:"ocean", zones:[1,2], tier:"rare",
    facts:["I can hold my breath for hours while I nap.","I swim thousands of miles back to the beach where I was born.","I cry salty tears to get extra salt out of my body."] },

  { id:"octopus", name:"Octopus", emoji:"🐙", where:"ocean", zones:[1,2], tier:"rare",
    facts:["I have three hearts and nine brains!","I change my color AND my bumpy skin to disappear.","I can squeeze through a hole the size of my eyeball.","Each of my arms can think for itself."] },

  { id:"dolphin", name:"Dolphin", emoji:"🐬", where:"ocean", zones:[1], tier:"rare",
    facts:["I sleep with only half my brain at a time.","Each of us has our own name — a special whistle!","I see with sound, like a superpower."] },

  { id:"hammerhead", name:"Hammerhead Shark", emoji:"🦈", where:"ocean", zones:[1,2], tier:"rare",
    facts:["My eyes are on the ends of my hammer, so I see almost all the way around.","I feel the tiny zaps of electricity other animals make.","I swim in groups of hundreds."] },

  { id:"mantaray", name:"Manta Ray", emoji:"🐟", where:"ocean", zones:[1,2], tier:"rare",
    facts:["My wings are as wide as a school bus is long.","I do underwater backflips when I eat.","I have the biggest brain of any fish, and I recognize myself in a mirror."] },

  { id:"sunfish", name:"Ocean Sunfish", emoji:"🐟", where:"ocean", zones:[1,2], tier:"rare",
    facts:["I'm the heaviest bony fish in the world — as heavy as a car.","I look like a giant swimming head!","I sunbathe on my side at the top of the water.","I start out smaller than your fingernail."] },

  { id:"greatwhite", name:"Great White Shark", emoji:"🦈", where:"ocean", zones:[1,2], tier:"epic",
    facts:["I lose and regrow thousands of teeth in my life.","I can smell one drop of blood from very far away.","My skin feels like sandpaper.","Sharks were swimming 200 million years before there were trees."] },

  { id:"marlin", name:"Marlin", emoji:"🐠", where:"ocean", zones:[1,2], tier:"epic",
    facts:["I have a long pointy sword on my face!","I'm the fastest fish in the ocean.","I flash bright glowing stripes when I get excited.","I'm as long as a canoe."] },

  { id:"mantisshrimp", name:"Mantis Shrimp", emoji:"🦐", where:"ocean", zones:[1], tier:"epic",
    facts:["I punch as fast as a bullet — my punch boils the water!","I can break aquarium glass with one hit.","I see 12 to 16 colors. You only see 3.","I'm only the size of your hand."] },

  { id:"leafyseadragon", name:"Leafy Sea Dragon", emoji:"🐉", where:"ocean", zones:[1], tier:"epic",
    facts:["I look exactly like floating seaweed, but I'm a fish!","My leafy bits aren't fins — they're just for hiding.","I have no teeth and no stomach, so I eat all day long."] },

  { id:"bluedragon", name:"Blue Dragon", emoji:"🐉", where:"ocean", zones:[1], tier:"legendary",
    facts:["I'm a tiny sea slug that floats upside down at the top of the sea.","I look like a beautiful little blue dragon.","I steal stingers from jellyfish and use them myself!","I'm only as long as your thumb."] },

  /* ================= OCEAN — ZONE 2: THE TWILIGHT ZONE ================= */
  { id:"lanternfish", name:"Lanternfish", emoji:"🐟", where:"ocean", zones:[2,3], tier:"common",
    facts:["I have rows of glowing lights along my belly.","There are more of me than almost any other fish on Earth.","Every night I swim way up to eat, then back down at sunrise."] },

  { id:"nautilus", name:"Nautilus", emoji:"🐚", where:"ocean", zones:[2,3], tier:"rare",
    facts:["My family has looked the same for 500 million years.","I have about 90 tentacles — but no suckers.","I float by filling my shell with gas, like a submarine."] },

  { id:"viperfish", name:"Viperfish", emoji:"🐟", where:"ocean", zones:[2,3], tier:"rare",
    facts:["My teeth are so long they don't fit inside my mouth.","I have a glowing fishing lure on my back.","I hang totally still in the dark and wait."] },

  { id:"giantisopod", name:"Giant Isopod", emoji:"🪲", where:"ocean", zones:[2,3,4], tier:"rare",
    facts:["I'm a roly poly the size of a football!","I can go five whole years without eating.","I live on the muddy floor way down deep."] },

  { id:"blobfish", name:"Blobfish", emoji:"🐡", where:"ocean", zones:[2,3,4], tier:"rare",
    facts:["Down deep I look like a normal fish — I only go blobby up here.","My body is squishier than water, so I float without swimming.","I don't really have bones or muscles."] },

  { id:"gulpereel", name:"Gulper Eel", emoji:"🐍", where:"ocean", zones:[2,3,4], tier:"rare",
    facts:["My mouth is way bigger than the rest of me.","I can swallow food bigger than my whole body.","My tail lights up pink and red at the tip."] },

  { id:"narwhal", name:"Narwhal", emoji:"🐋", where:"ocean", zones:[2], tier:"epic",
    facts:["My 'horn' is really a giant tooth poking through my lip!","It can grow nine feet long.","My tusk can feel what the water is like around me.","People used to sell my tusk as a unicorn horn."] },

  { id:"frilledshark", name:"Frilled Shark", emoji:"🦈", where:"ocean", zones:[2,3], tier:"epic",
    facts:["I look like a shark and a snake mixed together.","I have 300 teeth in 25 rows.","My family has barely changed in 80 million years."] },

  { id:"goblinshark", name:"Goblin Shark", emoji:"🦈", where:"ocean", zones:[2,3], tier:"epic",
    facts:["My whole jaw SHOOTS out of my face to grab food!","I'm pink because you can see my blood through my see-through skin.","People call me a living fossil."] },

  { id:"vampiresquid", name:"Vampire Squid", emoji:"🦑", where:"ocean", zones:[2,3], tier:"epic",
    facts:["I turn myself inside out like an umbrella when I'm scared.","Instead of ink, I squirt a cloud of glowing sparkles.","I live where there's almost no oxygen at all.","I don't drink blood — I eat 'marine snow' that falls from above."] },

  { id:"dumbo", name:"Dumbo Octopus", emoji:"🐙", where:"ocean", zones:[3,4], tier:"epic",
    facts:["I flap two big ear-fins to fly through the water.","I live deeper than almost any other octopus.","I swallow my food whole.","I'm one of the cutest animals in the deep sea!"] },

  { id:"yeticrab", name:"Yeti Crab", emoji:"🦀", where:"ocean", zones:[3,4], tier:"epic",
    facts:["My arms are covered in furry hair.","I grow my own food ON my hairy arms and then eat it.","I live next to super-hot volcano vents at the bottom of the sea."] },

  { id:"immortaljelly", name:"Immortal Jellyfish", emoji:"🪼", where:"ocean", zones:[2,3], tier:"legendary",
    facts:["When I get old or hurt, I turn back into a baby and grow up again.","Scientists think I might never have to die.","I'm smaller than your pinky fingernail."] },

  /* ================= OCEAN — ZONE 3 & 4: MIDNIGHT + THE TRENCH ================= */
  { id:"anglerfish", name:"Anglerfish", emoji:"🎣", where:"ocean", zones:[2,3,4], tier:"epic",
    facts:["I have a glowing fishing rod growing out of my head.","The light is made by tiny glowing bacteria that live on me.","My stomach stretches so I can eat things twice my size.","It is pitch black where I live — no sunlight ever gets there."] },

  { id:"coelacanth", name:"Coelacanth", emoji:"🐟", where:"ocean", zones:[3,4], tier:"legendary",
    facts:["Everybody thought my family died out with the dinosaurs.","Then in 1938 somebody found me, alive!","My fins have little bones inside, like tiny arms and legs.","I can live 100 years."] },

  { id:"oarfish", name:"Giant Oarfish", emoji:"🐍", where:"ocean", zones:[3,4], tier:"legendary",
    facts:["I'm the longest bony fish in the world — 36 feet, longer than a school bus.","I swim standing straight up and down.","Sailors who saw me made up stories about sea serpents.","I have a bright red crest on my head."] },

  /* ---- the giants: you need the magic trap for these ---- */
  { id:"whaleshark", name:"Whale Shark", emoji:"🦈", where:"ocean", zones:[2,3], tier:"epic", magicOnly:true,
    facts:["I'm the BIGGEST fish in the whole world — as long as a school bus.","I only eat teeny tiny food, so I'm totally gentle.","The spots on my back are like fingerprints. No two of us match."] },

  { id:"orca", name:"Orca", emoji:"🐋", where:"ocean", zones:[1,2], tier:"epic", magicOnly:true,
    facts:["I'm really the biggest kind of dolphin!","My family talks in our own accent that other families don't use.","I stay with my mom my whole life.","I can leap my whole body out of the water."] },

  { id:"humpback", name:"Humpback Whale", emoji:"🐋", where:"ocean", zones:[1,2], tier:"epic", magicOnly:true,
    facts:["I sing songs that last 20 minutes and can be heard miles away.","I blow rings of bubbles to trap my food.","My flippers are longer than a car."] },

  { id:"spermwhale", name:"Sperm Whale", emoji:"🐋", where:"ocean", zones:[3,4], tier:"epic", magicOnly:true,
    facts:["I have the biggest brain of any animal that has ever lived.","I dive down 3,000 feet in the dark to fight giant squid.","My clicks are the loudest sound any animal makes.","I can hold my breath for 90 minutes."] },

  { id:"giantsquid", name:"Giant Squid", emoji:"🦑", where:"ocean", zones:[3,4], tier:"epic", magicOnly:true,
    facts:["My eyes are as big as beach balls — the biggest of any animal.","I live so deep that people had never seen me alive until 2004.","I can be as long as a school bus."] },

  { id:"greenlandshark", name:"Greenland Shark", emoji:"🦈", where:"ocean", zones:[3,4], tier:"legendary", magicOnly:true,
    facts:["I can live over 400 years — the longest of any animal with a backbone.","Some sharks alive today were born before America existed.","I swim so slowly that scientists call me the sleeper shark.","I live in freezing water under the ice."] },

  { id:"colossalsquid", name:"Colossal Squid", emoji:"🦑", where:"ocean", zones:[4], tier:"legendary", magicOnly:true,
    facts:["I'm even heavier than the giant squid.","My arms have swiveling HOOKS on them, not just suckers.","I live in the freezing deep water near Antarctica.","People have almost never seen me."] },

  { id:"megamouth", name:"Megamouth Shark", emoji:"🦈", where:"ocean", zones:[4], tier:"legendary", magicOnly:true,
    facts:["Nobody knew I existed until 1976!","People have only ever seen about 100 of me, ever.","My giant mouth glows to bring tiny food right in.","I'm as long as a small bus but totally gentle."] },

  { id:"bluewhale", name:"Blue Whale", emoji:"🐳", where:"ocean", zones:[3,4], tier:"legendary", magicOnly:true,
    facts:["I'm the biggest animal that has EVER lived — bigger than any dinosaur.","My heart is the size of a small car.","My tongue weighs as much as an elephant.","When I was a baby I drank 50 gallons of milk a day!"] },

  { id:"sponge", name:"GIANT Sea Sponge", emoji:"🧽", where:"ocean", zones:[3,4], tier:"common", magicOnly:true, breaksTrap:true,
    facts:["I'm an animal, even though I look like a rock!","I have no mouth, no brain, and no bones.","Some of my family have been alive for 2,000 years.","I was way too big and heavy — I BROKE the magic trap!"] },

  /* ================= OCEAN — ZONE 5: THE HADAL ZONE =================
     Needs the Deep Suit. Nothing up above looks like these. */
  { id:"hatchetfish", name:"Hatchetfish", emoji:"🐟", where:"ocean", zones:[5], tier:"rare",
    facts:["My body is flat and shiny like a silver axe.","I have lights on my belly so I disappear against the water above me.","My eyes point straight up, watching for dinner."] },

  { id:"giantamphipod", name:"Giant Amphipod", emoji:"🦐", where:"ocean", zones:[5], tier:"rare",
    facts:["I'm a shrimpy bug the size of a shoe.","I live 4 miles down, deeper than most animals ever go.","I swarm anything that falls to the bottom.","Normal amphipods are the size of a grain of rice. Not me!"] },

  { id:"seapig", name:"Sea Pig", emoji:"🐷", where:"ocean", zones:[5], tier:"rare",
    facts:["I'm a fat pink sea cucumber that walks on puffy little legs.","I wander the deep sea floor in herds.","I'm see-through enough that you can spot my insides.","I'm the vacuum cleaner of the deep ocean."] },

  { id:"glasssquid", name:"Glass Squid", emoji:"🦑", where:"ocean", zones:[5], tier:"rare",
    facts:["My whole body is completely see-through except my eyeballs.","I swallow water to puff up into a ball when I'm scared.","I have little lights under my eyes to hide my own shadow."] },

  { id:"barreleye", name:"Barreleye Fish", emoji:"🐟", where:"ocean", zones:[5], tier:"epic",
    facts:["My HEAD IS SEE-THROUGH — you can watch my eyeballs move inside it!","The two dots on my face aren't eyes. They're my nose.","My real eyes are the green barrels inside my head, and they rotate to look up.","Nobody knew my head was see-through until 2009, because it pops when you pull me up."] },

  { id:"dragonfish", name:"Deep Sea Dragonfish", emoji:"🐉", where:"ocean", zones:[5], tier:"epic",
    facts:["I shine a RED headlight that almost nothing else down here can see.","It's like having secret night-vision goggles.","My teeth are see-through, so my mouth looks empty until I bite.","I have a glowing beard hanging off my chin."] },

  { id:"ghostshark", name:"Ghost Shark", emoji:"🦈", where:"ocean", zones:[5], tier:"epic",
    facts:["I'm not really a shark — my family split off 400 million years ago.","My skeleton is made of bendy stuff instead of bone.","The boys have a spiky club on their FOREHEAD.","I feel the tiny sparks of electricity that other animals make."] },

  { id:"combjelly", name:"Comb Jelly", emoji:"🪼", where:"ocean", zones:[5], tier:"epic",
    facts:["Rainbow lights ripple down my sides when I swim, like a tiny light show.","I'm not a jellyfish at all, and I can't sting you.","I swim using eight rows of tiny hairs called combs.","Comb jellies might be the oldest animals on the whole planet."] },

  { id:"hadalsnailfish", name:"Hadal Snailfish", emoji:"🐟", where:"ocean", zones:[5], tier:"legendary",
    facts:["I live deeper than any other fish in the world — 5 miles down.","The water down here presses on me as hard as 1,600 elephants standing on my head.","I look like a see-through tadpole.","Any deeper and no fish could survive at all."] },

  /* ================= OCEAN — ZONE 6: THE VOLCANO VENTS =================
     Needs the Volcano Suit. Boiling water, total darkness, no sunlight ever. */
  { id:"zombieworm", name:"Zombie Worm", emoji:"🪱", where:"ocean", zones:[6], tier:"rare",
    facts:["I eat the BONES of dead whales.","I have no mouth and no stomach at all.","I drill into bone using acid I make myself.","My name really means 'bone-eating snot flower.'"] },

  { id:"ventshrimp", name:"Vent Shrimp", emoji:"🦐", where:"ocean", zones:[6], tier:"rare",
    facts:["I swarm the boiling volcano chimneys in the thousands.","I have no normal eyes — I have a heat detector on my back instead.","I use it to see the glow of the super-hot water.","I farm bacteria on my own shell and eat them."] },

  { id:"tubeworm", name:"Giant Tube Worm", emoji:"🪱", where:"ocean", zones:[6], tier:"epic",
    facts:["I'm taller than a grown-up — 8 feet of worm in a white tube.","I have no mouth, no stomach, and no bottom.","Bacteria live inside me and make my food out of volcano chemicals.","My red plume is full of blood."] },

  { id:"pompeiiworm", name:"Pompeii Worm", emoji:"🪱", where:"ocean", zones:[6], tier:"epic",
    facts:["I live in water hot enough to cook an egg — 176 degrees!","I'm the most heat-proof animal on the planet.","I wear a fuzzy coat of bacteria like a blanket.","My tail sits in the hot water while my head stays cool."] },

  { id:"deepseaoctopus", name:"Deep-Sea Octopus", emoji:"🐙", where:"ocean", zones:[6], tier:"legendary",
    facts:["I'm a pale pink octopus who lives a mile down in the cold dark.","Moms guard their eggs for FOUR AND A HALF YEARS without eating once — longer than any animal on Earth.","That's longer than you've been alive!","My skin is covered in little bumps instead of being smooth."] },

  { id:"scalyfootsnail", name:"Scaly-Foot Snail", emoji:"🐚", where:"ocean", zones:[6], tier:"legendary",
    facts:["I build ARMOR OUT OF IRON. I'm the only animal on Earth with a metal skeleton.","My shell is magnetic — a magnet sticks to me!","I live on volcano chimneys at the bottom of the Indian Ocean.","Scientists study my armor to build better spacesuits."] },

  /* ================= THE MYTHICS =================
     The rarest things in the game. You can find them again and again —
     the game keeps count of how many times you've met each one. */
  { id:"theoldone", name:"The Old One", emoji:"🦈", where:"ocean", zones:[5,6], tier:"mythic", magicOnly:true, mythic:true,
    facts:["I am a Greenland shark, and I am 512 years old.","I was already swimming before your great-great-great-great-grandparents were born.","I have never once hurried anywhere.","I am nearly blind, and I have been circling in the cold dark my whole long life."] },

  { id:"theghost", name:"The Ghost", emoji:"🦑", where:"ocean", zones:[5,6], tier:"mythic", magicOnly:true, mythic:true,
    facts:["I am a bigfin squid, and people have seen me alive fewer than 20 times EVER.","My arms have elbows, and they hang down 20 feet like ribbons.","Nobody knows how I eat, how old I get, or how many of me there are.","Hardly anybody on Earth has ever laid eyes on me."] },

  { id:"thekraken", name:"The Kraken", emoji:"🦑", where:"ocean", zones:[6], tier:"mythic", magicOnly:true, mythic:true,
    facts:["I am the biggest colossal squid anybody has ever measured.","My arms have swiveling HOOKS that spin.","My eyes are the biggest eyes in the history of the world.","Sailors told stories about me for 500 years before anyone proved I was real."] },

  { id:"ironclad", name:"Ironclad", emoji:"🐚", where:"ocean", zones:[6], tier:"mythic", mythic:true,
    facts:["I am the oldest scaly-foot snail on the volcano, and my iron armor is thicker than any other.","Nothing on this planet has ever broken my shell.","I have sat on the same boiling chimney for my entire life.","I am a living suit of armor."] },

  { id:"theancient", name:"The Ancient", emoji:"🐢", where:"island", zones:[1], tier:"mythic", magicOnly:true, mythic:true, endemicTo:"the Galápagos Islands",
    facts:["I am a Galápagos tortoise and I am 187 years old.","I was alive before cars, before airplanes, before electric lights.","I have walked the same slow path up the same volcano for almost two centuries.","I will probably still be here when you are a grown-up."] },

  /* ================= LAND — ZONE 1: THE BACKYARD ================= */
  { id:"rolypoly", name:"Roly Poly", emoji:"🪲", where:"land", zones:[1], tier:"common",
    facts:["I curl into a perfect little ball when I get scared.","I'm not a bug at all — I'm related to crabs and lobsters!","I breathe with gills, so I hide where it's damp."] },

  { id:"earthworm", name:"Earthworm", emoji:"🪱", where:"land", zones:[1], tier:"common",
    facts:["I have no eyes, but I can feel light on my skin.","I eat dirt, and my poop helps plants grow.","I have five hearts!"] },

  { id:"ant", name:"Ant", emoji:"🐜", where:"land", zones:[1], tier:"common",
    facts:["I can carry things 50 times heavier than me.","I live with thousands of sisters in one nest.","We leave smelly trails so everybody can find the food."] },

  { id:"snail", name:"Snail", emoji:"🐌", where:"land", zones:[1], tier:"common",
    facts:["I carry my whole house on my back.","I glide along on slime that I make myself.","I have thousands of tiny teeth on my tongue!"] },

  { id:"cricket", name:"Cricket", emoji:"🦗", where:"land", zones:[1], tier:"common",
    facts:["I sing by rubbing my wings together.","My ears are on my front knees!","I chirp faster when the weather gets warm."] },

  { id:"bee", name:"Honey Bee", emoji:"🐝", where:"land", zones:[1], tier:"uncommon",
    facts:["I flap my wings 200 times every single second.","I tell my friends where the flowers are by dancing.","I visit 2 million flowers to make one jar of honey.","My honey never goes bad. Ever!"] },

  { id:"grasshopper", name:"Grasshopper", emoji:"🦗", where:"land", zones:[1], tier:"uncommon",
    facts:["I can jump 20 times the length of my own body.","My back legs work like springs that snap open.","I hear with my belly, not my head!"] },

  { id:"beetle", name:"Jewel Beetle", emoji:"🪲", where:"land", zones:[1,2], tier:"uncommon",
    facts:["My shell shines like a rainbow in the sun.","My colors aren't paint — they're tiny layers that bend light.","People have worn my shells as jewelry for hundreds of years."] },

  { id:"spider", name:"Jumping Spider", emoji:"🕷️", where:"land", zones:[1], tier:"uncommon",
    facts:["I have eight eyes and I can see in color.","I can jump 50 times my own body length.","I do a little dance to say hello."] },

  { id:"hornet", name:"Hornet", emoji:"🐝", where:"land", zones:[1,2], tier:"uncommon",
    facts:["I build a giant paper nest by chewing up wood.","I'm way bigger than a bee, and I can sting more than once.","I can fly 25 miles an hour."] },

  { id:"millipede", name:"Millipede", emoji:"🐛", where:"land", zones:[1,2,3], tier:"uncommon",
    facts:["My name means 'thousand feet,' but I really have about 400.","My legs move in waves, like the ocean.","I curl into a tight spiral when I'm scared."] },

  { id:"frog", name:"Tree Frog", emoji:"🐸", where:"land", zones:[1,2], tier:"rare",
    facts:["My toes are sticky so I can climb straight up glass.","I drink water through my skin instead of my mouth.","I close my eyes to help push my food down!"] },

  { id:"gecko", name:"Gecko", emoji:"🦎", where:"land", zones:[1,2], tier:"rare",
    facts:["I can walk upside down on the ceiling.","If something grabs my tail, it pops off and I run away.","I lick my own eyeballs to keep them clean!"] },

  { id:"mantis", name:"Praying Mantis", emoji:"🦗", where:"land", zones:[1,2], tier:"rare",
    facts:["I can turn my head all the way around to look behind me.","My front legs snap shut faster than you can blink.","I have five eyes — two big ones and three tiny ones.","I hold still and pretend to be a leaf."] },

  /* ================= LAND — ZONE 2: THE DEEP FOREST ================= */
  { id:"stagbeetle", name:"Stag Beetle", emoji:"🪲", where:"land", zones:[2], tier:"uncommon",
    facts:["My giant jaws look like a deer's antlers.","I wrestle other beetles and try to flip them over.","My jaws are big and strong but I'm gentle with people."] },

  { id:"walkingstick", name:"Walking Stick", emoji:"🌿", where:"land", zones:[2], tier:"rare",
    facts:["I look exactly like a twig, so nobody ever sees me.","I sway back and forth like a branch in the wind.","Some of my family are longer than your arm.","If I lose a leg, I can grow another one."] },

  { id:"rhinobeetle", name:"Rhinoceros Beetle", emoji:"🪲", where:"land", zones:[2], tier:"rare",
    facts:["I can lift 850 times my own weight — the strongest animal on Earth for my size.","I have a big horn like a rhino.","If you were as strong as me, you could lift a school bus.","I'm totally harmless."] },

  { id:"blackwidow", name:"Black Widow", emoji:"🕷️", where:"land", zones:[2,3], tier:"rare",
    facts:["I have a bright red hourglass painted on my belly.","My web is stronger than steel for its size!","I hang upside down all day long.","I like dark quiet corners, so watch where you reach."] },

  { id:"tarantula", name:"Tarantula", emoji:"🕷️", where:"land", zones:[2,3], tier:"rare",
    facts:["I'm big enough to cover your whole hand.","I kick itchy hairs off my belly at anything that bothers me.","I can go two years without eating.","I climb out of my old skin and leave a spider-shaped ghost behind."] },

  { id:"hedgehog", name:"Hedgehog", emoji:"🦔", where:"land", zones:[2], tier:"rare",
    facts:["I have about 5,000 spikes on my back.","I roll into a prickly ball when I'm nervous.","I hunt at night and I snuffle very loudly."] },

  { id:"viper", name:"Viper", emoji:"🐍", where:"land", zones:[2,3], tier:"rare",
    facts:["I have heat sensors on my face, so I can SEE warm animals in the dark.","My fangs fold up flat in my mouth like a pocket knife.","I strike faster than you can blink.","I smell with my tongue."] },

  { id:"chameleon", name:"Chameleon", emoji:"🦎", where:"land", zones:[2], tier:"rare",
    facts:["My two eyes look in two different directions at the same time.","My tongue shoots out twice as long as my whole body.","I change color to show how I'm feeling, not just to hide.","My tongue is faster than a race car."] },

  { id:"glassfrog", name:"Glass Frog", emoji:"🐸", where:"land", zones:[2], tier:"epic",
    facts:["My belly is SEE-THROUGH — you can watch my heart beating!","When I sleep, I hide my red blood in my liver so I turn clear.","I'm only as big as a grape.","Dads guard the eggs until they hatch."] },

  { id:"poisondartfrog", name:"Poison Dart Frog", emoji:"🐸", where:"land", zones:[2], tier:"epic",
    facts:["My bright colors are a warning sign that says 'don't eat me!'","I'm smaller than a paper clip.","I get my poison from the bugs I eat — in a zoo I'm not poisonous at all.","I carry my tadpoles on my back."] },

  { id:"orchidmantis", name:"Orchid Mantis", emoji:"🌸", where:"land", zones:[2], tier:"epic",
    facts:["I look exactly like a pink flower, petals and all.","Bugs fly right up to me because they think I'm a flower.","I'm even better at attracting bugs than real flowers are!"] },

  { id:"atlasmoth", name:"Atlas Moth", emoji:"🦋", where:"land", zones:[2], tier:"epic",
    facts:["My wings are as wide as your face — the biggest wings of any moth.","The tips of my wings look like snake heads to scare birds away.","I have no mouth! I never eat my whole adult life.","I only live about two weeks."] },

  { id:"goliathbirdeater", name:"Goliath Birdeater", emoji:"🕷️", where:"land", zones:[2], tier:"epic",
    facts:["I'm the biggest spider in the world — as wide as a dinner plate.","My fangs are as long as your fingernail.","I make a hissing sound by rubbing my legs together.","Even though it's my name, I almost never eat birds."] },

  { id:"titanbeetle", name:"Titan Beetle", emoji:"🪲", where:"land", zones:[2], tier:"legendary",
    facts:["I'm the biggest beetle in the world — as long as your hand.","My jaws can snap a pencil in half.","Nobody has ever found one of my babies. It's still a mystery!","I live deep in the Amazon rainforest."] },

  { id:"pangolin", name:"Pangolin", emoji:"🦔", where:"land", zones:[2,3], tier:"legendary",
    facts:["I'm the only mammal in the world covered in scales.","I roll into a ball so tough that even a lion can't open me.","My tongue is longer than my whole body.","I eat 70 million ants a year and I have no teeth."] },

  /* ================= LAND — ZONE 3: THE DESERT ================= */
  { id:"scorpion", name:"Desert Scorpion", emoji:"🦂", where:"land", zones:[3], tier:"rare",
    facts:["I glow bright blue under a black light. Nobody knows why!","I can go a whole year without eating.","I've been on Earth longer than the dinosaurs.","I hide under rocks all day and hunt at night."] },

  { id:"sidewinder", name:"Sidewinder", emoji:"🐍", where:"land", zones:[3], tier:"rare",
    facts:["I move sideways in loops so I don't burn on the hot sand.","I leave J-shaped tracks behind me.","I bury myself in sand with just my eyes poking out.","I have little horns above my eyes."] },

  { id:"jerboa", name:"Jerboa", emoji:"🐭", where:"land", zones:[3], tier:"rare",
    facts:["I'm a tiny mouse with giant kangaroo legs.","I can jump 10 feet in one hop.","I never ever drink water — I get it all from my food.","My ears are huge so I can cool off."] },

  { id:"tarantulahawk", name:"Tarantula Hawk", emoji:"🐝", where:"land", zones:[3], tier:"rare",
    facts:["I'm a wasp big enough to hunt tarantulas.","My sting is one of the most painful in the world.","I have bright orange wings as a warning.","Grown-up me only drinks flower nectar."] },

  { id:"hornedlizard", name:"Horned Lizard", emoji:"🦎", where:"land", zones:[3], tier:"rare",
    facts:["I SQUIRT BLOOD OUT OF MY EYES to scare away coyotes!","I can shoot it three feet.","I puff up like a spiky balloon so nothing can swallow me.","I eat a thousand ants a day."] },

  { id:"deserttortoise", name:"Desert Tortoise", emoji:"🐢", where:"land", zones:[3], tier:"rare",
    facts:["I spend 95% of my life underground in a burrow I dug.","I carry a whole year of water inside me.","I can live 80 years.","My burrow keeps 300 other kinds of animals cool too."] },

  { id:"camelspider", name:"Camel Spider", emoji:"🕷️", where:"land", zones:[3], tier:"epic",
    facts:["I'm not really a spider OR a scorpion — I'm my own thing.","I run 10 miles an hour, super fast for my size.","I have the biggest jaws for my body of almost any animal.","I chase shadows, which makes people think I'm chasing them!"] },

  { id:"gilamonster", name:"Gila Monster", emoji:"🦎", where:"land", zones:[3], tier:"epic",
    facts:["I'm one of the only venomous lizards in the whole world.","I store fat in my tail so I can eat just 3 or 4 times a year.","My beady skin is like a suit of armor.","I'm very slow, so I'm easy to walk away from."] },

  { id:"thornydevil", name:"Thorny Devil", emoji:"🦎", where:"land", zones:[3], tier:"epic",
    facts:["I'm covered in spikes so nothing wants to bite me.","I drink through my FEET — water travels up my skin to my mouth.","I have a fake second head on my neck to trick birds.","I eat 3,000 ants in one meal."] },

  { id:"fennecfox", name:"Fennec Fox", emoji:"🦊", where:"land", zones:[3], tier:"epic",
    facts:["My ears are half as big as my whole body.","My ears work like radiators to keep me cool.","I have furry feet so the hot sand doesn't burn me.","I'm the smallest fox in the world."] },

  /* ---- the giants: you need a MAGIC ROCK for these ---- */
  { id:"kingcobra", name:"King Cobra", emoji:"🐍", where:"land", zones:[2,3], tier:"epic", magicOnly:true,
    facts:["I'm the longest venomous snake in the world — as long as a car!","I can lift my head high enough to look a grown-up in the eyes.","I spread my hood to look scary and I GROWL like a dog.","I'm the only snake that builds a nest for my eggs."] },

  { id:"komodo", name:"Komodo Dragon", emoji:"🦎", where:"island", zones:[3], tier:"legendary", magicOnly:true, endemicTo:"Komodo Island",
    facts:["I'm the biggest lizard in the world — as long as a car.","I can smell dinner from 2 miles away.","I can run as fast as a person on a bike.","I swallow food as big as a goat in one gulp."] },

  { id:"cheetah", name:"Cheetah", emoji:"🐆", where:"land", zones:[3], tier:"legendary", magicOnly:true,
    facts:["I'm the fastest animal on land — faster than a car on the highway!","I go from standing still to super fast in three seconds.","My tail works like a steering wheel when I turn.","I can't roar like a lion, but I can chirp like a bird."] },

  { id:"galapagostortoise", name:"Galápagos Tortoise", emoji:"🐢", where:"island", zones:[1], tier:"legendary", magicOnly:true, endemicTo:"the Galápagos Islands",
    facts:["I can live over 150 years — longer than any other land animal.","I weigh as much as a motorcycle.","My shell is part of my skeleton, so I can never leave it.","I can go a whole year without food or water."] },

  /* ================= THE ISLANDS =================
     Every one of these lives on ONE island (or one island group) in the whole
     world and nowhere else. That's what `endemicTo` means — it's the whole point
     of the islands: the same kind of animal turned out different on each one.
     ISLAND 1 = Galápagos  2 = Madagascar  3 = Komodo & Sulawesi  4 = New Zealand */

  /* ---- Galápagos ---- */
  { id:"darwinsfinch", name:"Darwin's Finch", emoji:"🐦", where:"island", zones:[1], tier:"uncommon", endemicTo:"the Galápagos Islands",
    facts:["There are 18 kinds of us, and we all came from ONE bird that blew here long ago.","Each island's finches grew a different beak for the food on that island.","Big seeds made thick beaks. Little bugs made pointy beaks.","We're the birds that taught people how animals change."] },

  { id:"marineiguana", name:"Marine Iguana", emoji:"🦎", where:"island", zones:[1], tier:"uncommon", endemicTo:"the Galápagos Islands",
    facts:["I'm the only lizard in the world that swims in the sea and eats seaweed.","I SNEEZE salt out of my nose.","I can hold my breath for half an hour underwater.","I shrink when food is scarce, then grow back. Bones and all!"] },

  { id:"bluefootedbooby", name:"Blue-Footed Booby", emoji:"🐦", where:"island", zones:[1], tier:"uncommon",
    facts:["My feet are BRIGHT BLUE and I dance to show them off.","The bluer my feet, the healthier I am.","I dive into the ocean like an arrow from 80 feet up.","Half of all of us in the world nest right here."] },

  { id:"flightlesscormorant", name:"Flightless Cormorant", emoji:"🐦", where:"island", zones:[1], tier:"rare", endemicTo:"the Galápagos Islands",
    facts:["My family could all fly, but on this island I didn't need to — so my wings shrank.","My wings are now too small to ever lift me.","I'm the only cormorant on Earth that can't fly.","There are only about 1,000 of us anywhere."] },

  { id:"galapagospenguin", name:"Galápagos Penguin", emoji:"🐧", where:"island", zones:[1], tier:"rare", endemicTo:"the Galápagos Islands",
    facts:["I'm the only penguin that lives at the equator, where it's HOT.","I'm the smallest penguin — about as tall as your arm.","I hold my flippers out to shade my feet from the sun.","I pant like a dog to cool down."] },

  /* ---- Madagascar ---- */
  { id:"ringtailedlemur", name:"Ring-Tailed Lemur", emoji:"🐒", where:"island", zones:[2], tier:"uncommon", endemicTo:"Madagascar",
    facts:["My tail has 13 black rings and it's longer than my whole body.","I hold it straight up like a flag so my troop can follow me.","We have 'stink fights' — we rub smell on our tails and wave them at each other.","Every lemur on Earth lives on Madagascar and nowhere else."] },

  { id:"pantherchameleon", name:"Panther Chameleon", emoji:"🦎", where:"island", zones:[2], tier:"rare", endemicTo:"Madagascar",
    facts:["Chameleons from different parts of my island are completely different colors.","My tongue shoots out twice as long as my body in a hundredth of a second.","My two eyes look in two directions at the same time.","Madagascar has half of all the chameleon kinds in the world."] },

  { id:"tomatofrog", name:"Tomato Frog", emoji:"🐸", where:"island", zones:[2], tier:"rare", endemicTo:"Madagascar",
    facts:["I'm bright red and round, exactly like a tomato.","When something grabs me I puff up and ooze white glue that gums up its mouth.","I bury myself in the dirt and wait for rain.","I live in one small part of one island."] },

  { id:"giraffeweevil", name:"Giraffe Weevil", emoji:"🪲", where:"island", zones:[2], tier:"epic", endemicTo:"Madagascar",
    facts:["My neck is longer than the rest of my body — like a giraffe made of beetle.","Boys use their long necks to wrestle each other.","I'm bright red and shiny black.","I'm only as long as your fingernail."] },

  { id:"ayeaye", name:"Aye-Aye", emoji:"🐒", where:"island", zones:[2], tier:"epic", endemicTo:"Madagascar",
    facts:["I have one long skinny middle finger that I use to fish grubs out of trees.","I TAP on wood and listen for hollow spots, like a woodpecker made of monkey.","My ears are huge and my eyes glow at night.","I'm the strangest-looking primate in the world."] },

  { id:"fossa", name:"Fossa", emoji:"🐈", where:"island", zones:[2], tier:"epic", endemicTo:"Madagascar",
    facts:["I'm the biggest hunter on Madagascar — part cat, part mongoose, all mine.","My ankles swivel so I can run DOWN a tree head-first.","My tail is as long as my body and helps me balance.","I hunt lemurs, and nothing hunts me."] },

  /* ---- Komodo & Sulawesi ---- */
  { id:"babirusa", name:"Babirusa", emoji:"🐗", where:"island", zones:[3], tier:"rare", endemicTo:"Sulawesi",
    facts:["My tusks grow UP through the top of my snout.","If I never wore them down, they could curl around and touch my forehead.","My name means 'pig deer.'","I live on one island in Indonesia and nowhere else."] },

  { id:"maleo", name:"Maleo", emoji:"🐦", where:"island", zones:[3], tier:"rare", endemicTo:"Sulawesi",
    facts:["I bury my eggs in sand warmed by a volcano instead of sitting on them.","My egg is five times bigger than a chicken egg.","My chicks hatch able to FLY right away, and never meet their parents.","I have a black helmet on my head."] },

  { id:"spectraltarsier", name:"Spectral Tarsier", emoji:"🐒", where:"island", zones:[3], tier:"epic", endemicTo:"Sulawesi",
    facts:["My eyes are bigger than my brain — each eyeball is as big as my whole eye socket can hold.","I can turn my head almost all the way around, like an owl.","I leap 40 times my own body length between trees.","I talk in squeaks too high for you to hear."] },

  { id:"bearcuscus", name:"Bear Cuscus", emoji:"🐨", where:"island", zones:[3], tier:"epic", endemicTo:"Sulawesi",
    facts:["I'm a fuzzy black tree-climber with a curly grabbing tail.","I move so slowly people mistake me for a sloth.","I eat leaves all day and sleep the rest.","I only live in the treetops of one island."] },

  /* ---- New Zealand ---- */
  { id:"kea", name:"Kea", emoji:"🦜", where:"island", zones:[4], tier:"rare", endemicTo:"New Zealand",
    facts:["I'm the only parrot in the world that lives in the snowy mountains.","I can solve puzzles, and I open backpacks and car doors for fun.","I work together with other keas to get food.","I'm as smart as a four-year-old kid."] },

  { id:"kiwi", name:"Kiwi", emoji:"🥝", where:"island", zones:[4], tier:"rare", endemicTo:"New Zealand",
    facts:["I'm a bird with no wings at all, and whiskers like a cat.","My egg is the biggest egg for my body size of any bird — a fifth of my whole weight!","I'm the only bird with nostrils at the TIP of my beak, so I can smell worms underground.","My bones are heavy and solid, not hollow like other birds."] },

  { id:"giantweta", name:"Giant Wētā", emoji:"🦗", where:"island", zones:[4], tier:"epic", endemicTo:"New Zealand",
    facts:["I'm one of the heaviest insects on Earth — heavier than a mouse.","I'm a cricket the size of your hand.","Some of my cousins FREEZE SOLID all winter and thaw out alive in spring.","There were no mice here, so insects like me grew huge instead."] },

  { id:"tuatara", name:"Tuatara", emoji:"🦎", where:"island", zones:[4], tier:"epic", endemicTo:"New Zealand",
    facts:["I look like a lizard, but my family split off before lizards even existed.","I'm the last one left of a whole group that lived with the dinosaurs.","I have a THIRD EYE on top of my head when I'm a baby.","I can live 100 years and I keep growing the whole time."] },

  { id:"kakapo", name:"Kākāpō", emoji:"🦜", where:"island", zones:[4], tier:"legendary", endemicTo:"New Zealand",
    facts:["I'm a giant green parrot who cannot fly, and I smell like honey.","There are only about 250 of me alive in the entire world.","Every single one of us has a name and people check on us.","I BOOM all night like a bass drum to find a mate — you can hear it 3 miles away."] },

  { id:"lonesomegeorge", name:"Lonesome George", emoji:"🐢", where:"island", zones:[1,4], tier:"mythic", mythic:true, endemicTo:"Pinta Island",
    facts:["I am the very last Pinta Island tortoise. When I go, my kind is gone forever.","People searched every island for another one like me for 40 years and never found one.","I was about 100 years old and I was famous all over the world.","Every island tortoise looks a little different — mine was the shape of a saddle."] },

  /* ================= UNDERGROUND =================
     Straight down through dirt, caves, crystal, and the deep dark.
     Almost everything down here is blind, pale, and slow — there's no
     sunlight, so eyes and colors were no use and they faded away.
     LAYER 1 = Topsoil  2 = The Caves  3 = Crystal Caverns  4 = The Deep Dark */

  /* ---- Topsoil ---- */
  { id:"springtail", name:"Springtail", emoji:"🪳", where:"underground", zones:[1], tier:"common",
    facts:["I have a spring-loaded tail I snap to fling myself into the air.","There are more of me in one footstep of soil than people in a city.","I'm smaller than this letter O."] },

  { id:"grub", name:"Beetle Grub", emoji:"🐛", where:"underground", zones:[1], tier:"common",
    facts:["I'm a baby beetle, and I live in the dirt eating roots.","I'll spend years down here before I turn into a beetle.","I curl into a C shape when you dig me up."] },

  { id:"soilcentipede", name:"Soil Centipede", emoji:"🐛", where:"underground", zones:[1,2], tier:"uncommon",
    facts:["I'm long and skinny with a leg on every single body ring.","I always have an ODD number of pairs of legs. Never even!","I hunt in the dark with my feelers, not my eyes."] },

  { id:"cicadanymph", name:"Cicada Nymph", emoji:"🦗", where:"underground", zones:[1], tier:"uncommon",
    facts:["I live underground sucking on tree roots for SEVENTEEN YEARS.","Then I climb out, become a cicada, sing for a few weeks, and that's my whole life.","All of us come out the same year, billions at once.","I've been down here longer than you've been alive."] },

  { id:"mole", name:"Mole", emoji:"🐭", where:"underground", zones:[1,2], tier:"rare",
    facts:["My hands are giant shovels and I dig 60 feet of tunnel in a night.","I can barely see, but I feel everything.","I eat my own weight in worms every day.","My fur has no grain, so I can go backwards down a tunnel."] },

  { id:"antqueen", name:"Ant Queen", emoji:"🐜", where:"underground", zones:[1,2], tier:"rare",
    facts:["I'm the mother of every single ant in this nest — thousands of them.","I can live 30 years, while my workers live a few months.","I had wings once, then chewed them off when I started my nest.","I never leave this room again."] },

  /* ---- The Caves ---- */
  { id:"cavecricket", name:"Cave Cricket", emoji:"🦗", where:"underground", zones:[2], tier:"common",
    facts:["I have enormous back legs and I jump at anything that startles me.","My feelers are longer than my body — that's how I 'see' down here.","I can't chirp at all, unlike crickets up in the grass."] },

  { id:"pseudoscorpion", name:"Pseudoscorpion", emoji:"🦂", where:"underground", zones:[2], tier:"uncommon",
    facts:["I have scorpion pincers but no stinger and no tail.","I'm smaller than a grain of rice.","I catch a ride on beetles and even birds to get around.","I spin silk out of my JAWS to make a winter sleeping bag."] },

  { id:"bat", name:"Cave Bat", emoji:"🦇", where:"underground", zones:[2], tier:"uncommon",
    facts:["I see with sound — I shout and listen to the echo.","A million of us can pack into one cave.","I eat my own body weight in mosquitoes every night.","I'm the only mammal that truly flies."] },

  { id:"cavespider", name:"Cave Spider", emoji:"🕷️", where:"underground", zones:[2,3], tier:"rare",
    facts:["I hang my egg sacs from the cave roof like little lanterns.","I have long thin legs for feeling my way in total dark.","I can wait months between meals down here."] },

  { id:"glowworm", name:"Glowworm", emoji:"✨", where:"underground", zones:[2,3], tier:"rare",
    facts:["I glow BLUE-GREEN on the cave ceiling so it looks like a starry sky.","I hang sticky fishing lines down to catch bugs that fly toward my light.","Whole cave ceilings of us light up together.","I'm not a worm — I'm a baby fly."] },

  /* ---- Crystal Caverns ---- */
  { id:"cavecrayfish", name:"Blind Cave Crayfish", emoji:"🦞", where:"underground", zones:[3], tier:"rare",
    facts:["I'm ghost white with no color anywhere on me.","I have eye stalks, but no eyes on the ends.","I can live 75 years in a cave pool.","I might go a whole year without eating."] },

  { id:"blindcavefish", name:"Blind Cave Fish", emoji:"🐟", where:"underground", zones:[3], tier:"rare",
    facts:["My great-great-grandparents had eyes. Mine grew over with skin.","In the dark, eyes were no use — so we stopped growing them.","I 'see' by feeling tiny ripples in the water with my whole face.","My cousins in the river above still have eyes and stripes."] },

  { id:"starnosedmole", name:"Star-Nosed Mole", emoji:"🐭", where:"underground", zones:[3], tier:"epic",
    facts:["My nose is a pink star with 22 fingers on it.","It's the most sensitive touching thing of any animal on Earth.","I can find and eat a bug in a quarter of a second — the fastest eater alive.","I can even smell underwater by blowing bubbles and sniffing them back in."] },

  { id:"nakedmolerat", name:"Naked Mole-Rat", emoji:"🐭", where:"underground", zones:[3], tier:"epic",
    facts:["I'm a wrinkly pink mammal that lives in a colony with a queen, like an ant.","I almost never get cancer, and I barely age.","I can survive 18 minutes with NO oxygen at all.","I feel no pain from acid or chili peppers."] },

  { id:"texasblindsalamander", name:"Texas Blind Salamander", emoji:"🦎", where:"underground", zones:[3], tier:"epic",
    facts:["I'm see-through white with bright red feathery gills.","I have two tiny black dots where eyes would be, under my skin.","I live in one underground water system in the world and nowhere else.","I wave my head side to side to feel for food."] },

  { id:"olm", name:"Olm", emoji:"🐉", where:"underground", zones:[3,4], tier:"legendary",
    facts:["People used to find me washed out of caves and think I was a BABY DRAGON.","I can live 100 years, and I can go TEN YEARS without eating.","I'm blind, but I sense electricity like a shark.","One of me was watched for seven years and moved only a few feet in all that time."] },

  /* ---- The Deep Dark ---- */
  { id:"caverobberfly", name:"Cave Robber Fly", emoji:"🪰", where:"underground", zones:[4], tier:"rare",
    facts:["I was only discovered in 2009, deep in Colorado caves.","I have no eyes worth using and I can barely fly.","Nobody knows for sure what I eat.","I live where no light has ever reached."] },

  { id:"caveshrimp", name:"Cave Shrimp", emoji:"🦐", where:"underground", zones:[4], tier:"rare",
    facts:["I'm completely see-through — you can watch my food move through me.","I have no eyes at all, just smooth skin where they'd be.","I live in pitch-black rivers under the ground.","I eat whatever washes down from the world above."] },

  { id:"illacme", name:"750-Legged Millipede", emoji:"🐛", where:"underground", zones:[4], tier:"epic",
    facts:["I have up to 750 legs — more than any animal on Earth.","I'm only an inch long, thinner than a noodle.","I live 3 feet under the dirt in one tiny corner of California.","I have four penises and no eyes. Scientists find me very confusing."] },

  { id:"movilecentipede", name:"Movile Cave Centipede", emoji:"🐛", where:"underground", zones:[4], tier:"epic",
    facts:["My cave was sealed off from the whole world for 5 MILLION years.","Nothing in my cave has ever seen the sun, not once.","Down here we live on poison gas instead of sunlight.","People only found me in 2020, and I live nowhere else."] },

  { id:"devilworm", name:"Devil Worm", emoji:"🪱", where:"underground", zones:[4], tier:"legendary",
    facts:["I live a MILE AND A HALF underground — deeper than any animal ever found.","The rock around me is hot enough to cook in.","I was found in a South African gold mine.","My real name means 'the worm from hell.'"] },

  { id:"thesleeper", name:"The Sleeper", emoji:"🐉", where:"underground", zones:[3,4], tier:"mythic", mythic:true,
    facts:["I am an olm, and I am well over 100 years old.","I have not moved from this spot in seven years. I did not need to.","I have never once seen the sun, or anything at all.","I will still be here, in this same black pool, long after you are grown."] },

  { id:"theempress", name:"The Empress", emoji:"🐜", where:"land", zones:[2,3], tier:"mythic", mythic:true,
    facts:["I am a queen ant, and I started this whole colony by myself 30 years ago.","Every one of the millions of ants here is my child.","I have not left this room since the day I chewed my own wings off.","I am the oldest insect anybody has ever counted the years of."] },
];

/* How rare each kind is, and what it's worth */
const TIERS = {
  common:    { stars: 1, points: 10,   label: "Common",    color: "#9fb3c8" },
  uncommon:  { stars: 2, points: 25,   label: "Uncommon",  color: "#80ed99" },
  rare:      { stars: 3, points: 60,   label: "RARE",      color: "#4cc9f0" },
  epic:      { stars: 4, points: 150,  label: "EPIC",      color: "#c77dff" },
  legendary: { stars: 5, points: 400,  label: "LEGENDARY", color: "#ffcc00" },
  mythic:    { stars: 5, points: 2000, label: "★ MYTHIC ★", color: "#ff5ec7" }
};

/* The deeper (or farther) you go, the better the odds of something rare.
   `suit` is the diving suit you need to get down there at all. */
const ZONES = {
  ocean: [
    { n:1, name:"Sunlight Zone",     bonus:1,  needs:null,                weights:{ common:60, uncommon:28, rare:10, epic:2,  legendary:0.3, mythic:0 } },
    { n:2, name:"Twilight Zone",     bonus:2,  needs:null,                weights:{ common:25, uncommon:34, rare:28, epic:11, legendary:2,   mythic:0 } },
    { n:3, name:"Midnight Zone",     bonus:3,  needs:null,                weights:{ common:8,  uncommon:20, rare:35, epic:29, legendary:8,   mythic:0 } },
    { n:4, name:"THE TRENCH",        bonus:5,  needs:null,                weights:{ common:2,  uncommon:8,  rare:26, epic:42, legendary:22,  mythic:0 } },
    { n:5, name:"THE HADAL ZONE",    bonus:8,  needs:{gear:"suit", level:2, item:"Deep Suit"},    weights:{ common:0, uncommon:3, rare:22, epic:46, legendary:29, mythic:3 } },
    { n:6, name:"THE VOLCANO VENTS", bonus:12, needs:{gear:"suit", level:3, item:"Volcano Suit"}, weights:{ common:0, uncommon:0, rare:14, epic:40, legendary:38, mythic:8 } }
  ],
  land: [
    { n:1, name:"The Backyard",  bonus:1, needs:null, weights:{ common:60, uncommon:28, rare:10, epic:2,  legendary:0.3, mythic:0 } },
    { n:2, name:"Deep Forest",   bonus:2, needs:null, weights:{ common:20, uncommon:32, rare:30, epic:15, legendary:3,   mythic:1 } },
    { n:3, name:"The Desert",    bonus:3, needs:null, weights:{ common:8,  uncommon:20, rare:34, epic:29, legendary:9,   mythic:2 } }
  ],
  /* The islands: each one is a place where animals turned out different
     from everywhere else on Earth. Farther out = rarer. */
  island: [
    { n:1, name:"The Galápagos",     bonus:4,  needs:null, weights:{ common:0, uncommon:34, rare:38, epic:20, legendary:7,  mythic:1 } },
    { n:2, name:"Madagascar",        bonus:6,  needs:null, weights:{ common:0, uncommon:24, rare:34, epic:33, legendary:8,  mythic:1 } },
    { n:3, name:"Komodo & Sulawesi", bonus:8,  needs:null, weights:{ common:0, uncommon:16, rare:32, epic:38, legendary:12, mythic:2 } },
    { n:4, name:"New Zealand",       bonus:10, needs:null, weights:{ common:0, uncommon:10, rare:28, epic:38, legendary:20, mythic:4 } }
  ],
  /* Straight down through the ground. You need a shovel, then a pickaxe. */
  underground: [
    { n:1, name:"The Topsoil",      bonus:1,  needs:null,                                       weights:{ common:58, uncommon:30, rare:11, epic:1,  legendary:0.2, mythic:0 } },
    { n:2, name:"The Caves",        bonus:3,  needs:null,                                       weights:{ common:26, uncommon:34, rare:29, epic:10, legendary:1,   mythic:0 } },
    { n:3, name:"Crystal Caverns",  bonus:6,  needs:{gear:"dig", level:2, item:"Shovel"},        weights:{ common:4,  uncommon:16, rare:34, epic:34, legendary:11,  mythic:1 } },
    { n:4, name:"THE DEEP DARK",    bonus:10, needs:{gear:"dig", level:3, item:"Pickaxe"},       weights:{ common:0,  uncommon:4,  rare:26, epic:42, legendary:22,  mythic:6 } }
  ]
};

/* Things you can buy with points.
   `where` decides which shop it shows up in — every place sells different gear.
   `gear`/`level` is what the purchase actually raises. */
const SHOP = [

  /* ---------- OCEAN ---------- */
  { id:"suit2",  where:"ocean", name:"Deep Suit",        emoji:"🥽", cost:2500,  gear:"suit",   level:2,
    blurb:"Dive into THE HADAL ZONE, 5 miles down, where the see-through fish live." },
  { id:"suit3",  where:"ocean", name:"Volcano Suit",     emoji:"🌋", cost:12000, gear:"suit",   level:3, needs:"suit2",
    blurb:"Survive the boiling volcano vents at the very bottom of the world." },
  { id:"light2", where:"ocean", name:"Big Flashlight",   emoji:"🔦", cost:600,   gear:"light",  level:2,
    blurb:"See twice as far in the dark deep water." },
  { id:"light3", where:"ocean", name:"Super Floodlight", emoji:"💡", cost:2200,  gear:"light",  level:3, needs:"light2",
    blurb:"Light up the whole deep sea around you." },
  { id:"fins2",  where:"ocean", name:"Speed Flippers",   emoji:"🦶", cost:500,   gear:"fins",   level:2,
    blurb:"Swim a lot faster." },
  { id:"fins3",  where:"ocean", name:"Rocket Flippers",  emoji:"🚀", cost:1800,  gear:"fins",   level:3, needs:"fins2",
    blurb:"ZOOM. Get down to the deep parts way quicker." },
  { id:"radar",  where:"ocean", name:"Trap Radar",       emoji:"📡", cost:900,   gear:"radar",  level:1,
    blurb:"An arrow always points at the nearest trap." },
  { id:"sonar",  where:"ocean", name:"Sonar Ping",       emoji:"🛰️", cost:1600,  gear:"sonar",  level:1,
    blurb:"See every trap around you, even the ones hidden in the dark." },
  { id:"chum",   where:"ocean", name:"Chum Bucket",      emoji:"🪣", cost:3000,  gear:"chum",   level:1,
    blurb:"The huge creatures that swim past come around way more often." },

  /* ---------- LAND ---------- */
  { id:"boots2", where:"land", name:"Hiking Boots",   emoji:"🥾", cost:500,  gear:"boots", level:2,
    blurb:"Walk faster and jump higher." },
  { id:"boots3", where:"land", name:"Rocket Boots",   emoji:"🚀", cost:1800, gear:"boots", level:3, needs:"boots2",
    blurb:"Run like a cheetah and jump over bushes." },
  { id:"hammer", where:"land", name:"Rock Hammer",    emoji:"🔨", cost:900,  gear:"hammer", level:1,
    blurb:"Rocks come right back after you flip them. No more waiting." },
  { id:"binocs", where:"land", name:"Binoculars",     emoji:"🔭", cost:1400, gear:"binocs", level:1,
    blurb:"See a glow on a rock when something rare is hiding under it." },
  { id:"bugjar", where:"land", name:"Bug Jar",        emoji:"🫙", cost:2600, gear:"bugjar", level:1,
    blurb:"If something better was hiding nearby, you catch that one instead." },

  /* ---------- ISLANDS ---------- */
  { id:"boat",     where:"island", name:"The Boat",       emoji:"⛵", cost:4000, gear:"boat",     level:1,
    blurb:"Sail to the islands, where animals live that exist nowhere else on Earth." },
  { id:"snorkel",  where:"island", name:"Snorkel Mask",   emoji:"🤿", cost:1200, gear:"snorkel",  level:1, needs:"boat",
    blurb:"Search the tide pools too, so there's more to find on every island." },
  { id:"notebook", where:"island", name:"Field Notebook", emoji:"📓", cost:1000, gear:"notebook", level:1,
    blurb:"Shows how many creatures you still haven't found in the place you're in." },

  /* ---------- UNDERGROUND ---------- */
  { id:"dig2",     where:"underground", name:"Shovel",      emoji:"🪏", cost:1500, gear:"dig",      level:2,
    blurb:"Dig past the caves into the Crystal Caverns." },
  { id:"dig3",     where:"underground", name:"Pickaxe",     emoji:"⛏️", cost:6000, gear:"dig",      level:3, needs:"dig2",
    blurb:"Break through into THE DEEP DARK, a mile and a half down." },
  { id:"headlamp2", where:"underground", name:"Head Lamp",  emoji:"🪖", cost:700,  gear:"headlamp", level:2,
    blurb:"Light up the tunnels around you." },
  { id:"headlamp3", where:"underground", name:"Big Head Lamp", emoji:"🔆", cost:2400, gear:"headlamp", level:3, needs:"headlamp2",
    blurb:"Turn the whole cave bright." },
  { id:"ladder",   where:"underground", name:"Rope Ladder", emoji:"🪜", cost:800,  gear:"ladder",   level:1,
    blurb:"Press R to climb straight back up to the surface." },

  /* ---------- ANYWHERE ---------- */
  { id:"magic", where:"any", name:"Magic Trap", emoji:"🪄", cost:400, repeat:true,
    blurb:"One more magic trap, for catching the giants. Buy as many as you want." }
];

/* What each place is called in the shop, and its sign */
const PLACES = {
  ocean:       { name: "Ocean",       emoji: "🌊" },
  land:        { name: "Land",        emoji: "🌳" },
  island:      { name: "Islands",     emoji: "⛵" },
  underground: { name: "Underground", emoji: "⛏️" },
  any:         { name: "Anywhere",    emoji: "✨" }
};
