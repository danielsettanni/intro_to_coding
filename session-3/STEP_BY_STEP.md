# SESSION_3_STEP_BY_STEP.md
## Intro to Coding — Session 3: Add Game Memory (State + Inventory)

In Session 2, you built a story engine that could jump between story pages.  
In **Session 3**, you’ll level up by making your game **remember things**.

This is called **state**.

Your game will remember:

- What item the player picked up
- What to show in the inventory
- Which choices should be locked or unlocked

You’ll create **4 files** in this session:
- `index.html` (the page)
- `style.css` (how it looks)
- `story.js` (your story content)
- `script.js` (the engine that runs the story and remembers things)

After every step, you’ll run the page and see something change.

---

## 🧰 Step 0 — Create Your Session Folder

**What this does for you:**  
Keeps Session 3 separate from the earlier sessions so your files stay organized.

1. Create a folder named:

   `session-3`

2. Open that folder in **VS Code**

---

## 🌐 Step 1 — Create `index.html` (Add a Place for Story + Inventory)

**What this does for you:**  
Creates the screen for your game, including a place for the story, the buttons, and the inventory display.

1. Create a file named:

   `index.html`

2. Paste this code:

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8" />
     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     <title>Choose Your Own Adventure (Session 3)</title>
     <link rel="stylesheet" href="style.css" />
   </head>

   <body>
     <div id="game">
       <h1>Castle Escape</h1>

       <p id="storyText">Loading story...</p>

       <div id="choices"></div>

       <p id="inventory" class="status">Inventory: (empty)</p>
       <p id="debug" class="status"></p>
     </div>

     <script src="story.js"></script>
     <script src="script.js"></script>
   </body>
   </html>
   ```

✅ Run it now (Live Server or open in browser).  
You should see: a title, the text “Loading story...”, and an inventory line.

---

## 🎨 Step 2 — Create `style.css` (Make It Look Like a Game)

**What this does for you:**  
Makes your story look clean and easy to read, with space for buttons and status text.

1. Create a file named:

   `style.css`

2. Paste this code:

   ```css
   body {
     font-family: Arial, sans-serif;
     background: #eef2f7;
     display: flex;
     justify-content: center;
     padding-top: 40px;
   }

   #game {
     background: white;
     width: 580px;
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
     opacity: 0.8;
   }
   ```

✅ Refresh the page.  
You should see: the same page, but now it looks like a centered game card.

---

## 📖 Step 3 — Create `story.js` (Add Story Pages + Item Rules)

**What this does for you:**  
Stores your story in a data file and adds simple item rules so some choices can give or require an item.

1. Create a file named:

   `story.js`

2. Paste this code:

   ```javascript
   const STORY = {
     start: {
       text:
         "You wake up inside a locked castle tower.\n\n" +
         "A wooden door blocks the stairs. On a table, you spot a small silver key.",
       choices: [
         { text: "Pick up the silver key", target: "start", giveItem: "silver key" },
         { text: "Try the tower door", target: "towerDoor", requiredItem: "silver key" },
         { text: "Look out the window", target: "window" }
       ]
     },

     window: {
       text:
         "You look out the narrow window.\n\n" +
         "Far below, you see the castle courtyard and a gate leading outside.",
       choices: [
         { text: "Step away from the window", target: "start" }
       ]
     },

     towerDoor: {
       text:
         "The silver key fits. The tower door unlocks with a click.\n\n" +
         "A staircase leads down to the castle courtyard.",
       choices: [
         { text: "Go down to the courtyard", target: "courtyard" }
       ]
     },

     courtyard: {
       text:
         "You enter the courtyard. An iron gate blocks the exit.\n\n" +
         "A guard's bench sits nearby, and something gold glints underneath it.",
       choices: [
         { text: "Look under the bench", target: "bench" },
         { text: "Try the gate", target: "gate", requiredItem: "gold key" }
       ]
     },

     bench: {
       text:
         "Under the bench, you find a gold key.\n\n" +
         "This might open the main gate.",
       choices: [
         { text: "Take the gold key", target: "courtyard", giveItem: "gold key" }
       ]
     },

     gate: {
       text:
         "The gold key unlocks the gate.\n\n" +
         "You step outside into the fresh air. You escaped!",
       choices: [
         { text: "Play again", target: "start" }
       ]
     }
   };
   ```

✅ Refresh the page.  
You should still see: “Loading story...”  
That’s okay — the story is ready, but the engine doesn’t know how to read it yet.

---

## ⚙️ Step 4 — Create `script.js` (Add State + Inventory)

**What this does for you:**  
Makes the story run, remembers items, updates the inventory, and hides choices until the player has the right item.

1. Create a file named:

   `script.js`

2. Paste this code:

   ```javascript
   const storyTextEl = document.getElementById("storyText");
   const choicesEl = document.getElementById("choices");
   const inventoryEl = document.getElementById("inventory");
   const debugEl = document.getElementById("debug");

   const state = {
     inventory: []
   };

   function hasItem(itemName) {
     return state.inventory.includes(itemName);
   }

   function addItem(itemName) {
     if (itemName && !hasItem(itemName)) {
       state.inventory.push(itemName);
     }
   }

   function renderInventory() {
     if (state.inventory.length === 0) {
       inventoryEl.textContent = "Inventory: (empty)";
       return;
     }

     inventoryEl.textContent = `Inventory: ${state.inventory.join(", ")}`;
   }

   function goToNode(nodeId) {
     const node = STORY[nodeId];

     if (!node) {
       storyTextEl.textContent = "Oops! That part of the story doesn't exist yet.";
       choicesEl.innerHTML = "";
       debugEl.textContent = `Missing node: ${nodeId}`;
       return;
     }

     storyTextEl.innerHTML = node.text.replaceAll("\n", "<br>");
     choicesEl.innerHTML = "";

     node.choices.forEach((choice) => {
       if (choice.requiredItem && !hasItem(choice.requiredItem)) {
         return;
       }

       const button = document.createElement("button");
       button.textContent = choice.text;

       button.onclick = () => {
         if (choice.giveItem) {
           addItem(choice.giveItem);
         }

         goToNode(choice.target);
       };

       choicesEl.appendChild(button);
     });

     renderInventory();
     debugEl.textContent = `Current page: ${nodeId}`;
   }

   goToNode("start");
   ```

✅ Refresh the page.  
You should see: the story, buttons, and an inventory that changes when you collect keys.

Try this:
- Click **Pick up the silver key**
- Notice the inventory updates
- A new choice should now appear for the tower door
- Later, collect the gold key to unlock the gate

---

## ✅ Step 5 — Make a Tiny Change (Prove You Control It)

**What this does for you:**  
Shows you that you are in charge of the game and can safely change the story rules.

Try one of these quick edits in `story.js`, save, and refresh:

Option A: Change an item name

Find this:

```javascript
giveItem: "gold key"
```

Change it to:

```javascript
giveItem: "castle key"
```

Then make sure the matching `requiredItem` also says:

```javascript
requiredItem: "castle key"
```

Option B: Change some story text

Change one sentence in the `gate` node and refresh.

✅ You should see: your change show up immediately.

---

## 🧠 What You Learned in Session 3

- A game can store **state**
- An **inventory** is one kind of game memory
- Choices can appear only when rules are true
- One engine can manage story text, buttons, and inventory
- Matching names exactly still matters

---

## 🆘 If Something Doesn’t Work

**What this does for you:**  
These checks fix most issues fast.

Check:

- File names are exact: `story.js`, `script.js`, `style.css`
- You saved the files
- Refresh the browser
- Item names match exactly between `giveItem` and `requiredItem`
- Target names match a real page in `story.js`

Ask for help — that’s part of learning.

Always follow your family’s rules when using the internet.

You’ve completed Session 3 🎉
