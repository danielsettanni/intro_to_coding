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
- Flexbox (used for layouts in this project)

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
