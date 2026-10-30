// THE MIDNIGHT HEIST — the world
// This file is DATA: it describes what is in your world.
// game.js reads it and brings it to life.

// THE STORY — the basics of your adventure.
const STORY = {
  title: "The Midnight Heist",  // the name of your game
  hero: "🕵️",  // what the hero looks like
  intro: "Thieves have taken over the museum! Get the Golden Vase back before sunrise.",  // the first message
  floor: "#8c7b65",  // the color of empty ground
  currency: "💵"  // what you collect and spend
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

// TILES — what each letter in the MAP means.
//   emoji:         what it looks like
//   solid:         true = you can't walk through it
//   gems:          how much cash you get for stepping on it
//   item:          an item you pick up by stepping on it
//   needs:         an item you must have to get through
//   message:       what to say when you pick it up or open it
//   lockedMessage: what to say when you don't have what it needs
const TILES = {
  ".": { emoji: "" },  // marble floor
  "@": { emoji: "" },  // where the hero starts
  "T": { emoji: "🧱", solid: true },  // wall
  "~": { emoji: "🚨", solid: true },  // laser alarm
  "$": { emoji: "💵", gems: 1, message: "You found some dropped cash! 💵" },  // cash
  "k": { emoji: "🪪", item: "badge", message: "You found a security badge! 🪪" },  // security badge
  "D": {  // gallery door
    emoji: "🔒",
    needs: "badge",
    message: "*beep* The gallery door unlocks.",
    lockedMessage: "The gallery door is locked. It needs a security badge."
  },
  "h": { emoji: "🍩" },  // donut
  "E": { emoji: "👮", solid: true },  // Officer Reyes
  "S": { emoji: "🦝", solid: true },  // Rocco the raccoon
  "H": { emoji: "🏺", solid: true },  // the Golden Vase
  "g": { emoji: "🦹", solid: true },  // thief
  "O": { emoji: "🎩", solid: true }  // the Mastermind
};

