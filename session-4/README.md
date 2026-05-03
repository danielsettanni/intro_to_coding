# Intro to Coding

## Session 4 — Images, Styling, and Atmosphere

Welcome to **Session 4** of *Intro to Coding*!

In Session 3, students gave their game memory using state and inventory.  
In **Session 4**, students make the game feel more immersive by adding:

- Scene images
- Atmosphere-focused styling
- Visual polish that supports the story mood

By the end of this session, students will have a playable story that looks and feels more like a real game experience.

---

## 🎯 What Students Will Do in Session 4

In this session, students will:

- Add an image area for each story scene
- Store image paths and mood data in `story.js`
- Update the engine to swap images automatically as the story changes
- Improve the game’s visual style (color, spacing, button states, transitions)
- Use atmosphere to make different scenes feel different (safe, tense, mysterious)

Students will leave with a game that is both **interactive** and **visually expressive**.

---

## 📁 Files in This Folder

Session 4 uses **four files**:

- `index.html` → The webpage layout (including scene image)
- `style.css` → Atmosphere, color themes, spacing, and polish
- `story.js` → Story content + per-node image and mood data
- `script.js` → Engine logic (render text, choices, images, and mood)

Optional:
- `assets/` → Scene images used by the story

---

## ▶️ How to Run the Project

### Option 1: Using VS Code + Live Server (Recommended)

1. Open this `session-4` folder in **VS Code**
2. Right-click `index.html`
3. Select **“Open with Live Server”**

### Option 2: Open in a Browser

- Double-click `index.html` to open it in any modern browser  
  (Chrome, Edge, Firefox, or Safari)

---

## 🖼️ Image Setup

Place your images in an `assets` folder inside `session-4`, for example:

- `assets/tower-room.svg`
- `assets/hallway.svg`
- `assets/courtyard-night.svg`
- `assets/gate-open.svg`

Each story node can define:

- `image` → path to the scene image
- `mood` → visual theme class (example: `calm`, `danger`, `mystery`)

---

## 🧩 What Is an SVG? (Basic)

An **SVG** is an image format based on text instructions (shapes, lines, colors), not a fixed pixel grid.

- **SVG** = vector image (text-based instructions)
- **PNG/JPG** = raster image (pixels stored as binary image data)

Simple difference:
- SVG stays sharp when resized
- PNG/JPG can get blurry or pixelated when stretched

For this session, SVG files are useful as lightweight, editable placeholder scene art.

---

## ✍️ Customizing Atmosphere

Most updates happen in:

- **`story.js`** for scene data (`text`, `choices`, `image`, `mood`)
- **`style.css`** for visual tone and polish
- **`script.js`** for applying mood classes and image updates

Example node fields:

```js
start: {
  text: "Moonlight spills across the tower floor...",
  image: "assets/tower-room.svg",
  mood: "mystery",
  choices: [
    { text: "Light the lantern", target: "lantern" }
  ]
}
```

✅ Tip: Keep image names simple and consistent (`lowercase-with-dashes.svg`) to avoid path errors.

---

## 🧠 Big Ideas from Session 4

This session introduces:

- Visual storytelling with image-driven scenes
- UI polish as part of game design
- Data-driven atmosphere (`mood` values in story nodes)
- Separating **content** (story data) from **presentation** (CSS themes)

---

## 🆘 Getting Help

If something doesn’t work, check:

- Image paths are correct (example: `assets/hallway.svg`)
- File names and capitalization match exactly
- You saved files and refreshed the browser
- `story.js` node names and choice `target` values match exactly
- Mood class names in `story.js` exist in `style.css`

For extra learning, use trusted beginner resources:

- MDN Web Docs (Mozilla)
- freeCodeCamp
- W3Schools

Important Note for Students:  
Always follow your family’s rules and expectations when using the internet. If you’re unsure whether a website is okay to use, check with a parent or guardian first.

---

## 🚀 What’s Next?

In Session 5, students can focus on polish and completion:

- Multiple endings
- Better replay flow
- Final UI cleanup
- Sharing/publishing

Nice work — your game now has both logic *and* atmosphere 🎉
