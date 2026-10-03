// PINEHILL QUEST — the game engine
// This file holds the RULES of the game.
// The world itself (the map and everything in it) lives in world.js.

// 1) Find the parts of the page we will change
const boardEl = document.getElementById("board");
const messageEl = document.getElementById("message");
const titleEl = document.getElementById("title");

// 2) The game's memory (called "state")
const state = {
  x: 0,
  y: 0
};

// ---------- Reading the map ----------

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
        const letter = MAP[y][x];
        tileEl.textContent = TILES[letter].emoji;
      }

      boardEl.appendChild(tileEl);
    }
  }
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
