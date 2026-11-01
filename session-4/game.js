// PINEHILL QUEST — the game engine
// This file holds the RULES of the game.
// The world itself (the map and everything in it) lives in world.js.

// 1) Find the parts of the page we will change
const boardEl = document.getElementById("board");
const messageEl = document.getElementById("message");
const titleEl = document.getElementById("title");
const gemsEl = document.getElementById("gems");
const inventoryEl = document.getElementById("inventory");
const attackEl = document.getElementById("attack");
const defenseEl = document.getElementById("defense");
const boxEl = document.getElementById("box");
const boxTextEl = document.getElementById("boxText");
const boxChoicesEl = document.getElementById("boxChoices");

// 2) The game's memory (called "state")
const state = {
  x: 0,
  y: 0,
  gems: 0,
  inventory: [],
  attack: 1,
  defense: 2,
  paused: false,
  flags: []
};

// ---------- Reading the map ----------

// Which tile is at (x, y)? Looks up the letter in TILES.
function getTile(x, y) {
  const letter = MAP[y][x];
  const tile = TILES[letter];
  if (!tile) {
    console.log("Unknown letter in MAP: " + letter);
    return { emoji: "❓" };
  }
  return tile;
}

// Change the letter at (x, y). Example: setTile(3, 2, ".") turns it into grass.
function setTile(x, y, letter) {
  const row = MAP[y];
  MAP[y] = row.slice(0, x) + letter + row.slice(x + 1);
}

// Find the "@" in the map and put the hero there.
function findStart() {
  for (let y = 0; y < MAP.length; y++) {
    for (let x = 0; x < MAP[y].length; x++) {
      if (MAP[y][x] === "@") {
        state.x = x;
        state.y = y;
      }
    }
  }
}

// ---------- Items ----------

// Is this item in the backpack?
function hasItem(name) {
  return state.inventory.includes(name);
}

// Put an item in the backpack. Some items make you stronger!
function addItem(name) {
  state.inventory.push(name);

  const item = ITEMS[name];
  if (item && item.attack) {
    state.attack = state.attack + item.attack;
  }
  if (item && item.defense) {
    state.defense = state.defense + item.defense;
  }
}

// ---------- Drawing ----------

// Draw every tile of the map onto the page.
function render() {
  boardEl.innerHTML = "";
  boardEl.style.gridTemplateColumns = "repeat(" + MAP[0].length + ", 44px)";

  for (let y = 0; y < MAP.length; y++) {
    for (let x = 0; x < MAP[y].length; x++) {
      const tileEl = document.createElement("div");
      tileEl.className = "tile";
      tileEl.style.background = STORY.floor;

      if (x === state.x && y === state.y) {
        tileEl.textContent = STORY.hero;
      } else {
        tileEl.textContent = getTile(x, y).emoji;
      }

      boardEl.appendChild(tileEl);
    }
  }

  renderHud();
}

// Update the stats at the top and the backpack.
function renderHud() {
  gemsEl.textContent = STORY.currency + " " + state.gems;
  attackEl.textContent = "⚔️ " + state.attack;
  defenseEl.textContent = "🛡️ " + state.defense;

  if (state.inventory.length === 0) {
    inventoryEl.textContent = "🎒 empty";
  } else {
    inventoryEl.textContent = "🎒 " + state.inventory.join(", ");
  }
}

// Show a short message under the map.
function showMessage(text) {
  messageEl.textContent = text;
}

// ---------- Moving ----------

// Try to move the hero to (newX, newY).
function tryMove(newX, newY) {
  // Stay inside the map
  if (newY < 0 || newY >= MAP.length) {
    return;
  }
  if (newX < 0 || newX >= MAP[newY].length) {
    return;
  }

  const tile = getTile(newX, newY);

  // Characters want to talk
  if (tile.talk) {
    showDialogue(tile.talk);
    return;
  }

  // Locked tiles need an item
  if (tile.needs) {
    if (hasItem(tile.needs)) {
      setTile(newX, newY, ".");
      showMessage(tile.message);
    } else {
      showMessage(tile.lockedMessage);
      return;
    }
  }

  // Solid tiles block the way
  if (tile.solid) {
    return;
  }

  // Treasure!
  if (tile.gems) {
    state.gems = state.gems + tile.gems;
    setTile(newX, newY, ".");
    showMessage(tile.message);
  }
  if (tile.item) {
    addItem(tile.item);
    setTile(newX, newY, ".");
    showMessage(tile.message);
  }

  // Move the hero
  state.x = newX;
  state.y = newY;
  render();
}

// ---------- Talking ----------

// Open the dialogue box with some text and no buttons yet.
function openBox(text) {
  state.paused = true;
  boxEl.hidden = false;
  boxTextEl.textContent = text;
  boxChoicesEl.innerHTML = "";
}

// Add one button to the dialogue box.
function addButton(text, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.onclick = onClick;
  boxChoicesEl.appendChild(button);
}

// Hide the dialogue box so the hero can walk again.
function closeBox() {
  state.paused = false;
  boxEl.hidden = true;
}

// Has the hero done or learned this? Flags remember choices.
function hasFlag(name) {
  return state.flags.includes(name);
}

// Show one page of DIALOGUE with a button for each choice.
function showDialogue(pageId) {
  const page = DIALOGUE[pageId];

  if (!page) {
    openBox("Oops! Missing dialogue page: " + pageId);
    addButton("Close", closeBox);
    return;
  }

  openBox(page.text);

  page.choices.forEach((choice) => {
    // Don't offer things the hero already owns
    if (choice.give && hasItem(choice.give)) {
      return;
    }
    // Only show this choice if the hero has the item or flag it requires
    if (choice.requires && !hasItem(choice.requires) && !hasFlag(choice.requires)) {
      return;
    }
    addButton(choice.text, () => choose(choice));
  });
}

// What happens when a dialogue button is clicked.
function choose(choice) {
  if (choice.cost) {
    if (state.gems < choice.cost) {
      boxTextEl.textContent = "You need " + choice.cost + " " + STORY.currency + " for that. Come back with more!";
      return;
    }
    state.gems = state.gems - choice.cost;
  }

  if (choice.setFlag) {
    state.flags.push(choice.setFlag);
  }

  if (choice.give) {
    addItem(choice.give);
  }

  renderHud();

  if (choice.target === "end") {
    closeBox();
  } else {
    showDialogue(choice.target);
  }
}

// ---------- Keyboard ----------

document.addEventListener("keydown", (event) => {
  // Arrow keys shouldn't scroll the page
  if (event.key.startsWith("Arrow")) {
    event.preventDefault();
  }

  // No walking while the dialogue box is open
  if (state.paused) {
    return;
  }

  let newX = state.x;
  let newY = state.y;

  if (event.key === "ArrowUp") {
    newY = newY - 1;
  } else if (event.key === "ArrowDown") {
    newY = newY + 1;
  } else if (event.key === "ArrowLeft") {
    newX = newX - 1;
  } else if (event.key === "ArrowRight") {
    newX = newX + 1;
  } else {
    return; // some other key: ignore it
  }

  tryMove(newX, newY);
});

// ---------- Start the game ----------

document.title = STORY.title;
titleEl.textContent = STORY.title;
messageEl.textContent = STORY.intro;
findStart();
render();
