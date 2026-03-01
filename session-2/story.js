// STORY DATA (Session 2)
// Each "node" is a page of the story.
// Every node has:
// - text: what the player reads
// - choices: a list of buttons (text + target node)

const STORY = {
  start: {
    text:
      "You wake up in a forest clearing. The air is cold, and you don't remember how you got here.\n\n" +
      "A narrow trail leads north. A cave entrance yawns open to the east.",
    choices: [
      { text: "Follow the trail", target: "trail" },
      { text: "Enter the cave", target: "cave" }
    ]
  },

  trail: {
    text:
      "The trail winds through tall trees and opens into a quiet village. Smoke rises from chimneys.\n\n" +
      "People stop and stare at you as you step closer.",
    choices: [
      { text: "Talk to the villagers", target: "villagers" },
      { text: "Keep walking past the village", target: "pastVillage" }
    ]
  },

  cave: {
    text:
      "The cave is dark and damp. Water drips from the ceiling.\n\n" +
      "Something glints faintly on the ground near your feet.",
    choices: [
      { text: "Pick up the shiny object", target: "shinyObject" },
      { text: "Leave the cave", target: "start" }
    ]
  },

  villagers: {
    text:
      "A friendly baker offers you bread and asks where you came from.\n\n" +
      "Before you can answer, a bell rings from the center of town.",
    choices: [
      { text: "Go toward the bell", target: "bell" },
      { text: "Head back to the forest", target: "start" }
    ]
  },

  pastVillage: {
    text:
      "You keep walking, trying not to make eye contact.\n\n" +
      "Soon the village disappears behind you and the forest feels even quieter.",
    choices: [
      { text: "Return to the fork", target: "start" }
    ]
  },

  shinyObject: {
    text:
      "You pick up the object. It's a small silver coin with a symbol you've never seen.\n\n" +
      "For a second, the coin feels warm in your hand.",
    choices: [
      { text: "Go back outside", target: "start" }
    ]
  },

  bell: {
    text:
      "You reach the town square. The bell is still swaying.\n\n" +
      "A note is pinned to the post: 'MEET ME AT SUNSET.'",
    choices: [
      { text: "Go back to the baker", target: "villagers" },
      { text: "Return to the forest", target: "start" }
    ]
  }
};