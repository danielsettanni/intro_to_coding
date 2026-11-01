// SIGNAL LOST — the world
// This file is DATA: it describes what is in your world.
// game.js reads it and brings it to life.

// THE STORY — the basics of your adventure.
const STORY = {
  title: "Signal Lost",  // the name of your game
  hero: "🧑‍🚀",  // what the hero looks like
  intro: "Emergency lights flicker. The station is silent... Reach the escape pod!",  // the first message
  floor: "#4a5368",  // the color of empty ground
  currency: "⚡"  // what you collect and spend
};

// THE MAP — each letter is one tile.
// Every row must be the SAME length!
// Look in TILES below to see what each letter means.
const MAP = [
  "TTTTTTTTTTTTTT",
  "T$..g...T..@.T",
  "T.TT..$.T.E.$T",
  "T..T....T....T",
  "T...TT..D.k.ST",
  "Tg.$...$T....T",
  "T..h..$.T$.h.T",
  "~~O~~~~~TTTTTT",
  "T.....H......T",
  "TTTTTTTTTTTTTT"
];

// TILES — what each letter in the MAP means.
//   emoji:         what it looks like
//   solid:         true = you can't walk through it
//   gems:          how many power cells you get for stepping on it
//   item:          an item you pick up by stepping on it
//   needs:         an item you must have to get through
//   message:       what to say when you pick it up or open it
//   lockedMessage: what to say when you don't have what it needs
//   talk:          which DIALOGUE page to open when you bump into it
const TILES = {
  ".": { emoji: "" },  // metal floor
  "@": { emoji: "" },  // where the hero starts
  "T": { emoji: "🔳", solid: true },  // hull wall
  "~": { emoji: "🌌", solid: true },  // hull breach (open space!)
  "$": { emoji: "⚡", gems: 1, message: "You found a power cell! ⚡" },  // power cell
  "k": { emoji: "🪪", item: "keycard", message: "You found a lab keycard! 🪪" },  // keycard
  "D": {  // lab door
    emoji: "🔒",
    needs: "keycard",
    message: "Beep! The lab door slides open.",
    lockedMessage: "The lab door is sealed. It needs a keycard."
  },
  "h": { emoji: "💉" },  // med kit
  "E": { emoji: "🛰️", solid: true, talk: "halo" },  // HALO, the station AI
  "S": { emoji: "🤖", solid: true, talk: "trader" },  // trader droid
  "H": { emoji: "🚀", solid: true },  // escape pod
  "g": { emoji: "👽", solid: true },  // alien drone
  "O": { emoji: "🐙", solid: true }  // the Hive Queen
};

// ITEMS — things that make you stronger when you own them.
const ITEMS = {
  "plasma blade": { attack: 2 },
  "force field": { defense: 2 }
};

// DIALOGUE — conversations, written like a choose-your-own-adventure.
// Each page has text and choices. Each choice has:
//   text:      what the button says
//   target:    the next page ("end" closes the box)
//   cost:      (optional) power cells it costs
//   give:      (optional) an item you get
//   setFlag:   (optional) something the game should remember you did
//   requires:  (optional) only show this choice if you have this item or flag
const DIALOGUE = {
  halo: {
    text:
      "HALO ONLINE. Hello, crew member. You are the last human aboard.\n\n" +
      "The escape pod is below the labs, but an alien Hive Queen is blocking the hatch.",
    choices: [
      { text: "How do I beat the Queen?", target: "haloQueen" },
      { text: "How do I open the lab door?", target: "haloDoor" },
      { text: "Why did the aliens attack?", target: "haloSecret", setFlag: "queenSecret" },
      { text: "End transmission", target: "end" }
    ]
  },

  haloQueen: {
    text:
      "Collect power cells and trade them for a plasma blade and a force field.\n\n" +
      "I calculate a 12% chance of survival. Good luck.",
    choices: [
      { text: "Tell me something else", target: "halo" },
      { text: "Thanks, HALO", target: "end" }
    ]
  },

  haloDoor: {
    text:
      "The labs need a keycard.\n\n" +
      "The captain kept a spare somewhere in this section.",
    choices: [
      { text: "Tell me something else", target: "halo" },
      { text: "Thanks, HALO", target: "end" }
    ]
  },

  haloSecret: {
    text:
      "...\n\n" +
      "I may have... locked the station myself, when the crew found alien eggs in the cargo bay.\n\n" +
      "The Queen is only protecting her young. The trader has an old translator chip.",
    choices: [
      { text: "Tell me something else", target: "halo" },
      { text: "HALO, what did you do?!", target: "end" }
    ]
  },

  trader: {
    text: "🤖 GREETINGS, CUSTOMER. ALL SALES ARE FINAL. PROBABLY.",
    choices: [
      { text: "Buy a plasma blade ⚔️ (6 ⚡)", cost: 6, give: "plasma blade", target: "traderThanks" },
      { text: "Buy a force field 🛡️ (5 ⚡)", cost: 5, give: "force field", target: "traderThanks" },
      { text: "Buy a translator chip 📟 (1 ⚡)", cost: 1, give: "translator chip", requires: "queenSecret", target: "traderThanks" },
      { text: "Leave", target: "end" }
    ]
  },

  traderThanks: {
    text: "TRANSACTION COMPLETE. HAVE A NICE SURVIVAL.",
    choices: [
      { text: "Keep shopping", target: "trader" },
      { text: "Leave", target: "end" }
    ]
  }
};

