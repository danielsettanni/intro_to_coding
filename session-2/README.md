# Intro to Coding

## Session 2 — Move the Hero

Welcome to **Session 2** of *Intro to Coding*!

In Session 1, we typed every tile of the map by hand: 36 `<div>`s for a tiny 6×6 world. Imagine typing a map with 1,000 tiles!

In **Session 2**, we work smarter:

- We **describe the map as data**: a few lines of letters, where each letter is one tile
- JavaScript **draws the map for us** using loops
- The **arrow keys** move the hero 🧝 around the world

By the end of this session, you'll be walking your hero around a 14×10 world that you can redraw just by typing letters.

You'll also **choose your story**. Stick with Pinehill, or pick one of four story packs: a coder trapped in a broken video game, a space station survivor, a lighthouse in cursed fog, or a museum heist. They all use the same engine.

---

## 🎯 What Students Will Do in Session 2

In this session, students will:

- Create `world.js`, where the map is drawn with letters (`T` = tree, `~` = river…)
- **Choose a story**: Pinehill, or one of four story packs in `stories/`
- Write a `render()` function that turns those letters into tiles on the page
- Use **variables** to remember where the hero is (`x` and `y`)
- Listen for **keyboard events** so the arrow keys move the hero
- Use an **if** statement to stop the hero walking off the edge of the world

---

## 🧠 Concept Card

| Idea | What it means |
| --- | --- |
| **Arrays and strings** | A list of things in order. Our map is a list of rows, and each row is a string of letters |
| **Loops** | Code that repeats. One loop goes down the rows, another goes across each row |
| **Variables and objects** | `state.x` and `state.y` remember where the hero is standing |
| **Keyboard events** | Code that runs when a key is pressed |
| **if** | Only do something when a rule is true ("only move if you're still on the map") |

The big idea: **data vs. rules.** `world.js` is the *data* (what the world looks like). `game.js` is the *rules* (how the game works). Change the data and the same rules still work.

---

## 📁 Files in This Folder

- `index.html` → The page (the map area is now empty: JavaScript fills it in)
- `style.css` → How it looks
- `world.js` → **New!** The story, the map, and what each letter means
- `game.js` → The game engine: draws the map and moves the hero

---

## ▶️ How to Run the Project

### Option 1: Open in a Browser

- Double-click `index.html`

### Option 2: VS Code + Live Server

1. Open this `session-2` folder in **VS Code**
2. Right-click `index.html`
3. Choose **"Open with Live Server"**

Then press the **arrow keys** to move. (If nothing happens, click on the page once first.)

---

## ⏱️ Session Plan (90 minutes)

| Time | What we do |
| --- | --- |
| 0:00 – 0:05 | Recap: HTML, CSS, JS, and the chest click |
| 0:05 – 0:15 | Concept Card: drawing a map with letters, and loops. Demo each story preview (`stories/*/index.html` in the instructor repo); students pick one |
| 0:15 – 1:00 | Live build: follow `STEP_BY_STEP.md` |
| 1:00 – 1:10 | Make it yours: redraw the map |
| 1:10 – 1:30 | Questions |

---

## ✍️ Make It Yours

Most of your changes today happen in **`world.js`**.

- **Redraw the map.** Move the trees, make a lake, build a maze
- **Move the start.** Wherever you put the `@` is where the hero begins
- **Add a new kind of tile.** Pick a letter, add it to `TILES` with an emoji, then use it in the map:

```js
"F": { emoji: "🌸" },  // flowers
```

- Change the hero, title, first message, or floor color in `STORY`

✅ Tip: every row of the map must be the **same length**, and every letter in the map must exist in `TILES`.

---

## ⭐ Stretch Goals (for returning or speedy students)

- Make **W A S D** move the hero too (hint: `event.key === "w"`)
- Make the map **bigger**. Does everything still work? Why?
- Show the hero's position in the message line: `"You are at 3, 4"`

---

## 🆘 Getting Help

If something doesn't work, check:

- `index.html` loads `world.js` **before** `game.js`
- Every row in `MAP` has the same number of letters
- Every letter in `MAP` is in `TILES` (capital letters matter: `T` is not `t`)
- Every row in `MAP` ends with a comma, except the last one
- The DevTools **Console** for red errors

For extra learning, we recommend trusted, beginner-friendly resources like:

- MDN Web Docs (Mozilla)
- freeCodeCamp
- W3Schools

**Important Note for Students:**
**Always follow your family's rules and expectations when using the internet.** If you're unsure whether a website is okay to use, please check with a parent or guardian first.

---

## 🚀 What's Next?

Right now the hero can walk through trees and rivers, and the gems don't do anything. In **Session 3**, we add **rules**:

- Trees and rivers **block** the hero
- Stepping on a 💎 **collects** it
- The 🚪 forest gate is **locked** until you find the 🗝️ key

Nice work: you built a game engine that can draw any world you type! 🎉
