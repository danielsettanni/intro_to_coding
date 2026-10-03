# Intro to Coding

## Pinehill Quest: Build a Top-Down Adventure Game

This repository contains a beginner-friendly **top-down adventure game** built with **HTML, CSS, and JavaScript**.

The project is part of *Intro to Coding*, a class for ages 11–18 where students learn the basics of coding by building a game they can play and share. No prior programming experience is required.

> 📦 **Looking for last semester's Choose Your Own Adventure project?** It's saved under the git tag `semester-1` (`git checkout semester-1`).

---

## 🎮 What This Project Is

Students build **Pinehill Quest**, a game where:

- A hero 🧝 walks around a map with the **arrow keys**
- The map is drawn from **letters typed in a data file**: change the letters, change the world
- Trees and rivers block the way, gems 💎 can be collected, and a locked gate 🚪 needs a key 🗝️
- Villagers 🧙 **talk** with branching choices, and the shop 🏪 sells gear
- Goblins 👺 and a Bridge Ogre 👹 fight back in **dice battles** 🎲
- The boss has **three ways past it**, and your earlier choices decide which of **three endings** you get
- Don't love Grandma's house? Choose one of **four other stories** (see [Story Packs](#-story-packs))

It's **one game that grows every week**, with a working, playable version at the end of **every session**.

---

## 🧠 What Students Learn

Through this project, students learn:

- Basic **HTML** for structure and **CSS** (including grid) for style
- Core **JavaScript**: variables, if/else, loops, functions, arrays, and objects
- **Events**: clicks and key presses
- How to separate **data** (`world.js`) from **rules** (`game.js`)
- How games track **state** (position, gems, inventory, hearts) and **remember choices** (flags)
- How to **debug** with the browser's DevTools

---

## 🆘 Getting Help (Trusted Learning Resources)

**Important Note for Students:**  
When using any websites or online resources, always follow your family’s rules and expectations for internet use. If you’re ever unsure whether a site is okay to use, please check with a parent or guardian first. Learning to code should always be safe, comfortable, and respectful of your household’s guidelines.

Learning to code means looking things up — **everyone does it**, including professional developers. When you need help, it’s important to use **reliable, beginner-friendly resources**.

The websites below are run by **public, non-profit organizations** or long-standing educational groups and are safe, accurate, and free.

---

### 🌐 HTML (Structure of Web Pages)

**MDN Web Docs (Mozilla)**

- [https://developer.mozilla.org](https://developer.mozilla.org)
- Run by Mozilla, a non-profit organization
- Clear explanations and examples
- Used by students, teachers, and professionals

Recommended starting points:

- HTML Basics
- Elements and tags
- Links, images, and buttons

---

### 🎨 CSS (Styling and Layout)

**MDN Web Docs (Mozilla)**

- [https://developer.mozilla.org](https://developer.mozilla.org)
- Great explanations of colors, fonts, spacing, and layout
- Examples you can copy and experiment with

Recommended topics:

- CSS basics
- Colors and fonts
- Flexbox and Grid (both used for layouts in this project)

---

### ⚙️ JavaScript (Making Pages Interactive)

**MDN Web Docs (Mozilla)**

- [https://developer.mozilla.org](https://developer.mozilla.org)
- Excellent reference for JavaScript basics
- Explains how buttons, events, and variables work

Recommended topics:

- Variables
- Functions
- Events (like button clicks)
- Arrays and objects

---

### 📘 Beginner-Friendly Courses and References

**freeCodeCamp**

- [https://www.freecodecamp.org](https://www.freecodecamp.org)
- Non-profit organization
- Interactive lessons for HTML, CSS, and JavaScript
- Great for extra practice outside of class

**W3Schools**

- [https://www.w3schools.com](https://www.w3schools.com)
- Easy-to-read tutorials and examples
- Good for quick explanations and trying things out

---

### ✅ Tips for Getting Help Successfully

- Search for **one small question at a time**
- Read examples and try them in your own code
- If something doesn’t work, check:
  - spelling
  - punctuation
  - matching `{ }`, `( )`, and quotes
- It’s okay to ask for help — learning to debug is part of coding!

---

### 🚫 What to Avoid

- Copying large blocks of code without understanding them
- Random blogs or videos that don’t explain *why* something works
- Feeling stuck and giving up — ask for help instead!

---

Learning to code is a journey. These resources are here to help you learn safely, clearly, and confidently.

---

## 📚 Course Structure (5 Sessions)

Each session builds on the previous one. Each `session-N/` folder contains the complete, working game **as it exists at the end of that session**, plus:

- `README.md`: what we'll learn, a Concept Card, timing, and ideas to make it your own
- `STEP_BY_STEP.md`: the exact steps we follow live in class

| Session | Title | You build | Key concepts |
| --- | --- | --- | --- |
| [1](./session-1/) | Draw Your World | A web page with an emoji map and a clickable treasure chest | HTML tags, ids & classes, CSS grid, click events |
| [2](./session-2/) | Move the Hero | A map drawn from data, and arrow-key movement | Arrays & strings, loops, x/y, keyboard events |
| 3 *(coming soon)* | Walls, Treasure, and Keys | Solid tiles, gem collecting, a backpack, a locked gate | if/else, functions with parameters, state |
| 4 *(coming soon)* | Talk and Trade | A dialogue box, conversations, a shop, and a secret | Objects as data, reusable engines, math, flags |
| 5 *(coming soon)* | Monsters, Choices, and Endings | Dice battles, a boss with three solutions, three endings, publishing | Random numbers, branching stories, game balance |

Every session also includes a **DevTools moment**, a **Make It Yours** section, and **⭐ Stretch** goals for returning or speedy students.

### ⏱️ Session Format (90 minutes)

| Time | What we do |
| --- | --- |
| 5 min | Recap last week |
| 10 min | Concept Card (README) |
| 45 min | Live build (STEP_BY_STEP) |
| 10 min | Make it yours |
| 20 min | Questions |

### 🧑‍🎓 Catching Up

Missed a week? Copy the previous session's folder from this repo and start from there. Each STEP_BY_STEP begins from the end of the last session.

---

## 📦 Story Packs

Pinehill Quest is the story used in the guides, but the engine can tell any story. The [`stories/`](./stories/) folder has four more, and students pick one in Session 2:

| Story | You are... |
| --- | --- |
| **GLITCH** | a coder pulled inside a broken video game |
| **Signal Lost** | the last crew member on a damaged space station |
| **The Last Lighthouse** | an islander relighting a lighthouse in cursed fog |
| **The Midnight Heist** | a young detective retaking a museum from thieves |

Every story uses the **same letters for the same roles** (`T` is always a wall, `O` is always the boss), so every step in every guide works for every story. Each story also includes a finished `world.js` for the end of each session, so students can always catch up. See [`stories/README.md`](./stories/README.md).

---

## 📁 Project Structure (Inside Each Session Folder)

- `index.html`: the page (HUD, map area, messages, dialogue box)
- `style.css`: how it looks
- `world.js`: **the data**: story, map, tiles, items, conversations, monsters, endings (from Session 2)
- `game.js`: **the rules**: the game engine

No build tools, no servers, no downloads: just files.

---

## ▶️ How to Run the Game

### Option 1: Open in a Browser

- Double-click `index.html` in any session folder (Chrome, Edge, Firefox, or Safari)

### Option 2: Using Live Server

1. Open a session folder in **VS Code**
2. Right-click `index.html`
3. Select **"Open with Live Server"**

Use the **arrow keys** to move (click the page once if nothing happens).

---

## ✍️ Customizing the Game

Most changes happen in **`world.js`**. To change the world, change the letters in the map:

```js
const MAP = [
  "TTTTTTTTTT",
  "T@..$..k.T",
  "T..~~~...T",
  "T....E..DT",
  "TTTTTTTTTT"
];
```

To add a new kind of tile, give it a letter in `TILES`:

```js
"F": { emoji: "🌸" },  // flowers
"P": { emoji: "🧪", hearts: 5, message: "A potion! Fully healed." },  // potion
```

See `session-5/MAKE_IT_YOURS.md` *(coming soon)* for the full guide.

---

## 🚀 Sharing Your Game

This project can be published for free using GitHub Pages, allowing students to share their game with friends and family.

### 🌍 Publish with GitHub Pages (Free)

> Do this with a parent/guardian or teacher.

1. Create a GitHub account (or use an approved account).
2. Create a new repository and upload your project files.
3. Make sure your game files are in the repository (at minimum: `index.html`, `style.css`, `world.js`, `game.js`).
4. In GitHub, open your repository:
   - Go to **Settings** → **Pages**
   - Under **Build and deployment**, set:
     - **Source:** Deploy from a branch
     - **Branch:** `main` (or `master`)
     - **Folder:** `/ (root)`
5. Click **Save**.
6. Wait 1–3 minutes, then refresh the Pages settings.
7. Open the published URL GitHub provides.

✅ Tip: If you are publishing a specific session, upload only that session’s files at repo root, or use a dedicated repository for that session.

### 🛠 If it doesn’t work

- Confirm `index.html` is named exactly `index.html`
- Confirm file names and capitalization match exactly
- Wait a minute and refresh (first deploy can take a moment)
- Check repository is public (or GitHub plan supports private Pages)

---

## 🎓 About the Class

Intro to Coding teaches programming through creativity and games.
Students don't just learn code: they build something meaningful and fun.

---

Enjoy building your adventure!
