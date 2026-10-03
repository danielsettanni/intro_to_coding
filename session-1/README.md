# Intro to Coding

## Session 1 — Draw Your World

Welcome to **Session 1** of *Intro to Coding*!

This semester we're building **Pinehill Quest**: a top-down adventure game where a hero walks around a map, finds treasure, unlocks gates, talks to villagers, buys gear, and battles monsters on the way to Grandma's house. Your choices decide which of three endings you get.

Not feeling Grandma's house? In Session 2 you can switch to a different story: a broken video game, a space station, a haunted lighthouse, or a museum heist.

Today we build the **first screen** of that game. By the end of class you'll have a colorful map on a web page, and clicking the treasure chest will give you a gem.

No prior coding experience is needed.

---

## 🎯 What Students Will Do in Session 1

In this session, students will:

- Build a web page with **HTML** (the title, the stats bar, and a 6×6 map of tiles)
- Use **CSS** to turn a long list of tiles into a real game map
- Write their first **JavaScript** so clicking the chest finds a gem
- Use the browser's **DevTools** to see messages from their code

Students will leave with something they can **open, click, and show**.

---

## 🧠 Concept Card

| Idea | What it means |
| --- | --- |
| **HTML tags** | Labels like `<h1>` and `<div>` that tell the browser what each part of the page *is* |
| **id and class** | Names for parts of the page. An `id` names **one** thing, a `class` names **many** things |
| **CSS grid** | A way to lay boxes out in rows and columns, like a game board |
| **Click events** | JavaScript code that runs when someone clicks something |

The big idea: **HTML** is what's on the page, **CSS** is how it looks, **JavaScript** is what it does.

---

## 📁 Files in This Folder

- `index.html` → The page: title, stats, and the map tiles
- `style.css` → How it looks: colors, the grid, the tiles
- `game.js` → What happens when you click the chest
- `getting_started/` → An optional warm-up (three tiny web pages) for anyone brand new to HTML

---

## ▶️ How to Run the Project

### Option 1: Open in a Browser

- Double-click `index.html`
  (Chrome, Edge, Firefox, or Safari all work)

### Option 2: VS Code + Live Server

1. Open this `session-1` folder in **VS Code**
2. Right-click `index.html`
3. Choose **"Open with Live Server"**

Once it's open, click the 📦 treasure chest.

---

## ⏱️ Session Plan (90 minutes)

| Time | What we do |
| --- | --- |
| 0:00 – 0:05 | Welcome, and a sneak peek: the teacher plays the finished game (from the instructor repo) on screen |
| 0:05 – 0:15 | Concept Card: HTML, CSS, JavaScript, and what they each do |
| 0:15 – 1:00 | Live build: follow `STEP_BY_STEP.md` |
| 1:00 – 1:10 | Make it yours |
| 1:10 – 1:30 | Questions |

---

## ✍️ Make It Yours

- Change the emoji on the map. Try 🌵 for a desert, or 🍄 for a mushroom forest
- Rename the game in the `<h1>` and the `<title>`
- Change the colors in `style.css`
- Change the message that appears when you open the chest

There are no wrong worlds: creativity is part of the learning.

---

## ⭐ Stretch Goals (for returning or speedy students)

- Right now you can click the chest over and over for infinite gems. Use an `if` so it only gives a gem the **first** time. (Hint: check `if (gems === 0)`.)
- Make a second tile clickable, like the 🧙 saying hello in the message line
- Make the map bigger: add a 7th row and column (you'll need to change the CSS too!)

---

## 🆘 Getting Help

It's normal to get stuck while learning to code. Even professionals do!

If something doesn't work, check:

- Spelling and capitalization (`game.js` is not the same as `Game.js`)
- Every tag you opened is closed (`<div>` needs a `</div>`)
- The `id` in your HTML matches the `id` in your JavaScript exactly
- You saved the file and refreshed the browser
- The DevTools **Console** for red error messages

For extra learning, we recommend trusted, beginner-friendly resources like:

- MDN Web Docs (Mozilla)
- freeCodeCamp
- W3Schools

**Important Note for Students:**
**Always follow your family's rules and expectations when using the internet.** If you're unsure whether a website is okay to use, please check with a parent or guardian first.

---

## 🚀 What's Next?

In **Session 2**, the hero comes to life:

- We'll **describe the map as data** instead of typing every tile
- JavaScript will **draw the map for us** using loops
- The **arrow keys** will move the hero 🧝 around
- You'll **choose your story**: Pinehill, or one of four story packs

For now, if you can click the chest and see your gem count go up: **you did it!** 🎉
