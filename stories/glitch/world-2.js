// GLITCH — the world
// This file is DATA: it describes what is in your world.
// game.js reads it and brings it to life.

// THE STORY — the basics of your adventure.
const STORY = {
  title: "GLITCH",  // the name of your game
  hero: "🧑‍💻",  // what the hero looks like
  intro: "SYSTEM ERROR. You've been pulled inside a broken video game. Find the exit!",  // the first message
  floor: "#24365c"  // the color of empty ground
};

// THE MAP — each letter is one tile.
// Every row must be the SAME length!
// Look in TILES below to see what each letter means.
const MAP = [
  "TTTTTTTTTTTTTT",
  "T@..$T....g.$T",
  "T.E..T.TTT...T",
  "T....T.$...T.T",
  "TS.k.D...T.$.T",
  "T$..hT.$.T.g.T",
  "TTTTTTTT.T$.hT",
  "~~~~~~~~O~~~~~",
  "T...........HT",
  "TTTTTTTTTTTTTT"
];

// TILES — what each letter in the MAP looks like.
const TILES = {
  ".": { emoji: "" },  // empty level
  "@": { emoji: "" },  // where the hero starts
  "T": { emoji: "⬛" },  // corrupted block
  "~": { emoji: "🌀" },  // glitch void
  "$": { emoji: "🪙" },  // coin
  "k": { emoji: "🔑" },  // admin key
  "D": { emoji: "🔐" },  // firewall
  "h": { emoji: "💊" },  // health pack
  "E": { emoji: "🤖" },  // Byte, the helper AI
  "S": { emoji: "💾" },  // patch shop
  "H": { emoji: "🖥️" },  // exit portal
  "g": { emoji: "🐛" },  // bug
  "O": { emoji: "👾" }  // the Corrupted Boss
};

