// THE MIDNIGHT HEIST — the world
// This file is DATA: it describes what is in your world.
// game.js reads it and brings it to life.

// THE STORY — the basics of your adventure.
const STORY = {
  title: "The Midnight Heist",  // the name of your game
  hero: "🕵️",  // what the hero looks like
  intro: "Thieves have taken over the museum! Get the Golden Vase back before sunrise.",  // the first message
  floor: "#8c7b65"  // the color of empty ground
};

// THE MAP — each letter is one tile.
// Every row must be the SAME length!
// Look in TILES below to see what each letter means.
const MAP = [
  "TTTTTTTTTTTTTT",
  "T@.$T$...~..gT",
  "T.E.T.TT.~.$.T",
  "Tk..T.$T...T.T",
  "T.h.D...g.T$.T",
  "TS.$T.TT...T.T",
  "TTTTT.$..T..hT",
  "TTTTTTT~~~O~TT",
  "T.....H......T",
  "TTTTTTTTTTTTTT"
];

// TILES — what each letter in the MAP looks like.
const TILES = {
  ".": { emoji: "" },  // marble floor
  "@": { emoji: "" },  // where the hero starts
  "T": { emoji: "🧱" },  // wall
  "~": { emoji: "🚨" },  // laser alarm
  "$": { emoji: "💵" },  // cash
  "k": { emoji: "🪪" },  // security badge
  "D": { emoji: "🔒" },  // gallery door
  "h": { emoji: "🍩" },  // donut
  "E": { emoji: "👮" },  // Officer Reyes
  "S": { emoji: "🦝" },  // Rocco the raccoon
  "H": { emoji: "🏺" },  // the Golden Vase
  "g": { emoji: "🦹" },  // thief
  "O": { emoji: "🎩" }  // the Mastermind
};

