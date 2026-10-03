# SESSION_1_STEP_BY_STEP.md

## Session 1 — Draw Your World

In this guide, you'll build the first screen of **Pinehill Quest** using:

- **HTML** (structure: what's on the page)
- **CSS** (style: how it looks)
- **JavaScript** (behavior: what it does)

You'll make changes **one step at a time**. After each step, save, refresh the browser, and *see something new happen*.

> 👀 **Sneak peek:** before we start, your teacher will play the finished game on the big screen. That's where we're headed!

---

## 🧰 Step 0 — Create Your Project Folder (~2 min)

**What this does for you:**
Keeps your project organized so your HTML, CSS, and JavaScript files can work together.

1. Create a folder named:

   `session-1`

2. Open this folder in **VS Code**

All files you create today will live inside this folder.

---

## 🌐 Step 1 — Create `index.html` (~5 min)

**What this does for you:**
Creates the web page your game will live on.

1. Create a file named:

   `index.html`

2. Paste in this code:

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Pinehill Quest</title>
     </head>

     <body>
       <div id="game">
         <h1>Pinehill Quest</h1>
       </div>
     </body>
   </html>
   ```

3. Save the file and open it in your browser (double-click it).

✅ **You should see:**
The words **Pinehill Quest** in big letters, and "Pinehill Quest" on the browser tab.

💬 **Talk about it:**
- `<head>` holds information *about* the page. `<body>` holds what you *see*.
- `<div id="game">` is a box that holds our whole game. The `id` gives the box a name so we can find it later.
- `<meta charset="UTF-8" />` lets the page show emoji. We'll be using a lot of those!

---

## ❤️ Step 2 — Add the Stats Bar and a Message Line (~5 min)

**What this does for you:**
Games show your stats (health, money) at the top. This is called a **HUD** ("heads-up display").

Inside `<div id="game">`, **below** the `<h1>` line, add:

```html
      <!-- The HUD ("heads-up display") shows the hero's stats -->
      <div id="hud">
        <span id="hearts">❤️❤️❤️❤️❤️</span>
        <span id="gems">💎 0</span>
      </div>

      <p id="message">Click the treasure chest!</p>
```

Save and refresh.

✅ **You should see:**
Five hearts, a gem counter, and the message "Click the treasure chest!"

💬 **Talk about it:**
- `<!-- ... -->` is a **comment**: a note for humans. The browser ignores it.
- Each part we'll want to change later has its own `id`: `hearts`, `gems`, `message`.

---

## 🗺️ Step 3 — Add the Map Tiles (~10 min)

**What this does for you:**
Builds your world! The map is 6 rows of 6 tiles. Each tile is a `<div>` with an emoji in it.

Between the HUD and the message (right **above** `<p id="message">`), add:

```html
      <!-- The map: 6 rows of 6 tiles -->
      <div id="board">
        <!-- Row 1 -->
        <div class="tile">🌲</div>
        <div class="tile">🌲</div>
        <div class="tile">🌲</div>
        <div class="tile">🌲</div>
        <div class="tile">🌲</div>
        <div class="tile">🌲</div>
        <!-- Row 2 -->
        <div class="tile">🌲</div>
        <div class="tile">🧝</div>
        <div class="tile"></div>
        <div class="tile"></div>
        <div class="tile" id="chest">📦</div>
        <div class="tile">🌲</div>
        <!-- Row 3 -->
        <div class="tile">🌲</div>
        <div class="tile"></div>
        <div class="tile">🧙</div>
        <div class="tile"></div>
        <div class="tile"></div>
        <div class="tile">🌲</div>
        <!-- Row 4 -->
        <div class="tile">🌲</div>
        <div class="tile"></div>
        <div class="tile"></div>
        <div class="tile"></div>
        <div class="tile">🏪</div>
        <div class="tile">🌲</div>
        <!-- Row 5 -->
        <div class="tile">🌲</div>
        <div class="tile">🌊</div>
        <div class="tile">🌊</div>
        <div class="tile"></div>
        <div class="tile">🏠</div>
        <div class="tile">🌲</div>
        <!-- Row 6 -->
        <div class="tile">🌲</div>
        <div class="tile">🌲</div>
        <div class="tile">🌲</div>
        <div class="tile">🌲</div>
        <div class="tile">🌲</div>
        <div class="tile">🌲</div>
      </div>

```

> ⌨️ **Typing tip:** type Row 1 yourself, then copy and paste it 5 times and change the emoji.
> On a Mac, **Ctrl + Cmd + Space** opens the emoji picker. On Windows, it's **Windows key + .** (period).

Save and refresh.

✅ **You should see:**
A long list of emoji going straight down the page. **That's expected!** HTML only knows *what* things are, not *how to arrange them*. That's CSS's job, next step.

💬 **Talk about it:**
- Every tile has `class="tile"`. A **class** is a name many things can share.
- Only the chest has `id="chest"`. An **id** is a name for exactly **one** thing.

---

## 🎨 Step 4 — Create `style.css` (Turn the List into a Map) (~10 min)

**What this does for you:**
Gives your game colors, a frame, and, most importantly, arranges the tiles into a 6×6 grid.

1. Create a file named:

   `style.css`

2. Paste this code:

   ```css
   /* PINEHILL QUEST — how the game looks */

   * {
     box-sizing: border-box;
   }

   body {
     margin: 0;
     padding: 24px 16px;
     background: #1b1b2f;
     color: #f4f4f4;
     font-family: "Courier New", Courier, monospace;
     display: flex;
     justify-content: center;
   }

   /* The game "cartridge" */
   #game {
     max-width: 720px;
     padding: 16px 20px;
     background: #2b2b45;
     border: 4px solid #f4d35e;
     border-radius: 12px;
   }

   h1 {
     margin: 0 0 12px;
     text-align: center;
     color: #f4d35e;
     letter-spacing: 2px;
   }

   /* Stats across the top */
   #hud {
     display: flex;
     justify-content: space-between;
     gap: 16px;
     margin-bottom: 10px;
     font-size: 18px;
   }

   /* The map: a grid of tiles */
   #board {
     display: grid;
     grid-template-columns: repeat(6, 44px);
     gap: 2px;
     width: fit-content;
     margin: 0 auto;
     padding: 4px;
     background: #14361e;
     border-radius: 6px;
   }

   .tile {
     width: 44px;
     height: 44px;
     display: flex;
     align-items: center;
     justify-content: center;
     font-size: 28px;
     background: #4a8f3a;
     border-radius: 4px;
   }

   /* The treasure chest can be clicked */
   #chest {
     cursor: pointer;
   }

   #message {
     min-height: 1.4em;
     margin: 12px 0 0;
     text-align: center;
   }
   ```

3. Connect the CSS to your page. In `index.html`, inside `<head>`, **below** the `<title>` line, add:

   ```html
       <link rel="stylesheet" href="style.css" />
   ```

Save both files and refresh.

✅ **You should see:**
A dark game "cartridge" with a gold border, and your tiles arranged as a green 6×6 map. 🎉

💬 **Talk about it:**
- In CSS, `#game` means "the thing with **id** game" and `.tile` means "everything with **class** tile".
- `display: grid` plus `grid-template-columns: repeat(6, 44px)` means "make 6 columns, each 44 pixels wide." The tiles fill in row by row.

