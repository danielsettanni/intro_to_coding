# SESSION_2_STEP_BY_STEP.md

## Session 2 — Move the Hero

In Session 1, you typed every tile by hand. In **Session 2**, you'll:

- Draw the map with **letters** in a new file, `world.js`
- **Choose your story**: Pinehill or one of four other adventures
- Have JavaScript **draw the tiles for you**
- Move the hero with the **arrow keys**

After every step, save, refresh, and see what changed.

---

## 🧰 Step 0 — Copy Last Week's Folder (~2 min)

**What this does for you:**
We keep building the **same game** every week. Each week starts from where the last one ended.

1. Make a copy of your `session-1` folder and name it:

   `session-2`

   (Missed last week? Copy the `session-1` folder from the class repo instead.)

2. Open `session-2` in **VS Code**

---

## 🗺️ Step 1 — Create `world.js` (Draw the Map with Letters) (~8 min)

**What this does for you:**
Instead of 140 `<div>`s, the whole map is 10 short lines of letters. Each letter is one tile. This file also holds the basics of your **story**.

1. Create a file named:

   `world.js`

2. Paste this code:

   ```javascript
   // PINEHILL QUEST — the world
   // This file is DATA: it describes what is in your world.
   // game.js reads it and brings it to life.

   // THE STORY — the basics of your adventure.
   const STORY = {
     title: "Pinehill Quest",  // the name of your game
     hero: "🧝",  // what the hero looks like
     intro: "Grandma is expecting you! Use the arrow keys to explore.",  // the first message
     floor: "#4a8f3a"  // the color of empty ground
   };

   // THE MAP — each letter is one tile.
   // Every row must be the SAME length!
   // Look in TILES below to see what each letter means.
   const MAP = [
     "TTTTTTTTTTTTTT",
     "T@...$T$..g.$T",
     "T.E...T.TT...T",
     "T....kT..$.T.T",
     "T.S...D...g..T",
     "T$...hT.TT..hT",
     "TTTTTTT$...$.T",
     "~~~~~~~~~~O~~~",
     "T.....H......T",
     "TTTTTTTTTTTTTT"
   ];

   // TILES — what each letter in the MAP looks like.
   const TILES = {
     ".": { emoji: "" },  // grass
     "@": { emoji: "" },  // where the hero starts
     "T": { emoji: "🌲" },  // tree
     "~": { emoji: "🌊" },  // river
     "$": { emoji: "💎" },  // gem
     "k": { emoji: "🗝️" },  // key
     "D": { emoji: "🚪" },  // forest gate
     "h": { emoji: "💖" },  // heart
     "E": { emoji: "🧙" },  // village elder
     "S": { emoji: "🏪" },  // shop
     "H": { emoji: "🏠" },  // Grandma's house
     "g": { emoji: "👺" },  // goblin
     "O": { emoji: "👹" }  // bridge ogre
   };
   ```

Save. Nothing changes in the browser yet: no page is using `world.js` so far.

💬 **Talk about it:**
- `MAP` is an **array** (a list), written with `[ ]`. Each item in the list is a **string** (text in quotes): one row of the map.
- Squint at the map: can you see the village on the left, the forest on the right, the river near the bottom, and Grandma's house `H` across it?
- `TILES` is an **object**, written with `{ }`. It's like a dictionary: look up a letter, get back what it means.
- `STORY` is an object too. It holds your game's name, the hero's emoji, the first message, and the floor color (`#4a8f3a` is a **hex color**: a code for green).

### 📦 Choose Your Story

Pinehill is just one story this engine can tell. Your teacher will show a **preview** of each story on the big screen. The previews are the **finished** Session 5 games, so they do much more than yours does today. That's where you're headed!

| Story | You are... |
| --- | --- |
| **Pinehill Quest** (the one in these guides) | a traveler visiting Grandma across the river |
| **GLITCH** (`stories/glitch`) | a coder pulled inside a broken video game |
| **Signal Lost** (`stories/signal-lost`) | the last crew member on a damaged space station |
| **The Last Lighthouse** (`stories/lighthouse`) | an islander relighting a lighthouse in cursed fog |
| **The Midnight Heist** (`stories/museum-heist`) | a young detective retaking a museum from thieves |

Picked a different story? Paste the contents of `stories/<your-story>/world-2.js` into your `world.js` **instead of** the Pinehill code above. Everything else in these guides works the same, because **every story uses the same letters** (`T` is always the wall tile, `$` is always money, `O` is always the boss).

You can change your mind later. And you can always invent your own story by editing `STORY`, `MAP`, and `TILES`!

---

## 🌐 Step 2 — Empty the Board in `index.html` (~5 min)

**What this does for you:**
JavaScript is going to draw the tiles now, so we remove the hand-typed ones.

1. In `index.html`, **delete** the `<!-- The map: 6 rows of 6 tiles -->` comment and the whole `<div id="board">...</div>` block (all 6 rows of tiles), and put this in its place:

   ```html
         <!-- game.js draws the map in here -->
         <div id="board"></div>
   ```

2. Give the title an `id` so JavaScript can change it:

   ```html
         <h1 id="title">Pinehill Quest</h1>
   ```

3. Change the message text to:

   ```html
         <p id="message">Use the arrow keys to explore.</p>
   ```

4. Replace the comment and `<script>` line at the bottom with **two** scripts. `world.js` must come first!

   ```html
       <!-- world.js first (the data), then game.js (the rules) -->
       <script src="world.js"></script>
       <script src="game.js"></script>
   ```

5. In `style.css`, delete the `#chest { ... }` rule and its comment. There's no chest to click anymore.

Save and refresh.

✅ **You should see:**
The title and stats, but **no map**: just a thin, empty green strip.

