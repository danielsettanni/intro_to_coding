// THE LAST LIGHTHOUSE — the world
// This file is DATA: it describes what is in your world.
// game.js reads it and brings it to life.

// THE STORY — the basics of your adventure.
const STORY = {
  title: "The Last Lighthouse",  // the name of your game
  hero: "🧑",  // what the hero looks like
  intro: "Cursed fog has swallowed the island. Relight the lighthouse before the last ferry is lost!",  // the first message
  floor: "#6f8068",  // the color of empty ground
  currency: "🐚"  // what you collect and spend
};

// THE MAP — each letter is one tile.
// Every row must be the SAME length!
// Look in TILES below to see what each letter means.
const MAP = [
  "~~~~~~~~~~~~~~",
  "~TTTTTTTTTTTT~",
  "~T@.$.T.$.g.T~",
  "~T.E..T..TT$T~",
  "~Tk..hD...$.T~",
  "~T.S.$T.g..$T~",
  "~TTTTTT.$..hT~",
  "~~~~~~~~O~~~~~",
  "~~~....H...~~~",
  "~~~~~~~~~~~~~~"
];

// TILES — what each letter in the MAP means.
//   emoji:         what it looks like
//   solid:         true = you can't walk through it
//   gems:          how many shells you get for stepping on it
//   item:          an item you pick up by stepping on it
//   needs:         an item you must have to get through
//   message:       what to say when you pick it up or open it
//   lockedMessage: what to say when you don't have what it needs
//   talk:          which DIALOGUE page to open when you bump into it
const TILES = {
  ".": { emoji: "" },  // misty grass
  "@": { emoji: "" },  // where the hero starts
  "T": { emoji: "🪨", solid: true },  // rocks
  "~": { emoji: "🌊", solid: true },  // the sea
  "$": { emoji: "🐚", gems: 1, message: "You found a shell! 🐚" },  // shell
  "k": { emoji: "🗝️", item: "brass key", message: "You found a brass key! 🗝️" },  // brass key
  "D": {  // the keeper's gate
    emoji: "🚪",
    needs: "brass key",
    message: "The brass key turns with a creak. The keeper's gate swings open.",
    lockedMessage: "The keeper's gate is locked tight. The old keeper might know where the key is."
  },
  "h": { emoji: "🍲" },  // fish stew
  "E": { emoji: "👴", solid: true, talk: "keeper" },  // the old keeper
  "S": { emoji: "🎣", solid: true, talk: "fisher" },  // fisher's hut
  "H": { emoji: "🗼", solid: true },  // the lighthouse
  "g": { emoji: "👻", solid: true },  // fog wraith
  "O": { emoji: "🐉", solid: true }  // the sea serpent
};

// ITEMS — things that make you stronger when you own them.
const ITEMS = {
  "storm lantern": { attack: 2 },
  "oilskin coat": { defense: 2 }
};

// DIALOGUE — conversations, written like a choose-your-own-adventure.
// Each page has text and choices. Each choice has:
//   text:      what the button says
//   target:    the next page ("end" closes the box)
//   cost:      (optional) shells it costs
//   give:      (optional) an item you get
//   setFlag:   (optional) something the game should remember you did
//   requires:  (optional) only show this choice if you have this item or flag
const DIALOGUE = {
  keeper: {
    text:
      "Ah, you came. I'm too old to climb those steps now.\n\n" +
      "The lighthouse lies past the rocks, but a sea serpent coils across the only path.",
    choices: [
      { text: "How do I get past the serpent?", target: "keeperSerpent" },
      { text: "How do I get through your gate?", target: "keeperGate" },
      { text: "Why is the serpent so angry?", target: "keeperSecret", setFlag: "pearlSecret" },
      { text: "Goodbye", target: "end" }
    ]
  },

  keeperSerpent: {
    text:
      "The fog wraiths fear light. Get a storm lantern and an oilskin coat from the fisher.\n\n" +
      "Collect shells to trade. The islanders still use them as money.",
    choices: [
      { text: "Tell me something else", target: "keeper" },
      { text: "Thank you", target: "end" }
    ]
  },

  keeperGate: {
    text:
      "My gate? I lost the brass key years ago.\n\n" +
      "It must still be somewhere near the cottage.",
    choices: [
      { text: "Tell me something else", target: "keeper" },
      { text: "Thank you", target: "end" }
    ]
  },

  keeperSecret: {
    text:
      "*lowers voice* Forty years ago, a sailor stole a pearl from the serpent's nest.\n\n" +
      "The fog came the very next night. They say the fisher found something strange in her nets...",
    choices: [
      { text: "Tell me something else", target: "keeper" },
      { text: "I'll ask her", target: "end" }
    ]
  },

  fisher: {
    text: "🎣 Not many visitors in this fog. What do you need?",
    choices: [
      { text: "Buy a storm lantern 🏮 (6 🐚)", cost: 6, give: "storm lantern", target: "fisherThanks" },
      { text: "Buy an oilskin coat 🧥 (5 🐚)", cost: 5, give: "oilskin coat", target: "fisherThanks" },
      { text: "Buy the pearl from your nets ⚪ (1 🐚)", cost: 1, give: "pearl", requires: "pearlSecret", target: "fisherThanks" },
      { text: "Nothing, thanks", target: "end" }
    ]
  },

  fisherThanks: {
    text: "There you go. Mind the fog, it bites.",
    choices: [
      { text: "Keep shopping", target: "fisher" },
      { text: "Goodbye", target: "end" }
    ]
  }
};