🧪 **Try it:** change `repeat(6, 44px)` to `repeat(3, 44px)`, then refresh. What happened? Change it back to 6.

---

## ⚙️ Step 5 — Create `game.js` (Open the Chest!) (~10 min)

**What this does for you:**
Makes your page *do* something. When the player clicks the chest, they find a gem.

1. Create a file named:

   `game.js`

2. Paste this code:

   ```javascript
   // PINEHILL QUEST — Session 1
   // JavaScript makes the page DO things.

   // 1) Find the parts of the page we will change (using their ids)
   const chestEl = document.getElementById("chest");
   const gemsEl = document.getElementById("gems");
   const messageEl = document.getElementById("message");

   // 2) A variable remembers how many gems we have
   let gems = 0;

   // 3) What happens when someone clicks the chest
   chestEl.onclick = () => {
     console.log("The chest was clicked!");

     gems = gems + 1;
     gemsEl.textContent = "💎 " + gems;

     chestEl.textContent = "💎";
     messageEl.textContent = "You opened the chest and found a gem!";
   };
   ```

3. Connect the JavaScript to your page. In `index.html`, just **before** `</body>`, add:

   ```html
       <!-- Load JavaScript last, so the page is ready first -->
       <script src="game.js"></script>
   ```

Save everything and refresh. Click the 📦 chest.

✅ **You should see:**
The chest turns into a 💎, the gem counter says **💎 1**, and the message changes.

💬 **Talk about it:**
- `document.getElementById("chest")` finds the tile with `id="chest"`. That's why ids matter!
- `let gems = 0;` makes a **variable**: a labeled box that remembers a value.
- `gems = gems + 1;` means "take what's in the box, add 1, and put it back."
- `chestEl.onclick = () => { ... };` means "when the chest is clicked, run the code inside the `{ }`."

---

## 🔍 Step 6 — Peek Behind the Scenes with DevTools (~5 min)

**What this does for you:**
DevTools are the browser's built-in tools for programmers. You'll use them every week to find out what your code is doing.

1. Open DevTools:
   - **Chrome / Edge:** press **F12**, or **Cmd + Option + J** on a Mac
   - **Safari:** first turn on *Settings → Advanced → Show features for web developers*, then press **Cmd + Option + C**
2. Click the **Console** tab.
3. Click the chest a few times.

✅ **You should see:**
`The chest was clicked!` appears in the console every time you click. That's your `console.log` line talking to you!

🧪 **Try it:**
- Right-click any tile and choose **Inspect**. DevTools jumps to that `<div>` in your HTML.
- Double-click the emoji in the Elements panel and change it. The map changes instantly! (It goes back when you refresh. To keep a change, edit your file.)

---

## 🧠 What You Learned in Session 1

- **HTML** builds the page out of tags like `<div>`, `<h1>`, and `<p>`
- **ids** name one thing, **classes** name many things
- **CSS grid** arranges boxes into rows and columns
- **JavaScript** can find things on the page and change them when you click
- **Variables** remember values, like how many gems you have
- **DevTools** show you what your code is doing

---

## ✍️ Make It Yours (~10 min)

- Swap the emoji to create your own world
- Change the colors in `style.css` (try a different `background` for `.tile`)
- Rename the game in both `<title>` and `<h1>`
- Change the message for opening the chest

## ⭐ Stretch

- **Bug hunt:** you can click the chest forever for infinite gems! Wrap the inside of the click code in an `if` so it only works once:

  ```javascript
  if (gems === 0) {
    // ...the code that gives you a gem...
  }
  ```

- Make the 🧙 clickable too. Give it an `id`, find it in `game.js`, and change the message when it's clicked.

---

## 🆘 If Something Doesn't Work

**What this does for you:**
Debugging is how real programmers learn. These checks solve most problems fast.

Check:

- File names are exactly `index.html`, `style.css`, `game.js`
- Every `<div>` has a matching `</div>`
- The `id` in your HTML matches the one in `getElementById` (capital letters matter!)
- You saved every file, then refreshed the browser
- The DevTools **Console** for red error messages, which tell you the file and line number

Ask for help: that's part of learning.

Always follow your family's rules when using the internet.

You've officially completed Session 1 🚀
