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
  "E": { emoji: "🛰️", solid: true },  // HALO, the station AI
  "S": { emoji: "🤖", solid: true },  // trader droid
  "H": { emoji: "🚀", solid: true },  // escape pod
  "g": { emoji: "👽", solid: true },  // alien drone
  "O": { emoji: "🐙", solid: true }  // the Hive Queen
};

