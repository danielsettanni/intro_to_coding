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
  "E": { emoji: "🧙", solid: true },  // village elder
  "S": { emoji: "🏪", solid: true },  // shop
  "H": { emoji: "🏠", solid: true },  // Grandma's house
  "g": { emoji: "👺", solid: true },  // goblin
  "O": { emoji: "👹", solid: true }  // bridge ogre
};

