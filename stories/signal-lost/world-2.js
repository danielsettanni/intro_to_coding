// SIGNAL LOST — the world
// This file is DATA: it describes what is in your world.
// game.js reads it and brings it to life.

// THE STORY — the basics of your adventure.
const STORY = {
  title: "Signal Lost",  // the name of your game
  hero: "🧑‍🚀",  // what the hero looks like
  intro: "Emergency lights flicker. The station is silent... Reach the escape pod!",  // the first message
  floor: "#4a5368"  // the color of empty ground
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

// TILES — what each letter in the MAP looks like.
const TILES = {
  ".": { emoji: "" },  // metal floor
  "@": { emoji: "" },  // where the hero starts
  "T": { emoji: "🔳" },  // hull wall
  "~": { emoji: "🌌" },  // hull breach (open space!)
  "$": { emoji: "⚡" },  // power cell
  "k": { emoji: "🪪" },  // keycard
  "D": { emoji: "🔒" },  // lab door
  "h": { emoji: "💉" },  // med kit
  "E": { emoji: "🛰️" },  // HALO, the station AI
  "S": { emoji: "🤖" },  // trader droid
  "H": { emoji: "🚀" },  // escape pod
  "g": { emoji: "👽" },  // alien drone
  "O": { emoji: "🐙" }  // the Hive Queen
};

