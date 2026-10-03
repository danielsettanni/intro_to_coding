// PINEHILL QUEST — the world
// This file is DATA: it describes what is in your world.
// game.js reads it and brings it to life.

// THE STORY — the basics of your adventure.
const STORY = {
  title: "Pinehill Quest",  // the name of your game
  hero: "🧝",  // what the hero looks like
  intro: "Grandma is expecting you! Use the arrow keys to explore.",  // the first message
  floor: "#4a8f3a"  // the color of empty ground
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

// TILES — what each letter in the MAP looks like.
const TILES = {
  ".": { emoji: "" },  // grass
  "@": { emoji: "" },  // where the hero starts
  "T": { emoji: "🌲" },  // tree
  "~": { emoji: "🌊" },  // river
  "$": { emoji: "💎" },  // gem
  "k": { emoji: "🗝️" },  // key
  "D": { emoji: "🚪" },  // forest gate
  "h": { emoji: "💖" },  // heart
  "E": { emoji: "🧙" },  // village elder
  "S": { emoji: "🏪" },  // shop
  "H": { emoji: "🏠" },  // Grandma's house
  "g": { emoji: "👺" },  // goblin
  "O": { emoji: "👹" }  // bridge ogre
};

