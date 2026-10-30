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
  "E": { emoji: "👴", solid: true },  // the old keeper
  "S": { emoji: "🎣", solid: true },  // fisher's hut
  "H": { emoji: "🗼", solid: true },  // the lighthouse
  "g": { emoji: "👻", solid: true },  // fog wraith
  "O": { emoji: "🐉", solid: true }  // the sea serpent
};

