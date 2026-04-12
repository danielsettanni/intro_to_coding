# Intro to Coding

## Session 3 — Add Game Memory (State + Inventory)

Welcome to **Session 3** of *Intro to Coding*!

In Session 2, students built a story engine that could move between pages automatically.  
In **Session 3**, we level up again by giving the game **memory**.

This means the game can remember things like:

- What item the player has picked up
- Whether a choice should be locked or unlocked
- What has happened earlier in the story

By the end of this session, students will have a playable story where choices can depend on what the player has collected.

---

## 🎯 What Students Will Do in Session 3

In this session, students will:

- Create a **state object** to store game memory
- Track an **inventory item**
- Unlock a choice only when the player has the correct item
- Update the page so players can see what they are carrying
- Keep story content separate from the engine code

Students will leave with something they can **play, test, and expand into a bigger game**.

---

## 📁 Files in This Folder

Session 3 uses **four files**:

- `index.html` → The webpage layout
- `style.css` → How the page looks
- `story.js` → The story content (pages + choices + item rules)
- `script.js` → The story engine (tracks state + unlocks choices)

---

## ▶️ How to Run the Project

### Option 1: Using VS Code + Live Server (Recommended)

1. Open this `session-3` folder in **VS Code**
2. Right-click `index.html`
3. Select **“Open with Live Server”**

### Option 2: Open in a Browser

- Double-click `index.html` to open it in any modern browser  
  (Chrome, Edge, Firefox, or Safari)

---

## ✍️ Customizing the Story

Most story changes happen in **`story.js`**.

In Session 3, choices can do more than just move to a new page.

A choice can include:

- `text` → what the button says
- `target` → where the choice goes
- `giveItem` → an item the player receives
- `requiredItem` → an item the player must already have

Example choices:

```js
{ text: "Pick up the silver key", target: "path", giveItem: "silver key" }

{ text: "Open the gate", target: "gate", requiredItem: "silver key" }
```

✅ Tip: If a choice should only appear after collecting something, make sure the `requiredItem` name matches exactly.

---

## 🧠 Big Ideas from Session 3

This session introduces:

- **State** as the game’s memory
- **Inventory** as stored information
- **Conditional choices** that only appear when rules are met
- **Reusable code** that can handle many items and pages

---

## 🆘 Getting Help

If something doesn’t work, check:

- File names match exactly (`story.js`, `script.js`, etc.)
- IDs match exactly between HTML and JavaScript
- You saved your files and refreshed the page
- A `requiredItem` matches the item name given earlier
- A `target` name exists as a node in `story.js`

For extra learning, we recommend trusted, beginner-friendly resources like:

- MDN Web Docs (Mozilla)
- freeCodeCamp
- W3Schools

Important Note for Students:  
Always follow your family’s rules and expectations when using the internet. If you’re unsure whether a website is okay to use, check with a parent or guardian first.

---

## 🚀 What’s Next?

After Session 3, students are ready to keep growing their game by adding:

- More inventory items
- More locked paths and secret choices
- Win/lose endings
- Character stats or score

Nice work — you’re building a game that can remember what the player has done 🎉
