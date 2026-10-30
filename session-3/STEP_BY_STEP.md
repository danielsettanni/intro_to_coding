# SESSION_3_STEP_BY_STEP.md

## Session 3 — Walls, Treasure, and Keys

In Session 2, you built an engine that draws the map and moves the hero. In **Session 3**, you'll add **rules**:

- Solid tiles block the hero
- Gems get collected
- The key goes into a backpack
- The gate only opens if you have the key

After every step, save, refresh, and test it by walking around.

---

## 🧰 Step 0 — Copy Last Week's Folder (~2 min)

1. Make a copy of your `session-2` folder and name it:

   `session-3`

   (Missed last week? Copy `session-2` from the class repo.)

2. Open `session-3` in **VS Code**

---

## 🌲 Step 1 — Solid Tiles Block the Way (~12 min)

**What this does for you:**
No more walking through trees! We'll give some tiles a `solid` property, and teach the engine to respect it.

### 1a. Mark solid tiles in `world.js`

Add `solid: true` to the tree `T`, river `~`, and the five characters/buildings `E S H g O`. Your `TILES` should look like this:

```javascript
const TILES = {
  ".": { emoji: "" },  // grass
  "@": { emoji: "" },  // where the hero starts
  "T": { emoji: "🌲", solid: true },  // tree
  "~": { emoji: "🌊", solid: true },  // river
  "$": { emoji: "💎" },  // gem
  "k": { emoji: "🗝️" },  // key
  "D": { emoji: "🚪" },  // forest gate
  "h": { emoji: "💖" },  // heart
  "E": { emoji: "🧙", solid: true },  // village elder
  "S": { emoji: "🏪", solid: true },  // shop
  "H": { emoji: "🏠", solid: true },  // Grandma's house
  "g": { emoji: "👺", solid: true },  // goblin
  "O": { emoji: "👹", solid: true }  // bridge ogre
};
```

> 📦 **Using a story pack?** Same letters! Add `solid: true` to *your* `T ~ E S H g O` lines and keep your own emoji and words. Stuck? `stories/<your-story>/world-3.js` has the finished version.

### 1b. Add a `getTile` helper in `game.js`

Under `// ---------- Reading the map ----------` (**above** `findStart`), add:

```javascript
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

```

### 1c. Use `getTile` in `render`

In `render`, find:

```javascript
        const letter = MAP[y][x];
        tileEl.textContent = TILES[letter].emoji;
```

and replace those two lines with:

```javascript
        tileEl.textContent = getTile(x, y).emoji;
```

### 1d. Check for solid tiles in `tryMove`

In `tryMove`, **below** the "Stay inside the map" checks and **above** `// Move the hero`, add:

```javascript
  const tile = getTile(newX, newY);

  // Solid tiles block the way
  if (tile.solid) {
    return;
  }

```

Save both files and refresh.

✅ **You should see:**
The hero bumps into trees, the river, and the characters, but can still walk on grass, gems, and the gate.

💬 **Talk about it:**
- `getTile(x, y)` is a **function with parameters**. You hand it an `x` and a `y`, and it **returns** the tile there. We wrote the lookup once, and now we can use it anywhere.
- `if (!tile)` means "if there's **no** tile for this letter." Instead of crashing like last week, we show ❓.
- The engine never says "tree" anywhere. It only knows **solid**. That's what makes it reusable!

---

## 🎒 Step 2 — Give the Game More Memory (~8 min)

**What this does for you:**
Before we can collect things, the game needs somewhere to remember them, and a place on screen to show them.

### 2a. `index.html`: add a backpack line

**Below** the `<p id="message">` line, add:

```html
      <p id="inventory">🎒 empty</p>
```

### 2b. `style.css`: style it

At the **bottom** of `style.css`, add:

```css

#inventory {
  margin: 6px 0 0;
  text-align: center;
  opacity: 0.85;
}
```

### 2c. `game.js`: find the new parts of the page

At the top, **below** the `titleEl` line, add:

```javascript
const gemsEl = document.getElementById("gems");
const inventoryEl = document.getElementById("inventory");
```

### 2d. `game.js`: grow the state

