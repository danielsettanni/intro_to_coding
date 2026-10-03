// THE LAST LIGHTHOUSE — the world
// This file is DATA: it describes what is in your world.
// game.js reads it and brings it to life.

// THE STORY — the basics of your adventure.
const STORY = {
  title: "The Last Lighthouse",  // the name of your game
  hero: "🧑",  // what the hero looks like
  intro: "Cursed fog has swallowed the island. Relight the lighthouse before the last ferry is lost!",  // the first message
  floor: "#6f8068"  // the color of empty ground
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

// TILES — what each letter in the MAP looks like.
const TILES = {
  ".": { emoji: "" },  // misty grass
  "@": { emoji: "" },  // where the hero starts
  "T": { emoji: "🪨" },  // rocks
  "~": { emoji: "🌊" },  // the sea
  "$": { emoji: "🐚" },  // shell
  "k": { emoji: "🗝️" },  // brass key
  "D": { emoji: "🚪" },  // the keeper's gate
  "h": { emoji: "🍲" },  // fish stew
  "E": { emoji: "👴" },  // the old keeper
  "S": { emoji: "🎣" },  // fisher's hut
  "H": { emoji: "🗼" },  // the lighthouse
  "g": { emoji: "👻" },  // fog wraith
  "O": { emoji: "🐉" }  // the sea serpent
};

