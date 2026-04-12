# Intro to Coding

## Session 2 — Build a Story Engine (Branching Adventure)

Welcome to **Session 2** of *Intro to Coding*!

In Session 1, students built a simple interactive story where clicking buttons changed the text.  
In **Session 2**, we level up by building a **story engine** so the story can have many pages and branch in different directions.

By the end of this session, students will have a playable Choose Your Own Adventure story with multiple pages and choices.

---

## 🎯 What Students Will Do in Session 2

In this session, students will:
- Store story content in a separate file (`story.js`)
- Use JavaScript to load “story pages” and generate buttons automatically
- Jump between pages when a player clicks a choice
- Learn how to keep story content separate from the “engine” code

Students will leave with something they can **run, click through, and keep expanding**.

---

## 📁 Files in This Folder

Session 2 uses **four files**:

- index.html   → The webpage layout
- style.css    → How the page looks
- story.js     → The story content (pages + choices)
- script.js    → The story engine (loads pages + creates buttons)

---

## ▶️ How to Run the Project

### Option 1: Using VS Code + Live Server (Recommended)
1. Open this `session-2` folder in **VS Code**
2. Right-click `index.html`
3. Select **“Open with Live Server”**

### Option 2: Open in a Browser
- Double-click `index.html` to open it in any modern browser  
  (Chrome, Edge, Firefox, or Safari)

---

## ✍️ Customizing the Story

Most story changes happen in **`story.js`**.

A story is made of **nodes** (pages). Each node has:
- `text`: what the player reads
- `choices`: buttons the player can click
- `target`: the name of the next node to go to

Example node:

```js
start: {
  text: "You wake up in a forest clearing.",
  choices: [
    { text: "Follow the trail", target: "trail" },
    { text: "Enter the cave", target: "cave" }
  ]
}
```

✅ Tip: Make sure each target matches a real node name exactly (spelling matters!).

---

## 🧠 Big Ideas from Session 2

This session introduces:
- Data vs. logic (story content vs. story engine)
- Reusable code (goToNode) that can run any number of pages
- Dynamically creating buttons from data
- Debugging mistakes like “missing nodes” when a target doesn’t match

---

## 🆘 Getting Help

If something doesn’t work, check:
- File names match exactly (story.js, script.js, etc.)
- IDs match exactly between HTML and JavaScript
- You saved your files and refreshed the page
- A target name exists as a node in story.js

For extra learning, we recommend trusted, beginner-friendly resources like:
- MDN Web Docs (Mozilla)
- freeCodeCamp
- W3Schools

Important Note for Students:  
Always follow your family’s rules and expectations when using the internet. If you’re unsure whether a website is okay to use, check with a parent or guardian first.

---

## 🚀 What’s Next?

In Session 3, students will:
- Add game “memory” (state)
- Track inventory items
- Unlock choices based on what the player has collected or done

Nice work — you’re building a real game engine 🎉
