const STORY = {
  start: {
    text:
      "Rain taps against the stone tower windows.\n\n" +
      "A lantern flickers beside a dusty map. The locked door to the hall waits in silence.",
    image: "assets/tower-room.svg",
    mood: "mystery",
    choices: [
      { text: "Take the iron key on the table", target: "start", giveItem: "iron key" },
      { text: "Unlock the hall door", target: "hall", requiredItem: "iron key" },
      { text: "Read the dusty map", target: "map" }
    ]
  },

  map: {
    text:
      "The map shows a hidden route to the courtyard gate.\n\n" +
      "A note in red ink says: 'Only moonlight reveals the safe path.'",
    image: "assets/map-table.svg",
    mood: "calm",
    choices: [{ text: "Return to the tower door", target: "start" }]
  },

  hall: {
    text:
      "You step into a long hallway lined with portraits.\n\n" +
      "At the end, a staircase leads down. One portrait hangs slightly crooked.",
    image: "assets/hallway.svg",
    mood: "mystery",
    choices: [
      { text: "Inspect the crooked portrait", target: "portrait" },
      { text: "Search the staircase landing", target: "stairLanding" },
      { text: "Take the staircase down", target: "courtyard" }
    ]
  },

  stairLanding: {
    text:
      "You kneel by the stair rail and wipe away years of dust.\n\n" +
      "Scratched into the wood, you find a 4-digit code: 4281.",
    image: "assets/hallway.svg",
    mood: "calm",
    choices: [
      { text: "Return to the hallway", target: "hall" },
      { text: "Go to the portrait safe", target: "safe" }
    ]
  },

  portrait: {
    text:
      "Behind the portrait, you find a small steel safe set into the wall.\n\n" +
      "It needs a 4-digit code.",
    image: "assets/portrait-secret.svg",
    mood: "mystery",
    choices: [
      { text: "Try to open the safe", target: "safe" },
      { text: "Step back into the hallway", target: "hall" }
    ]
  },

  safe: {
    text:
      "The keypad blinks in the dark.\n\n" +
      "Maybe the staircase landing had a useful clue...",
    image: "assets/portrait-secret.svg",
    mood: "danger",
    choices: [
      {
        text: "Enter the 4-digit code",
        target: "hall",
        giveItem: "crest medallion",
        code: "4281",
        codePrompt: "Enter the safe code:",
        codeSuccessTarget: "safeOpened",
        codeFailTarget: "safeLocked"
      },
      { text: "Leave the safe", target: "hall" }
    ]
  },

  safeOpened: {
    text:
      "The lock clicks open.\n\n" +
      "Inside the safe, you secure the crest medallion and hear distant chains rattle below.",
    image: "assets/portrait-secret.svg",
    mood: "calm",
    choices: [{ text: "Return to the hallway", target: "hall" }]
  },

  safeLocked: {
    text:
      "The keypad flashes red and beeps loudly.\n\n" +
      "The safe stays locked.",
    image: "assets/portrait-secret.svg",
    mood: "danger",
    choices: [
      { text: "Try the code again", target: "safe" },
      { text: "Back away to the hallway", target: "hall" }
    ]
  },

  courtyard: {
    text:
      "Cold wind sweeps the courtyard.\n\n" +
      "The main gate is chained shut. A crest-shaped lock sits in the center.",
    image: "assets/courtyard-night.svg",
    mood: "danger",
    choices: [
      { text: "Try the crest lock", target: "gate", requiredItem: "crest medallion" },
      { text: "Go back upstairs", target: "hall" }
    ]
  },

  gate: {
    text:
      "The medallion fits. Chains drop to the ground.\n\n" +
      "The gate opens, and dawn light spills across the road ahead. You escaped Blackstone Keep.",
    image: "assets/gate-open.svg",
    mood: "calm",
    choices: [{ text: "Play again", target: "start" }]
  }
};
