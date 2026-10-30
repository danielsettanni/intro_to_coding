// PINEHILL QUEST — the game engine
// This file holds the RULES of the game.
// The world itself (the map and everything in it) lives in world.js.

// 1) Find the parts of the page we will change
const boardEl = document.getElementById("board");
const messageEl = document.getElementById("message");
const titleEl = document.getElementById("title");
const gemsEl = document.getElementById("gems");
const inventoryEl = document.getElementById("inventory");

// 2) The game's memory (called "state")
const state = {
  x: 0,
  y: 0,
  gems: 0,
  inventory: []
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

// Put an item in the backpack.
function addItem(name) {
  state.inventory.push(name);
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

// ---------- Keyboard ----------

document.addEventListener("keydown", (event) => {
  // Arrow keys shouldn't scroll the page
  if (event.key.startsWith("Arrow")) {
    event.preventDefault();
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
