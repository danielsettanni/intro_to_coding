# SESSION_2_STEP_BY_STEP.md  
## Intro to Coding — Session 2: Build a Story Engine (Branching Adventure)

In Session 1, you made a story where buttons changed the text.  
In **Session 2**, you’ll level up by building a **story engine**:

- Your story will be split into **pages** (called *nodes*)
- Each page will have **choices**
- Clicking a choice will jump to a new page automatically

You’ll create **4 files** in this session:
- `index.html` (the page)
- `style.css` (how it looks)
- `story.js` (your story content)
- `script.js` (the engine that runs the story)

After every step, you’ll run the page and see something change.

---

## 🧰 Step 0 — Create Your Session Folder

**What this does for you:**  
Keeps Session 2 separate from Session 1 so it’s easy to find your work later.

1. Create a folder named:

   `session-2`

2. Open that folder in **VS Code**

---

## 🌐 Step 1 — Create `index.html` (A Clean Game Layout)

**What this does for you:**  
Creates the “screen” your story will display on, including a place for the story text and a place where buttons will appear.

1. Create a file named:

   `index.html`

2. Paste this code:

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8" />
     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     <title>Choose Your Own Adventure (Session 2)</title>
     <link rel="stylesheet" href="style.css" />
   </head>

   <body>
     <div id="game">
       <h1 id="title">Lost in the Forest</h1>

       <p id="storyText">Loading story...</p>

       <div id="choices"></div>

       <p id="debug" class="status"></p>
     </div>

     <script src="story.js"></script>
     <script src="script.js"></script>
   </body>
   </html>
   ```

✅ Run it now (Live Server or open in browser).  
You should see: a title and the text “Loading story…” (no buttons yet).

---

## 🎨 Step 2 — Create style.css (Make It Look Like a Game)

**What this does for you:**  
Makes your story look nicer: centered card, readable text, buttons stacked with spacing.

1. Create a file named:

   `style.css`

2. Paste this code:

   ```css
   body {
     font-family: Arial, sans-serif;
     background: #f2f2f2;
     display: flex;
     justify-content: center;
     padding-top: 40px;
   }

   #game {
     background: white;
     width: 560px;
     padding: 20px 24px;
     border-radius: 10px;
     box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
   }

   #storyText {
     font-size: 18px;
     line-height: 1.5;
     margin-top: 10px;
   }

   #choices {
     margin-top: 16px;
     display: flex;
     flex-direction: column;
     gap: 10px;
   }

   button {
     padding: 12px;
     font-size: 16px;
     cursor: pointer;
   }

   .status {
     margin-top: 14px;
     font-style: italic;
     opacity: 0.75;
   }
   ```

✅ Refresh the page.  
You should see: the same text as before, but now it looks like a centered “game card.”

---

## 📖 Step 3 — Create story.js (Add Story Pages)

**What this does for you:**  
Puts your story into a data file so you can add lots of pages without rewriting your engine code.

1. Create a file named:

   `story.js`

2. Paste this code:

   ```javascript
   // filepath: /Users/daniel/development/intro_to_coding/session-2/story.js
   const STORY = {
     start: {
       text:
         "You wake up in a forest clearing. The air is cold, and you don't remember how you got here.\n\n" +
         "A narrow trail leads north. A cave entrance yawns open to the east.",
       choices: [
         { text: "Follow the trail", target: "trail" },
         { text: "Enter the cave", target: "cave" }
       ]
     },

     trail: {
       text:
         "The trail winds through tall trees and opens into a quiet village.\n\n" +
         "People stop and stare at you as you step closer.",
       choices: [
         { text: "Talk to the villagers", target: "villagers" },
         { text: "Keep walking past the village", target: "pastVillage" }
       ]
     },

     cave: {
       text:
         "The cave is dark and damp. Water drips from the ceiling.\n\n" +
         "Something glints faintly on the ground near your feet.",
       choices: [
         { text: "Pick up the shiny object", target: "shinyObject" },
         { text: "Leave the cave", target: "start" }
       ]
     },

     villagers: {
       text:
         "A friendly baker offers you bread and asks where you came from.\n\n" +
         "Before you can answer, a bell rings from the center of town.",
       choices: [
         { text: "Go toward the bell", target: "bell" },
         { text: "Head back to the forest", target: "start" }
       ]
     },

     pastVillage: {
       text:
         "You keep walking, trying not to make eye contact.\n\n" +
         "Soon the village disappears behind you and the forest feels even quieter.",
       choices: [{ text: "Return to the fork", target: "start" }]
     },

     shinyObject: {
       text:
         "You pick up the object. It's a small silver coin with a symbol you've never seen.\n\n" +
         "For a second, the coin feels warm in your hand.",
       choices: [{ text: "Go back outside", target: "start" }]
     },

     bell: {
       text:
         "You reach the town square. The bell is still swaying.\n\n" +
         "A note is pinned to the post: 'MEET ME AT SUNSET.'",
       choices: [
         { text: "Go back to the baker", target: "villagers" },
         { text: "Return to the forest", target: "start" }
       ]
     }
   };
   ```

✅ Refresh the page.  
You should still see: “Loading story…” (because we haven’t written the engine yet).  
That’s okay — the story is ready, but nothing is reading it yet.

---

## ⚙️ Step 4 — Create script.js (The Story Engine)

**What this does for you:**  
Makes the story run. The engine:
- Shows a story page
- Creates buttons from choices
- Jumps to the next page when you click

1. Create a file named:

   `script.js`

2. Paste this code:

   ```javascript
   // filepath: /Users/daniel/development/intro_to_coding/session-2/script.js
   const storyTextEl = document.getElementById("storyText");
   const choicesEl = document.getElementById("choices");
   const debugEl = document.getElementById("debug");

   function goToNode(nodeId) {
     const node = STORY[nodeId];

     // If a page name is wrong, show a helpful message
     if (!node) {
       storyTextEl.textContent = "Oops! That part of the story doesn't exist yet.";
       choicesEl.innerHTML = "";
       debugEl.textContent = `Missing node: ${nodeId}`;
       return;
     }

     // Show the story text, with line breaks
     storyTextEl.innerHTML = node.text.replaceAll("\n", "<br>");

     // Clear old buttons
     choicesEl.innerHTML = "";

     // Create one button per choice
     node.choices.forEach((choice) => {
       const button = document.createElement("button");
       button.textContent = choice.text;
       button.onclick = () => goToNode(choice.target);
       choicesEl.appendChild(button);
     });

     // Show current page name (helpful for learning + debugging)
     debugEl.textContent = `Current page: ${nodeId}`;
   }

   // Start the story
   goToNode("start");
   ```

✅ Refresh the page.  
You should see: the start of the story and two buttons. Clicking buttons should move you through the story!

---

## ✅ Step 5 — Make a Tiny Change (Prove You Control It)

**What this does for you:**  
Shows you that you’re in charge of the game and can edit the story safely.

Try one of these quick edits in `story.js`, save, and refresh:

Option A: Change a button label

Find this:

```javascript
{ text: "Enter the cave", target: "cave" }
```

Change it to:

```javascript
{ text: "Enter the spooky cave", target: "cave" }
```

Option B: Change some story text

Change one sentence in the `start` node and refresh.

✅ You should see: your change show up immediately.

---

## 🧠 What You Learned in Session 2

- Your story can be stored as data (`story.js`)
- One function (`goToNode`) can run the entire game
- Buttons can be created automatically based on choices
- Page names (like "start" and "cave") must match exactly

---

## 🆘 If Something Doesn’t Work

**What this does for you:**  
These checks fix most issues fast.

Check:

- File names are exact: `story.js`, `script.js`, `style.css`
- You saved the files
- Refresh the browser
- Look at the debug line:
  - If it says `Missing node`, your target name doesn’t match a page name

Ask for help — that’s part of learning.

Always follow your family’s rules when using the internet.

You’ve completed Session 2 🎉
