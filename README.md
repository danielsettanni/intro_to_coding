# Intro to Coding
## Choose Your Own Adventure

This repository contains a beginner-friendly **Choose Your Own Adventure** game built with **HTML, CSS, and JavaScript**.

The project is part of *Intro to Coding*, a class where students learn the basics of coding by creating an interactive story they can play and share. No prior programming experience is required.

---

## 🎮 What This Project Is

Students build a web-based interactive story where:
- The player reads story text
- The player makes choices by clicking buttons
- The story changes based on those choices
- The game can remember items and past decisions

The project is taught over **5 sessions**, with a working, playable version at the end of **every session**.

---

## 🧠 What Students Learn

Through this project, students learn:
- Basic **HTML** for structure
- Basic **CSS** for styling and layout
- Basic **JavaScript** for interactivity
- How to separate story content from code
- How games track state (like inventory and choices)
- How to debug and test their own work

---

## 📚 Course Structure (5 Sessions)

Each session builds on the previous one.  
An example version of the project for **each session** can be found in folders named:

session-1/
session-2/
session-3/
session-4/
session-5/

Each folder contains a complete, working version of the game as it exists at the end of that session.

### Session Overview
- **Session 1:** Basic interactive story (text + buttons)
- **Session 2:** Story engine with branching pages
- **Session 3:** Game state, inventory, and conditional choices
- **Session 4:** Images, styling, and atmosphere
- **Session 5:** Endings, polish, and publishing

Students can explore earlier sessions to review concepts or compare progress over time.

---

## 📁 Project Structure (Inside Each Session Folder)

Each session folder typically includes:

index.html    # Main webpage
style.css     # Styling and layout
story.js      # Story content (pages and choices)
script.js     # Game logic and engine
assets/       # Images and sounds (optional)

---

## ▶️ How to Run the Game

### Option 1: Using Live Server (Recommended)
1. Open a session folder in **VS Code**
2. Right-click `index.html`
3. Select **“Open with Live Server”**

### Option 2: Open in a Browser
- Double-click `index.html` to open it in any modern web browser

---

## ✍️ Customizing the Story

Most story changes happen in **`story.js`**.

To add a new story page:
- Give it a unique name
- Write the story text
- Add choices that point to other pages

Example:
```js
forest: {
  text: "The forest is quiet and foggy.",
  choices: [
    { text: "Walk forward", target: "path" },
    { text: "Turn back", target: "start" }
  ]
}
```

⸻

🚀 Sharing Your Game

This project can be published for free using GitHub Pages, allowing students to share their game with friends and family.

⸻

🎓 About the Class

Intro to Coding teaches programming through creativity and storytelling.
Students don’t just learn code — they build something meaningful and fun.

⸻

Enjoy building your adventure!

---