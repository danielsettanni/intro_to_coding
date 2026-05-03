const bodyEl = document.body;
const storyTextEl = document.getElementById("storyText");
const choicesEl = document.getElementById("choices");
const sceneImageEl = document.getElementById("sceneImage");
const inventoryEl = document.getElementById("inventory");
const debugEl = document.getElementById("debug");

const state = {
  inventory: []
};

function hasItem(itemName) {
  return state.inventory.includes(itemName);
}

function addItem(itemName) {
  if (itemName && !hasItem(itemName)) {
    state.inventory.push(itemName);
  }
}

function renderInventory() {
  inventoryEl.textContent =
    state.inventory.length > 0
      ? `Inventory: ${state.inventory.join(", ")}`
      : "Inventory: (empty)";
}

function applyMood(mood) {
  bodyEl.classList.remove("calm", "mystery", "danger");
  bodyEl.classList.add(mood || "mystery");
}

function goToNode(nodeId) {
  const node = STORY[nodeId];

  if (!node) {
    storyTextEl.textContent = "Oops! That page does not exist yet.";
    choicesEl.innerHTML = "";
    debugEl.textContent = `Missing node: ${nodeId}`;
    return;
  }

  storyTextEl.innerHTML = node.text.replaceAll("\n", "<br>");
  sceneImageEl.src = node.image || "assets/tower-room.svg";
  sceneImageEl.alt = `Scene: ${nodeId}`;
  applyMood(node.mood);

  choicesEl.innerHTML = "";

  node.choices.forEach((choice) => {
    if (choice.requiredItem && !hasItem(choice.requiredItem)) {
      return;
    }

    const button = document.createElement("button");
    button.textContent = choice.text;
    button.onclick = () => {
      if (choice.code) {
        const entered = window.prompt(choice.codePrompt || "Enter code:");
        if (entered === null) return;

        if (entered.trim() !== String(choice.code)) {
          goToNode(choice.codeFailTarget || nodeId);
          return;
        }

        if (choice.giveItem) {
          addItem(choice.giveItem);
        }

        goToNode(choice.codeSuccessTarget || choice.target);
        return;
      }

      if (choice.giveItem) {
        addItem(choice.giveItem);
      }
      goToNode(choice.target);
    };

    choicesEl.appendChild(button);
  });

  renderInventory();
  debugEl.textContent = `Current page: ${nodeId}`;
}

goToNode("start");