🔍 **DevTools moment:** open the **Console** (F12, or Cmd + Option + J). You'll see a red error, something like:

`Cannot set properties of null (setting 'onclick')   game.js:13`

Our old `game.js` is looking for the chest, and the chest is gone! The error tells you **what** went wrong and **which line**. We'll replace that code next.

---

## ⚙️ Step 3 — Draw the Map with Loops (`game.js`) (~12 min)

**What this does for you:**
Your game engine reads the letters in `MAP` and builds a tile on the page for each one.

**Replace everything** in `game.js` with:

```javascript
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

// ---------- Start the game ----------

document.title = STORY.title;
titleEl.textContent = STORY.title;
messageEl.textContent = STORY.intro;
findStart();
render();
```

Save and refresh.

✅ **You should see:**
The whole world (village, forest, river, and Grandma's house) with your hero 🧝 standing in the top-left corner, and the game's title and first message coming from `STORY`. (Using a story pack? You'll see *your* world, and your hero may start somewhere else.)

💬 **Talk about it:**
- **x and y:** `x` counts **across** (columns), `y` counts **down** (rows). Both start at **0**, not 1! In Pinehill the hero starts at x = 1, y = 1.
- **`MAP[y][x]`** means "go to row `y`, then letter number `x` in that row."
- **The loops:** `for (let y = 0; y < MAP.length; y++)` means "start y at 0, keep going while y is less than the number of rows, add 1 each time." The **inner** loop does the same for x across each row. Together they visit every tile.
- **`function`:** a named set of instructions. `render()` doesn't run when it's written, only when we **call** it at the bottom.
- **`state`:** an object that holds the game's memory. Right now it only remembers where the hero is.
- **`STORY.hero`, `STORY.floor`, `STORY.title`:** the engine never says "elf" or "Pinehill." It reads everything story-related from `world.js`. That's why any story works with the same engine.

🧪 **Try it:** in `world.js`, move the `@` somewhere else on the map, save, and refresh. The hero starts there now!

---

## ⌨️ Step 4 — Move with the Arrow Keys (~10 min)

**What this does for you:**
Brings your hero to life!

1. In `game.js`, **below** the `render` function (above `// ---------- Start the game ----------`), add:

   ```javascript
   // ---------- Moving ----------

   // Try to move the hero to (newX, newY).
   function tryMove(newX, newY) {
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

   ```

Save, refresh, and press the arrow keys. (Click on the page once if nothing happens.)

✅ **You should see:**
The hero walks around! It walks right through trees, gems, and even the goblins. We'll fix that next week.

💬 **Talk about it:**
- `addEventListener("keydown", ...)` means "every time a key is pressed, run this code." `event.key` tells us **which** key.
- Up means **y − 1** (towards the top row), down means **y + 1**.
- Every move, we update `state` and then call `render()` to redraw the whole map. Games do this all the time: **change the state → redraw the screen**.

---

## 🧱 Step 5 — Don't Walk Off the Edge (~5 min)

**What this does for you:**
Fixes a bug. Try it first: walk up off the top of the map. Where did the hero go?

The hero walked to `y = -1`, a row that doesn't exist, so it vanished! Let's add a rule.

In `tryMove`, add the **"Stay inside the map"** part **above** `// Move the hero`:

```javascript
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
```

Save and refresh.

✅ **You should see:**
The hero stops at the edges of the map.

💬 **Talk about it:**
- `||` means **OR**. "If y is less than 0 **or** y is past the last row…"
- `return;` means "stop this function right now." So the lines that move the hero never run.

---

## 🔍 Step 6 — DevTools Detective (~5 min)

**What this does for you:**
Shows you how to spy on your own code and read error messages, the #1 debugging skill.

1. **Watch the hero's position.** Inside `tryMove`, as the very first line, add:

   ```javascript
     console.log("Moving to", newX, newY);
   ```

   Open the **Console** and walk around. You'll see every move's x and y. When you're done, **delete** that line.

2. **Break it on purpose.** In `world.js`, change one `T` in the map to a `Q` (a letter that isn't in `TILES`). Save and refresh.

   The map stops drawing when it reaches the `Q`, and the console shows a red error. In Chrome it looks like:

   `Cannot read properties of undefined (reading 'emoji')   game.js:47`

   `TILES["Q"]` doesn't exist (it's **undefined**), so there's no emoji to read. Change the `Q` back to `T` and everything works again.

---

## 🧠 What You Learned in Session 2

- A map can be **data**: an array of strings where each letter is a tile
- **Loops** repeat code. Two loops together visit every row and column
- **x and y** describe a position, and they start counting at **0**
- **Keyboard events** let the player control the game
- **if** + **return** let you make rules ("not past the edge!")
- The **change state → redraw** pattern runs the whole game

---

## ✍️ Make It Yours (~10 min)

- Redraw the map in `world.js`: build your own village, maze, or island
- Add a new tile type to `TILES` and use its letter in the map
- Change `hero`, `title`, `intro`, or the `floor` color in `STORY`

## ⭐ Stretch

- Make **W A S D** work as well as the arrow keys
- Show the hero's position in the message line on every move (hint: `messageEl.textContent = ...`)

---

## 🆘 If Something Doesn't Work

Check:

- `world.js` is loaded **before** `game.js` in `index.html`
- Every row of `MAP` is the same length and ends with a comma (except the last)
- Every letter in `MAP` exists in `TILES`
- `{ }` and `( )` are matched in `game.js`. VS Code highlights the partner when you click next to one
- The DevTools **Console** for red errors (click the file name in the error to jump to the line)

Ask for help: that's part of learning.

Always follow your family's rules when using the internet.

You've completed Session 2 🎉