Change `state` so it also remembers gems and an inventory (don't forget the comma after `y: 0`!):

```javascript
const state = {
  x: 0,
  y: 0,
  gems: 0,
  inventory: []
};
```

### 2e. `game.js`: show the state on screen

**Below** the `render` function, add:

```javascript
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

```

Then, at the end of `render` (after the two loops, just before its last `}`), add a blank line and:

```javascript
  renderHud();
```

### 2f. `world.js`: name your money

Gems, coins, power cells, shells... every story has its own money. Add a `currency` line at the end of `STORY` (and put a comma after the `floor` value, before its `//` comment!):

```javascript
  floor: "#4a8f3a",  // the color of empty ground
  currency: "💎"  // what you collect and spend
};
```

> 📦 **Using a story pack?** Add the `currency` line with *your* story's money (🪙, ⚡, 🐚, 💵…). Stuck? `stories/<your-story>/world-3.js` has the finished version.


Save everything and refresh.

✅ **You should see:**
A **🎒 empty** line under the map. Nothing else changes yet. We're getting ready!

💬 **Talk about it:**
- `inventory: []` is an **empty array**: a list with nothing in it yet.
- `state.inventory.length` is how many things are in the list.
- `join(", ")` glues a list into one piece of text: `["key", "map"]` → `"key, map"`.
- `STORY.currency + " " + state.gems` builds text like `💎 0`. The engine doesn't care which emoji your story uses.

---

## 💎 Step 3 — Collect Gems (~8 min)

**What this does for you:**
Stepping on a gem adds it to your counter, and the gem disappears from the map.

### 3a. `world.js`: gems are worth 1

Change the gem tile to:

```javascript
  "$": { emoji: "💎", gems: 1, message: "You found a gem! 💎" },  // gem
```

> 📦 **Using a story pack?** Same letters! Make this change to *your* line and keep your own emoji and words. Stuck? `stories/<your-story>/world-3.js` has the finished version.


### 3b. `game.js`: a way to change the map

Under `getTile` (still above `findStart`), add:

```javascript
// Change the letter at (x, y). Example: setTile(3, 2, ".") turns it into grass.
function setTile(x, y, letter) {
  const row = MAP[y];
  MAP[y] = row.slice(0, x) + letter + row.slice(x + 1);
}

```

### 3c. `game.js`: pick up gems in `tryMove`

**Below** the solid check and **above** `// Move the hero`, add:

```javascript
  // Treasure!
  if (tile.gems) {
    state.gems = state.gems + tile.gems;
    setTile(newX, newY, ".");
    showMessage(tile.message);
  }

```

Save and refresh. Walk onto the nearest gem.

✅ **You should see:**
The gem disappears, the counter says **💎 1**, and the message says "You found a gem! 💎"

💬 **Talk about it:**
- `setTile` swaps one letter in a row. `slice(0, x)` is "everything **before** x", and `slice(x + 1)` is "everything **after** x". We glue them back together with the new letter in the middle.
- Turning the gem into `"."` (grass) is how the gem "disappears". The engine just redraws whatever the map says!

---

## 🗝️ Step 4 — Pick Up the Key (~6 min)

**What this does for you:**
Some things go in your backpack instead of a counter.

### 4a. `world.js`: the key is an item

Change the key line to:

```javascript
  "k": { emoji: "🗝️", item: "key", message: "You found a rusty key! 🗝️" },  // key
```

> 📦 **Using a story pack?** Same letters! Make this change to *your* line and keep your own emoji and words. Your item can have its own name, like `"keycard"`. Stuck? `stories/<your-story>/world-3.js` has the finished version.


### 4b. `game.js`: backpack helpers

**Below** `findStart` (above `// ---------- Drawing ----------`), add a new section:

```javascript
// ---------- Items ----------

// Is this item in the backpack?
function hasItem(name) {
  return state.inventory.includes(name);
}

// Put an item in the backpack.
function addItem(name) {
  state.inventory.push(name);
}

```

### 4c. `game.js`: pick up items in `tryMove`

Right **after** the gems `if` block (still above `// Move the hero`), add:

```javascript
  if (tile.item) {
    addItem(tile.item);
    setTile(newX, newY, ".");
    showMessage(tile.message);
  }
```

Save and refresh. Find the key in the village.

✅ **You should see:**
The key disappears from the map, and the backpack says **🎒 key**.

---

## 🚪 Step 5 — Lock the Forest Gate (~8 min)

**What this does for you:**
Your first real puzzle: the forest is closed until you find the key.

### 5a. `world.js`: the gate needs a key

Replace the gate line with this (it's long, so we spread it over several lines):

```javascript
  "D": {  // forest gate
    emoji: "🚪",
    needs: "key",
    message: "You unlock the forest gate with the rusty key.",
    lockedMessage: "The forest gate is locked. Maybe the key is somewhere in the village..."
  },
```

> 📦 **Using a story pack?** Same letters! Make this change to *your* line and keep your own emoji and words. Make sure `needs` matches your key's `item` name exactly. Stuck? `stories/<your-story>/world-3.js` has the finished version.


### 5b. `game.js`: check locks in `tryMove`

Right **after** `const tile = getTile(newX, newY);` and **above** the solid check, add:

```javascript
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

```

### 5c. `world.js`: write down what the properties mean

Replace the comment above `const TILES` with this guide, so you (and anyone else) can remember the rules:

```javascript
// TILES — what each letter in the MAP means.
//   emoji:         what it looks like
//   solid:         true = you can't walk through it
//   gems:          how many gems you get for stepping on it
//   item:          an item you pick up by stepping on it
//   needs:         an item you must have to get through
//   message:       what to say when you pick it up or open it
//   lockedMessage: what to say when you don't have what it needs
```

Save and refresh. **Test both ways:**

1. Walk to the gate **without** the key.
2. Get the key, then walk to the gate again.

✅ **You should see:**
1. "The forest gate is locked…" and the hero doesn't move.
2. "You unlock the forest gate…": the gate disappears and you can explore the forest!

💬 **Talk about it:**
- **if / else:** **if** you have the item, open it. **Otherwise** (`else`), show the locked message and `return`.
- `includes` checks the backpack list: `["key"].includes("key")` is `true`.

---

## 🔍 Step 6 — DevTools: Look Inside the Game's Memory (~5 min)

1. Open the **Console**, type `state`, and press **Enter**. Click the little arrow to expand it. You can see `x`, `y`, `gems`, and `inventory`!
2. Pick up a gem, then type `state` again. The numbers changed.
3. **Cheat code time:** type `state.gems = 99` and press Enter, then take one step onto an open tile. Your HUD shows 99 gems! (Every real game developer has a cheat code for testing.)
4. Remember last week's `Q` crash? Put a `Q` in the map again. Now you get a ❓ tile and a friendly console message instead of a crash, thanks to `getTile`. (The message repeats every time the map redraws.) Change it back afterwards.

---

## 🧠 What You Learned in Session 3

- **Tile properties** in `world.js` decide how the world behaves
- **Functions with parameters** do one job for any input you give them
- **if / else** chooses between two paths
- **State** remembers numbers (`gems`) and lists (`inventory`)
- **Arrays** have helpers: `push`, `includes`, `join`, `length`
- The **Console** can show (and change!) the game's state

---

## ✍️ Make It Yours (~10 min)

- Design your own lock-and-key puzzle with a new item and a new `needs`
- Add a 💰 tile worth 5 gems
- Rewrite the messages in your own words

## ⭐ Stretch

- Make a **secret passage**: a tile that looks like a tree 🌲 but isn't solid
- Make the key get **used up** when it opens the gate

---

## 🆘 If Something Doesn't Work

Check:

- Commas! Every property in `{ }` is followed by a comma, except the last. Every tile line ends with a comma, except the last
- Property names match exactly between `world.js` and `game.js` (`lockedMessage`, not `lockedmessage`)
- The item name and the `needs` match exactly (`"key"` and `"key"`)
- New code went **inside** `tryMove`, above `// Move the hero`
- The DevTools **Console** for red errors

Ask for help: that's part of learning.

Always follow your family's rules when using the internet.

You've completed Session 3 🎉
