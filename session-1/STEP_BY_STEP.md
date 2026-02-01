# SESSION_1_STEP_BY_STEP.md  

## Session 1 — Build Your First Interactive Story

In this guide, you’ll build your **first interactive game** using:

- **HTML** (structure)
- **CSS** (style)
- **JavaScript** (interaction)

You will make changes **one step at a time**, and after each step you’ll run the page and *see something new happen*.

---

## 🧰 Step 0 — Create Your Project Folder

**What this does for you:**  
Keeps your project organized so your HTML, CSS, and JavaScript files can work together.

1. Create a folder named:

session-1

1. Open this folder in **VS Code**

All files you create will live inside this folder.

---

## 🌐 Step 1 — Create `index.html` (The Story Page)

**What this does for you:**  
Creates the *basic webpage* your game will live on, so you can see text in a browser.

### What you should see

A page with a title and a paragraph of story text.

### Instructions

1. Create a file named:

index.html

1. Paste in this code:

```html
<!DOCTYPE html>
<html>
<head>
 <title>Choose Your Own Adventure</title>
</head>

<body>
 <h1>Choose Your Own Adventure</h1>

 <p>
   You are standing at a fork in the road.
 </p>
</body>
</html>
```

1. Save the file

Run it
  •  Double-click index.html, or
  •  Right-click → Open with Live Server

✅ You should see:
A page with a heading and one sentence of story text.

⸻

🎨 Step 2 — Add Structure for the Game Area

What this does for you:
Puts your story inside a “game box” so it’s easier to style and easier for JavaScript to control later.

What you should see

The page looks the same, but your story is now inside a “container.”

Instructions

Replace the &lt;body&gt' section with this:


```html
<body>
  <div id="game">
    <h1>Choose Your Own Adventure</h1>

    <p id="storyText">
      You are standing at a fork in the road.
    </p>
  </div>
</body>
```

Save and refresh.

✅ You should see:
The same content — now grouped inside a div.

(This will matter when we add styles and JavaScript.)

⸻

🎨 Step 3 — Create style.css (Make It Look Better)

What this does for you:
Makes your game easier to read and more fun to look at by adding a background and a “card” for the story.

What you should see
  •  A light background
  •  A white “card” holding your story

Instructions

1. Create a file named:

style.css


1. Paste this into style.css:

```css
body {
  background-color: #f2f2f2;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  padding-top: 40px;
}

#game {
  background-color: white;
  padding: 20px;
  width: 400px;
  border-radius: 10px;
}
```

1. Link the CSS file in index.html by adding this inside &lt;head&gt;:

```html
<link rel="stylesheet" href="style.css">
```

Save and refresh.

✅ You should see:
Your story centered on the page inside a white box.

⸻

🔘 Step 4 — Add Buttons (Choices)

What this does for you:
Adds the player’s choices to the game. Buttons are how the player interacts with your story.

What you should see

Two buttons appear under the story.

Instructions

Inside the #game div in index.html, add this below the paragraph:

```html
<div id="choices">
  <button id="choiceLeft">Go left</button>
  <button id="choiceRight">Go right</button>
</div>
```

Save and refresh.

✅ You should see:
Two buttons labeled Go left and Go right.

(They don’t do anything yet — that’s next!)

⸻

⚙️ Step 5 — Create script.js (Make Buttons Work)

What this does for you:
Turns your page into a real game by making the buttons do something. When the player clicks, the story changes.

What you should see

Clicking a button changes the story text.

Instructions

1. Create a file named:

script.js

1. Paste this into script.js:

```javascript
const storyText = document.getElementById("storyText");
const leftButton = document.getElementById("choiceLeft");
const rightButton = document.getElementById("choiceRight");

leftButton.onclick = () => {
  storyText.textContent =
    "You walk down the left path and hear something moving in the trees.";
};

rightButton.onclick = () => {
  storyText.textContent =
    "You take the right path and see warm lights glowing ahead.";
};
```

1. Connect the JavaScript file by adding this at the bottom of index.html, just before &lt;/body&gt;:

```html
<script src="script.js"></script>
```

Save everything and refresh.

✅ You should see:
Clicking each button changes the story text.

🎉 You just made an interactive game.

⸻

🧠 What You Learned in Session 1
  •  HTML creates the page and story text
  •  CSS makes the page readable and friendly
  •  JavaScript reacts to button clicks
  •  IDs let JavaScript find things on the page
  •  Code can control a story

⸻

🔁 Try This (Optional Challenges)

What this does for you:
Practicing small changes helps you get comfortable and builds confidence fast.
  •  Change the story text
  •  Rename the buttons
  •  Add a third button
  •  Make both buttons change the text in different ways

⸻

🆘 If Something Doesn’t Work

What this does for you:
Debugging is how real programmers learn. These checks solve most issues quickly.

Check:
  •  File names (script.js vs Script.js)
  •  IDs match exactly
  •  Files are saved
  •  Browser is refreshed

Ask for help — that’s part of learning.

Always follow your family’s rules when using the internet.

You’ve officially completed Session 1 🚀
