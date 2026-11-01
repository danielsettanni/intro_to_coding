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
//   talk:          which DIALOGUE page to open when you bump into it
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
  "E": { emoji: "👮", solid: true, talk: "officer" },  // Officer Reyes
  "S": { emoji: "🦝", solid: true, talk: "rocco" },  // Rocco the raccoon
  "H": { emoji: "🏺", solid: true },  // the Golden Vase
  "g": { emoji: "🦹", solid: true },  // thief
  "O": { emoji: "🎩", solid: true }  // the Mastermind
};

// ITEMS — things that make you stronger when you own them.
const ITEMS = {
  "flashlight": { attack: 2 },
  "padded vest": { defense: 2 }
};

// DIALOGUE — conversations, written like a choose-your-own-adventure.
// Each page has text and choices. Each choice has:
//   text:      what the button says
//   target:    the next page ("end" closes the box)
//   cost:      (optional) cash it costs
//   give:      (optional) an item you get
//   setFlag:   (optional) something the game should remember you did
//   requires:  (optional) only show this choice if you have this item or flag
const DIALOGUE = {
  officer: {
    text:
      "Detective! Thank goodness. The thieves locked me out of the galleries.\n\n" +
      "Their boss, the Mastermind, has the Golden Vase in the east wing.",
    choices: [
      { text: "How do I stop the Mastermind?", target: "officerBoss" },
      { text: "How do I get into the galleries?", target: "officerDoor" },
      { text: "Who IS the Mastermind?", target: "officerSecret", setFlag: "curatorSecret" },
      { text: "I'm on it", target: "end" }
    ]
  },

  officerBoss: {
    text:
      "Grab whatever cash the thieves dropped and see Rocco. He sells gadgets, no questions asked.\n\n" +
      "A flashlight and a padded vest should do it.",
    choices: [
      { text: "Tell me something else", target: "officer" },
      { text: "Got it", target: "end" }
    ]
  },

  officerDoor: {
    text:
      "You'll need a security badge.\n\n" +
      "I dropped mine around here when they chased me out.",
    choices: [
      { text: "Tell me something else", target: "officer" },
      { text: "Got it", target: "end" }
    ]
  },

  officerSecret: {
    text:
      "*quietly* Rumor says it's Dr. Vale, the museum's own curator.\n\n" +
      "She always said the vase was taken from her family long ago. Rocco might know more.",
    choices: [
      { text: "Tell me something else", target: "officer" },
      { text: "I'll look into it", target: "end" }
    ]
  },

  rocco: {
    text: "🦝 Psst. Rocco's the name, gadgets are the game. Whaddya need?",
    choices: [
      { text: "Buy a flashlight 🔦 (6 💵)", cost: 6, give: "flashlight", target: "roccoThanks" },
      { text: "Buy a padded vest 🦺 (5 💵)", cost: 5, give: "padded vest", target: "roccoThanks" },
      { text: "Buy that old letter ✉️ (1 💵)", cost: 1, give: "old letter", requires: "curatorSecret", target: "roccoThanks" },
      { text: "Never mind", target: "end" }
    ]
  },

  roccoThanks: {
    text: "Pleasure doin' business. You didn't get it from me.",
    choices: [
      { text: "Keep shopping", target: "rocco" },
      { text: "Leave", target: "end" }
    ]
  }
};

