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
         <h1 id="title">Lost in the Forest</h1>

         <!-- Story text -->
         <p id="storyText"></p>

         <!-- Inventory display (new in Session 3) -->
         <div id="inventoryBox">
           <strong>Inventory:</strong>
           <span id="inventoryText">none</span>
         </div>

         <!-- Choice buttons get generated here -->
         <div id="choices"></div>

         <!-- Debug / status line -->
         <p id="statusText" class="status"></p>
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
     background: #f2f2f2;
     display: flex;
     justify-content: center;
     padding-top: 40px;
   }

   #game {
     background: white;
     width: 600px;
     padding: 20px 24px;
     border-radius: 10px;
     box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
   }

   #storyText {
     font-size: 18px;
     line-height: 1.5;
     margin-top: 10px;
   }

   #inventoryBox {
     margin-top: 14px;
     padding: 10px 12px;
     border-radius: 8px;
     background: #f7f7f7;
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
You should see: the same page, but now it looks like a centered game card.

---

## 📖 Step 3 — Create `story.js` (Add Story Pages + Item Rules)

**What this does for you:**  
Stores your story in a data file and adds simple item rules so some choices can give or require an item.

1. Create a file named:

   `story.js`

2. Paste this code:

   ```javascript
   // SESSION 3 STORY DATA
   // New concepts:
   // - choices can have "requires": itemName (only show if you have it)
   // - choices can have "addItem": itemName (adds to inventory when clicked)
   // - choices can have "removeItem": itemName (optional; shows consequences)

   const STORY = {
     start: {
       text:
         "You wake up in a forest clearing. The air is cold, and you don't remember how you got here.\n\n" +
         "A narrow trail leads north. A cave entrance yawns open to the east.",
       choices: [
         { text: "Follow the trail", target: "trail" },
         { text: "Enter the cave", target: "caveEntrance" }
       ]
     },

     trail: {
       text:
         "The trail winds through tall trees and opens into a quiet village.\n\n" +
         "A wooden gate blocks the path forward. A sign reads: 'NO ENTRY WITHOUT A PASS.'",
       choices: [
         { text: "Go back to the clearing", target: "start" },

         // This choice only appears if the player has "silverCoin"
         { text: "Show the silver coin as a pass", target: "villageSquare", requires: "silverCoin" },

         // If they don't have it, we give them a hint
         { text: "Try to open the gate anyway", target: "gateLocked" }
       ]
     },

     gateLocked: {
       text:
         "You tug on the gate, but it doesn't budge.\n\n" +
         "The lock looks old. Maybe there's a way to prove you belong here...",
       choices: [
         { text: "Go back", target: "trail" }
       ]
     },

     caveEntrance: {
       text:
         "The cave is dark and damp. Water drips from the ceiling.\n\n" +
         "Something glints faintly on the ground near your feet.",
       choices: [
         // Add an item when clicked
         { text: "Pick up the shiny object", target: "foundCoin", addItem: "silverCoin" },
         { text: "Leave the cave", target: "start" }
       ]
     },

     foundCoin: {
       text:
         "You pick up the object. It's a small silver coin with a symbol you've never seen.\n\n" +
         "It feels warm in your hand for a moment, then goes cold.",
       choices: [
         { text: "Go back outside", target: "start" }
       ]
     },

     villageSquare: {
       text:
         "The guard sees the coin and steps aside.\n\n" +
         "You enter the village square. In the center is a locked chest with a note: 'FOR THE COIN-BEARER.'",
       choices: [
         { text: "Inspect the chest", target: "chest" },
         { text: "Return to the forest", target: "start" }
       ]
     },

     chest: {
       text:
         "The chest has a small keyhole.\n\n" +
         "A shopkeeper whispers: 'Keys are traded for stories.'",
       choices: [
         { text: "Tell a short story to the shopkeeper", target: "earnedKey", addItem: "rustyKey" },
         { text: "Back away from the chest", target: "villageSquare" }
       ]
     },

     earnedKey: {
       text:
         "The shopkeeper smiles. 'A fair trade.'\n\n" +
         "They hand you a rusty key.",
       choices: [
         { text: "Try the key on the chest", target: "openChest", requires: "rustyKey" },
         { text: "Put the key away for later", target: "villageSquare" }
       ]
     },

     openChest: {
       text:
         "The rusty key turns with a loud CLICK.\n\n" +
         "Inside the chest is a folded map labeled: 'The Way Home.'",
       choices: [
         { text: "Take the map", target: "tookMap", addItem: "map" }
       ]
     },

     tookMap: {
       text:
         "You tuck the map safely away.\n\n" +
         "Now you have a destination… and a choice to make.",
       choices: [
         { text: "Head back into the forest", target: "start" }
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
   // SESSION 3 GAME ENGINE (with state + inventory + conditional choices)

   const storyTextEl = document.getElementById("storyText");
   const choicesEl = document.getElementById("choices");
   const statusTextEl = document.getElementById("statusText");
   const inventoryTextEl = document.getElementById("inventoryText");

   // Game state = what the game remembers
   const gameState = {
     inventory: []
   };

   // Helper: check if player has an item
   function hasItem(itemName) {
     return gameState.inventory.includes(itemName);
   }

   // Helper: add item (but don’t add duplicates)
   function addItem(itemName) {
     if (!hasItem(itemName)) {
       gameState.inventory.push(itemName);
     }
   }

   // Update inventory display on screen
   function renderInventory() {
     if (gameState.inventory.length === 0) {
       inventoryTextEl.textContent = "none";
     } else {
       inventoryTextEl.textContent = gameState.inventory.join(", ");
     }
   }

   // Render one story node by id
   function goToNode(nodeId) {
     const node = STORY[nodeId];

     if (!node) {
       storyTextEl.textContent = "Oops! That story page doesn't exist yet.";
       choicesEl.innerHTML = "";
       statusTextEl.textContent = `Missing node: ${nodeId}`;
       return;
     }

     // Show story text (convert \n to <br> for line breaks)
     storyTextEl.innerHTML = node.text.replaceAll("\n", "<br>");

     // Clear old choice buttons
     choicesEl.innerHTML = "";

     // Create buttons for choices, but only if requirements are met
     node.choices.forEach((choice) => {
       // If a choice requires an item and player doesn't have it, skip it
       if (choice.requires && !hasItem(choice.requires)) {
         return;
       }

       const button = document.createElement("button");
       button.textContent = choice.text;

       button.onclick = () => {
         // Apply effects (like adding an item) BEFORE moving to next node
         if (choice.addItem) {
           addItem(choice.addItem);
         }

         // (Optional: you can add removeItem later)
         // if (choice.removeItem) { ... }

         // Refresh inventory display, then go to the next story page
         renderInventory();
         goToNode(choice.target);
       };

       choicesEl.appendChild(button);
     });

     // Update status line
     statusTextEl.textContent = `Current page: ${nodeId}`;
   }

   // Start
   renderInventory();
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
