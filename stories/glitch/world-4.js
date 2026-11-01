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
//   talk:          which DIALOGUE page to open when you bump into it
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
  "E": { emoji: "🤖", solid: true, talk: "byte" },  // Byte, the helper AI
  "S": { emoji: "💾", solid: true, talk: "patches" },  // patch shop
  "H": { emoji: "🖥️", solid: true },  // exit portal
  "g": { emoji: "🐛", solid: true },  // bug
  "O": { emoji: "👾", solid: true }  // the Corrupted Boss
};

// ITEMS — things that make you stronger when you own them.
const ITEMS = {
  "debugger": { attack: 2 },
  "antivirus": { defense: 2 }
};

// DIALOGUE — conversations, written like a choose-your-own-adventure.
// Each page has text and choices. Each choice has:
//   text:      what the button says
//   target:    the next page ("end" closes the box)
//   cost:      (optional) coins it costs
//   give:      (optional) an item you get
//   setFlag:   (optional) something the game should remember you did
//   requires:  (optional) only show this choice if you have this item or flag
const DIALOGUE = {
  byte: {
    text:
      "BEEP! Hello, player. I am BYTE, this game's helper program.\n\n" +
      "The game crashed and pulled you in. The only way out is the exit portal... but the Corrupted Boss is guarding it.",
    choices: [
      { text: "How do I beat the boss?", target: "byteBoss" },
      { text: "How do I get past the firewall?", target: "byteFirewall" },
      { text: "What IS the Corrupted Boss?", target: "byteSecret", setFlag: "bossSecret" },
      { text: "Log off", target: "end" }
    ]
  },

  byteBoss: {
    text:
      "Collect coins, then install a debugger and antivirus from the patch shop.\n\n" +
      "Or... you could just pay to skip the level. I won't tell anyone.",
    choices: [
      { text: "Tell me something else", target: "byte" },
      { text: "Thanks, Byte!", target: "end" }
    ]
  },

  byteFirewall: {
    text:
      "The firewall needs an ADMIN KEY.\n\n" +
      "Someone dropped one in this starting zone. Look around!",
    choices: [
      { text: "Tell me something else", target: "byte" },
      { text: "Thanks, Byte!", target: "end" }
    ]
  },

  byteSecret: {
    text:
      "*static* ...The boss used to be this game's HERO.\n\n" +
      "When the crash deleted its save file, it went corrupt. If someone restored its backup... I wonder.",
    choices: [
      { text: "Tell me something else", target: "byte" },
      { text: "Interesting...", target: "end" }
    ]
  },

  patches: {
    text: "💾 PATCH SHOP v1.0 — Upgrades installed while you wait!",
    choices: [
      { text: "Install a debugger ⚔️ (6 🪙)", cost: 6, give: "debugger", target: "patchesThanks" },
      { text: "Install antivirus 🛡️ (5 🪙)", cost: 5, give: "antivirus", target: "patchesThanks" },
      { text: "Buy an old backup disk 💿 (1 🪙)", cost: 1, give: "backup disk", requires: "bossSecret", target: "patchesThanks" },
      { text: "Exit shop", target: "end" }
    ]
  },

  patchesThanks: {
    text: "INSTALL COMPLETE. Thank you for your purchase!",
    choices: [
      { text: "Keep shopping", target: "patches" },
      { text: "Exit shop", target: "end" }
    ]
  }
};

