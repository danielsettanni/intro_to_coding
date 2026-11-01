// PINEHILL QUEST — the world
// This file is DATA: it describes what is in your world.
// game.js reads it and brings it to life.

// THE STORY — the basics of your adventure.
const STORY = {
  title: "Pinehill Quest",  // the name of your game
  hero: "🧝",  // what the hero looks like
  intro: "Grandma is expecting you! Use the arrow keys to explore.",  // the first message
  floor: "#4a8f3a",  // the color of empty ground
  currency: "💎"  // what you collect and spend
};

// THE MAP — each letter is one tile.
// Every row must be the SAME length!
// Look in TILES below to see what each letter means.
const MAP = [
  "TTTTTTTTTTTTTT",
  "T@...$T$..g.$T",
  "T.E...T.TT...T",
  "T....kT..$.T.T",
  "T.S...D...g..T",
  "T$...hT.TT..hT",
  "TTTTTTT$...$.T",
  "~~~~~~~~~~O~~~",
  "T.....H......T",
  "TTTTTTTTTTTTTT"
];

// TILES — what each letter in the MAP means.
//   emoji:         what it looks like
//   solid:         true = you can't walk through it
//   gems:          how many gems you get for stepping on it
//   item:          an item you pick up by stepping on it
//   needs:         an item you must have to get through
//   message:       what to say when you pick it up or open it
//   lockedMessage: what to say when you don't have what it needs
//   talk:          which DIALOGUE page to open when you bump into it
const TILES = {
  ".": { emoji: "" },  // grass
  "@": { emoji: "" },  // where the hero starts
  "T": { emoji: "🌲", solid: true },  // tree
  "~": { emoji: "🌊", solid: true },  // river
  "$": { emoji: "💎", gems: 1, message: "You found a gem! 💎" },  // gem
  "k": { emoji: "🗝️", item: "key", message: "You found a rusty key! 🗝️" },  // key
  "D": {  // forest gate
    emoji: "🚪",
    needs: "key",
    message: "You unlock the forest gate with the rusty key.",
    lockedMessage: "The forest gate is locked. Maybe the key is somewhere in the village..."
  },
  "h": { emoji: "💖" },  // heart
  "E": { emoji: "🧙", solid: true, talk: "elder" },  // village elder
  "S": { emoji: "🏪", solid: true, talk: "shop" },  // shop
  "H": { emoji: "🏠", solid: true },  // Grandma's house
  "g": { emoji: "👺", solid: true },  // goblin
  "O": { emoji: "👹", solid: true }  // bridge ogre
};

// ITEMS — things that make you stronger when you own them.
const ITEMS = {
  sword: { attack: 2 },
  shield: { defense: 2 }
};

// DIALOGUE — conversations, written like a choose-your-own-adventure.
// Each page has text and choices. Each choice has:
//   text:      what the button says
//   target:    the next page ("end" closes the box)
//   cost:      (optional) gems it costs
//   give:      (optional) an item you get
//   setFlag:   (optional) something the game should remember you did
//   requires:  (optional) only show this choice if you have this item or flag
const DIALOGUE = {
  elder: {
    text:
      "Ah, young traveler! Off to visit Grandma?\n\n" +
      "She lives across the river... but a grumpy ogre guards the bridge.",
    choices: [
      { text: "How do I get past the ogre?", target: "elderOgre" },
      { text: "How do I get into the forest?", target: "elderGate" },
      { text: "Why is the ogre so grumpy?", target: "elderSecret", setFlag: "ogreSecret" },
      { text: "Goodbye!", target: "end" }
    ]
  },

  elderOgre: {
    text:
      "Don't fight that ogre with your bare hands!\n\n" +
      "Collect gems, then buy a sword and a shield at the shop.",
    choices: [
      { text: "Tell me something else", target: "elder" },
      { text: "Thanks!", target: "end" }
    ]
  },

  elderGate: {
    text:
      "The old forest gate is locked.\n\n" +
      "I dropped the key somewhere here in the village. Look around!",
    choices: [
      { text: "Tell me something else", target: "elder" },
      { text: "Thanks!", target: "end" }
    ]
  },

  elderSecret: {
    text:
      "*whispers* He hasn't had a proper meal since the flood.\n\n" +
      "And oh, how he loves Grandma's apple pie... I think the shop has one left.",
    choices: [
      { text: "Tell me something else", target: "elder" },
      { text: "Interesting...", target: "end" }
    ]
  },

  shop: {
    text: "Welcome to Pinehill Supplies! What can I get you?",
    choices: [
      { text: "Buy a sword 🗡️ (6 💎)", cost: 6, give: "sword", target: "shopThanks" },
      { text: "Buy a shield 🛡️ (5 💎)", cost: 5, give: "shield", target: "shopThanks" },
      { text: "Buy Grandma's apple pie 🥧 (1 💎)", cost: 1, give: "pie", requires: "ogreSecret", target: "shopThanks" },
      { text: "Just looking", target: "end" }
    ]
  },

  shopThanks: {
    text: "A fine choice! That will help with the ogre.",
    choices: [
      { text: "Keep shopping", target: "shop" },
      { text: "Goodbye", target: "end" }
    ]
  }
};

