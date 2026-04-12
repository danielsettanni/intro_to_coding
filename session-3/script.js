// SESSION 3 GAME ENGINE (with state + inventory + conditional choices)

const storyTextEl = document.getElementById("storyText");
const choicesEl = document.getElementById("choices");
const statusTextEl = document.getElementById("statusText");
const inventoryTextEl = document.getElementById("inventoryText");

// Game state = what the game remembers
const gameState = {
  inventory: []
};

// Helper: check if player has an item
function hasItem(itemName) {
  return gameState.inventory.includes(itemName);
}

// Helper: add item (but don’t add duplicates)
function addItem(itemName) {
  if (!hasItem(itemName)) {
    gameState.inventory.push(itemName);
  }
}

// Update inventory display on screen
function renderInventory() {
  if (gameState.inventory.length === 0) {
    inventoryTextEl.textContent = "none";
  } else {
    inventoryTextEl.textContent = gameState.inventory.join(", ");
  }
}

// Render one story node by id
function goToNode(nodeId) {
  const node = STORY[nodeId];

  if (!node) {
    storyTextEl.textContent = "Oops! That story page doesn't exist yet.";
    choicesEl.innerHTML = "";
    statusTextEl.textContent = `Missing node: ${nodeId}`;
    return;
  }

  // Show story text (convert \n to <br> for line breaks)
  storyTextEl.innerHTML = node.text.replaceAll("\n", "<br>");

  // Clear old choice buttons
  choicesEl.innerHTML = "";

  // Create buttons for choices, but only if requirements are met
  node.choices.forEach((choice) => {
    // If a choice requires an item and player doesn't have it, skip it
    if (choice.requires && !hasItem(choice.requires)) {
      return;
    }

    const button = document.createElement("button");
    button.textContent = choice.text;

    button.onclick = () => {
      // Apply effects (like adding an item) BEFORE moving to next node
      if (choice.addItem) {
        addItem(choice.addItem);
      }

      // (Optional: you can add removeItem later)
      // if (choice.removeItem) { ... }

      // Refresh inventory display, then go to the next story page
      renderInventory();
      goToNode(choice.target);
    };

    choicesEl.appendChild(button);
  });

  // Update status line
  statusTextEl.textContent = `Current page: ${nodeId}`;
}

// Start
renderInventory();
goToNode("start");