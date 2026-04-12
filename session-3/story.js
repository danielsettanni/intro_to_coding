// SESSION 3 STORY DATA
// New concepts:
// - choices can have "requires": itemName (only show if you have it)
// - choices can have "addItem": itemName (adds to inventory when clicked)
// - choices can have "removeItem": itemName (optional; shows consequences)

const STORY = {
  start: {
    text:
      "You wake up in a forest clearing. The air is cold, and you don't remember how you got here.\n\n" +
      "A narrow trail leads north. A cave entrance yawns open to the east.",
    choices: [
      { text: "Follow the trail", target: "trail" },
      { text: "Enter the cave", target: "caveEntrance" }
    ]
  },

  trail: {
    text:
      "The trail winds through tall trees and opens into a quiet village.\n\n" +
      "A wooden gate blocks the path forward. A sign reads: 'NO ENTRY WITHOUT A PASS.'",
    choices: [
      { text: "Go back to the clearing", target: "start" },

      // This choice only appears if the player has "silverCoin"
      { text: "Show the silver coin as a pass", target: "villageSquare", requires: "silverCoin" },

      // If they don't have it, we give them a hint
      { text: "Try to open the gate anyway", target: "gateLocked" }
    ]
  },

  gateLocked: {
    text:
      "You tug on the gate, but it doesn't budge.\n\n" +
      "The lock looks old. Maybe there's a way to prove you belong here...",
    choices: [
      { text: "Go back", target: "trail" }
    ]
  },

  caveEntrance: {
    text:
      "The cave is dark and damp. Water drips from the ceiling.\n\n" +
      "Something glints faintly on the ground near your feet.",
    choices: [
      // Add an item when clicked
      { text: "Pick up the shiny object", target: "foundCoin", addItem: "silverCoin" },
      { text: "Leave the cave", target: "start" }
    ]
  },

  foundCoin: {
    text:
      "You pick up the object. It's a small silver coin with a symbol you've never seen.\n\n" +
      "It feels warm in your hand for a moment, then goes cold.",
    choices: [
      { text: "Go back outside", target: "start" }
    ]
  },

  villageSquare: {
    text:
      "The guard sees the coin and steps aside.\n\n" +
      "You enter the village square. In the center is a locked chest with a note: 'FOR THE COIN-BEARER.'",
    choices: [
      { text: "Inspect the chest", target: "chest" },
      { text: "Return to the forest", target: "start" }
    ]
  },

  chest: {
    text:
      "The chest has a small keyhole.\n\n" +
      "A shopkeeper whispers: 'Keys are traded for stories.'",
    choices: [
      { text: "Tell a short story to the shopkeeper", target: "earnedKey", addItem: "rustyKey" },
      { text: "Back away from the chest", target: "villageSquare" }
    ]
  },

  earnedKey: {
    text:
      "The shopkeeper smiles. 'A fair trade.'\n\n" +
      "They hand you a rusty key.",
    choices: [
      { text: "Try the key on the chest", target: "openChest", requires: "rustyKey" },
      { text: "Put the key away for later", target: "villageSquare" }
    ]
  },

  openChest: {
    text:
      "The rusty key turns with a loud CLICK.\n\n" +
      "Inside the chest is a folded map labeled: 'The Way Home.'",
    choices: [
      { text: "Take the map", target: "tookMap", addItem: "map" }
    ]
  },

  tookMap: {
    text:
      "You tuck the map safely away.\n\n" +
      "Now you have a destination… and a choice to make.",
    choices: [
      { text: "Head back into the forest", target: "start" }
    ]
  }
};