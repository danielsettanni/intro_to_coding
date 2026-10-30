// GLITCH — the world
// This file is DATA: it describes what is in your world.
// game.js reads it and brings it to life.

// THE STORY — the basics of your adventure.
const STORY = {
  title: "GLITCH",  // the name of your game
  hero: "🧑‍💻",  // what the hero looks like
  intro: "SYSTEM ERROR. You've been pulled inside a broken video game. Find the exit!",  // the first message
  floor: "#24365c",  // the color of empty ground
  currency: "🪙"  // what you collect and spend
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

// TILES — what each letter in the MAP means.
//   emoji:         what it looks like
//   solid:         true = you can't walk through it
//   gems:          how many coins you get for stepping on it
//   item:          an item you pick up by stepping on it
//   needs:         an item you must have to get through
//   message:       what to say when you pick it up or open it
//   lockedMessage: what to say when you don't have what it needs
const TILES = {
  ".": { emoji: "" },  // empty level
  "@": { emoji: "" },  // where the hero starts
  "T": { emoji: "⬛", solid: true },  // corrupted block
  "~": { emoji: "🌀", solid: true },  // glitch void
  "$": { emoji: "🪙", gems: 1, message: "+1 coin! 🪙" },  // coin
  "k": { emoji: "🔑", item: "admin key", message: "You found the ADMIN KEY! 🔑" },  // admin key
  "D": {  // firewall
    emoji: "🔐",
    needs: "admin key",
    message: "ACCESS GRANTED. The firewall dissolves into pixels.",
    lockedMessage: "ACCESS DENIED. This firewall needs an admin key."
  },
  "h": { emoji: "💊" },  // health pack
  "E": { emoji: "🤖", solid: true },  // Byte, the helper AI
  "S": { emoji: "💾", solid: true },  // patch shop
  "H": { emoji: "🖥️", solid: true },  // exit portal
  "g": { emoji: "🐛", solid: true },  // bug
  "O": { emoji: "👾", solid: true }  // the Corrupted Boss
};

