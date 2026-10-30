# Intro to Coding

## Session 3 — Walls, Treasure, and Keys

Welcome to **Session 3** of *Intro to Coding*!

In Session 2, the hero learned to walk, but it walks straight through trees, rivers, and goblins, and the gems are just decoration.

In **Session 3**, we give the world **rules** and give the game **memory**:

- Trees, rivers, and people **block** the hero
- Stepping on a 💎 **collects** it, and the gem counter goes up
- The 🗝️ key goes into your **backpack**
- The 🚪 forest gate stays **locked** until you have the key

By the end of this session, Pinehill Quest is a real puzzle: find the key, open the gate, and explore the forest.

---

## 🎯 What Students Will Do in Session 3

In this session, students will:

- Give tiles **properties** in `world.js` (`solid`, `gems`, `item`, `needs`)
- Write **functions with parameters** (`getTile(x, y)`, `setTile(x, y, letter)`)
- Grow the game's **state** to remember gems and an inventory
- Give your story its own **currency** (gems, coins, shells…)
- Use **if / else** to decide what happens when the hero steps on a tile
- Show the backpack on screen

---

## 🧠 Concept Card

| Idea | What it means |
| --- | --- |
| **if / else** | "If you have the key, open the gate. Otherwise, say it's locked." |
| **Functions with parameters** | `getTile(x, y)` works for *any* x and y you give it, and **returns** an answer |
| **State** | The game's memory: where you are, how many gems you have, what's in your backpack |
| **Arrays** | `inventory` is a list. `push` adds to it, `includes` checks if something is in it |

The big idea: **data-driven rules.** The engine doesn't know what a "tree" is. It only knows "solid tiles block you." You decide which tiles are solid in `world.js`.

---

## 📁 Files in This Folder

- `index.html` → The page (now with a backpack line)
- `style.css` → How it looks
- `world.js` → The map, plus **what each tile does** (solid, gems, items, locks)
- `game.js` → The engine: drawing, moving, and now **the rules**

---

## ▶️ How to Run the Project

### Option 1: Open in a Browser

- Double-click `index.html`

### Option 2: VS Code + Live Server

1. Open this `session-3` folder in **VS Code**
2. Right-click `index.html`
3. Choose **"Open with Live Server"**

**Goal:** collect gems, find the key 🗝️ in the village, unlock the forest gate 🚪, and explore the forest.

---

## ⏱️ Session Plan (90 minutes)

| Time | What we do |
| --- | --- |
| 0:00 – 0:05 | Recap: data vs. rules, loops, x and y |
| 0:05 – 0:15 | Concept Card: if/else, state, and tile properties |
| 0:15 – 1:00 | Live build: follow `STEP_BY_STEP.md` |
| 1:00 – 1:10 | Make it yours: design a key-and-lock puzzle |
| 1:10 – 1:30 | Questions |

---

## ✍️ Make It Yours

All of these happen in **`world.js`**. No engine changes needed!

- Make a **big gem** worth 5: `"G": { emoji: "💰", gems: 5, message: "Jackpot!" }`
- Add a **new item** and a **new lock**:

```js
"m": { emoji: "🪓", item: "axe", message: "You found an axe!" },
"t": { emoji: "🌳", needs: "axe", message: "You chop down the tree.", lockedMessage: "This tree is too thick to pass." },
```

- Change the messages to match your story

✅ Tip: an item's name (`item: "axe"`) and a lock's need (`needs: "axe"`) must match **exactly**.

---

## ⭐ Stretch Goals (for returning or speedy students)

- **Secret wall:** a tile that *looks* like a tree but isn't solid
- **Use it up:** make the key disappear from the backpack after it opens the gate (hint: look up `indexOf` and `splice` on MDN)
- Make the message line say "Ouch, a tree!" when you bump into something solid. Should it be the same message for every solid thing? How could each tile have its own?

---

## 🆘 Getting Help

If something doesn't work, check:

- Property names are spelled exactly: `solid`, `gems`, `item`, `needs`, `message`, `lockedMessage`
- Each property ends with a comma, except the last one in `{ }`
- `index.html` has `<p id="inventory">`, and `game.js` looks for `"inventory"`
- The DevTools **Console** for red errors
- Type `state` in the Console to see what the game remembers

For extra learning, we recommend trusted, beginner-friendly resources like:

- MDN Web Docs (Mozilla)
- freeCodeCamp
- W3Schools

**Important Note for Students:**
**Always follow your family's rules and expectations when using the internet.** If you're unsure whether a website is okay to use, please check with a parent or guardian first.

---

## 🚀 What's Next?

The elder 🧙 and the shop 🏪 are just standing there. In **Session 4**, they come to life:

- Bump into a character to open a **dialogue box** and talk
- **Spend gems** at the shop on a sword 🗡️ and shield 🛡️
- Your **attack** and **defense** stats go up

Nice work: your world has rules now! 🎉
