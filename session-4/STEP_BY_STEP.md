# SESSION_4_STEP_BY_STEP.md

## Session 4 — Talk and Trade

In Session 3, the world got rules. In **Session 4**, you'll:

- Add **attack** and **defense** stats
- Build a **dialogue box** and a **dialogue engine**
- Let the elder 🧙 talk
- Open the **shop** 🏪 so you can spend gems on gear
- Make the game **remember your choices** with **flags**: ask the right question, and something new appears

After every step, save, refresh, and test it.

---

## 🧰 Step 0 — Copy Last Week's Folder (~2 min)

1. Make a copy of your `session-3` folder and name it:

   `session-4`

   (Missed last week? Copy `session-3` from the class repo.)

2. Open `session-4` in **VS Code**

---

## ⚔️ Step 1 — Add Attack and Defense Stats (~5 min)

**What this does for you:**
Next week we'll battle monsters. Your attack and defense numbers will decide how well you fight.

### 1a. `index.html`: add two stats to the HUD

Inside `<div id="hud">`, **below** the gems `<span>`, add:

```html
        <span id="attack">⚔️ 1</span>
        <span id="defense">🛡️ 2</span>
```

### 1b. `game.js`: find them

At the top, **below** the `inventoryEl` line, add:

```javascript
const attackEl = document.getElementById("attack");
const defenseEl = document.getElementById("defense");
```

### 1c. `game.js`: remember them in `state`

Make `state` look like this. It has two new lines (remember the comma after `inventory: []`!):

```javascript
const state = {
  x: 0,
  y: 0,
  gems: 0,
  inventory: [],
  attack: 1,
  defense: 2
};
```

### 1d. `game.js`: show them in `renderHud`

In `renderHud`, **below** the `gemsEl` line, add:

```javascript
  attackEl.textContent = "⚔️ " + state.attack;
  defenseEl.textContent = "🛡️ " + state.defense;
```

Save and refresh.

✅ **You should see:**
**⚔️ 1** and **🛡️ 2** in the HUD next to your gems.

---

## 💬 Step 2 — Build the Dialogue Box (~5 min)

**What this does for you:**
Creates the box where conversations will appear. It starts **hidden**.

### 2a. `index.html`

**Below** the `<p id="inventory">` line, add:

```html

      <!-- The dialogue box stays hidden until you talk to someone -->
      <div id="box" hidden>
        <p id="boxText"></p>
        <div id="boxChoices"></div>
      </div>
```

### 2b. `style.css`

At the **bottom**, add:

```css

/* The dialogue box */
#box {
  margin-top: 12px;
  padding: 12px 14px;
  background: #11111f;
  border: 3px solid #f4d35e;
  border-radius: 8px;
}

#boxText {
  margin: 0 0 10px;
  line-height: 1.4;
  white-space: pre-line;
}

#boxChoices {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

button {
  padding: 10px;
  font-family: inherit;
  font-size: 16px;
  font-weight: bold;
  color: #1b1b2f;
  background: #f4d35e;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background: #ffe680;
}
```

Save and refresh.

✅ **You should see:**
Nothing new. The box is `hidden`!

🧪 **Try it:** delete the word `hidden` from `<div id="box" hidden>`, refresh, and you'll see an empty gold-bordered box. Put `hidden` back.

💬 **Talk about it:** `white-space: pre-line` means "show line breaks." Our conversations use `\n` to start a new line.

---

## 📜 Step 3 — Write the Elder's Conversation (~8 min)

**What this does for you:**
Conversations are **data**, just like the map. Each **page** has some `text` and a list of `choices`. Each choice has a `target`: the page it leads to.

### 3a. `world.js`: let the elder talk

Change the elder's line so it has `talk: "elder"`:

```javascript
  "E": { emoji: "🧙", solid: true, talk: "elder" },  // village elder
```

And add one line to the guide comment above `TILES`, right after `lockedMessage`:

```javascript
//   talk:          which DIALOGUE page to open when you bump into it
```

### 3b. `world.js`: the conversation

At the **bottom** of `world.js`, add:

```javascript

// DIALOGUE — conversations, written like a choose-your-own-adventure.
// Each page has text and choices. Each choice has:
//   text:      what the button says
//   target:    the next page ("end" closes the box)
//   cost:      (optional) gems it costs
//   give:      (optional) an item you get
//   setFlag:   (optional) something the game should remember you did
//   requires:  (optional) only show this choice if you have this item or flag
const DIALOGUE = {
  elder: {
    text:
      "Ah, young traveler! Off to visit Grandma?\n\n" +
      "She lives across the river... but a grumpy ogre guards the bridge.",
    choices: [
      { text: "How do I get past the ogre?", target: "elderOgre" },
      { text: "How do I get into the forest?", target: "elderGate" },
      { text: "Goodbye!", target: "end" }
    ]
  },

  elderOgre: {
    text:
      "Don't fight that ogre with your bare hands!\n\n" +
      "Collect gems, then buy a sword and a shield at the shop.",
    choices: [
      { text: "Tell me something else", target: "elder" },
      { text: "Thanks!", target: "end" }
    ]
  },

  elderGate: {
    text:
      "The old forest gate is locked.\n\n" +
      "I dropped the key somewhere here in the village. Look around!",
    choices: [
      { text: "Tell me something else", target: "elder" },
      { text: "Thanks!", target: "end" }
    ]
  }
};
```

> 📦 **Using a story pack?** Add `talk` to your `E` line using your pack's page name, then copy the whole `DIALOGUE` block (and `ITEMS`) from `stories/<your-story>/world-4.js` instead of typing the Pinehill one. It already includes the shop and the secret you'll wire up in Steps 5 and 6.

Save. Nothing changes yet, because the engine doesn't know how to talk!

💬 **Talk about it:**
- Returning students: this is the same idea as last semester's story pages!
- `"end"` isn't a page. It's a special word that means "close the box."

---

## ⚙️ Step 4 — The Dialogue Engine (~15 min)

**What this does for you:**
Turns `DIALOGUE` pages into a box with buttons, and pauses the hero while you're talking.

### 4a. `game.js`: find the box

At the top, **below** the `defenseEl` line, add:

```javascript
const boxEl = document.getElementById("box");
const boxTextEl = document.getElementById("boxText");
const boxChoicesEl = document.getElementById("boxChoices");
```

### 4b. `game.js`: a "paused" memory

Add `paused` to `state` (comma after `defense: 2`!):

```javascript
  attack: 1,
  defense: 2,
  paused: false
};
```

### 4c. `game.js`: the talking functions

**Above** `// ---------- Keyboard ----------`, add this new section:

```javascript
// ---------- Talking ----------

// Open the dialogue box with some text and no buttons yet.
function openBox(text) {
  state.paused = true;
  boxEl.hidden = false;
  boxTextEl.textContent = text;
  boxChoicesEl.innerHTML = "";
}

// Add one button to the dialogue box.
function addButton(text, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.onclick = onClick;
  boxChoicesEl.appendChild(button);
}

// Hide the dialogue box so the hero can walk again.
function closeBox() {
  state.paused = false;
  boxEl.hidden = true;
}

// Show one page of DIALOGUE with a button for each choice.
function showDialogue(pageId) {
  const page = DIALOGUE[pageId];

  if (!page) {
    openBox("Oops! Missing dialogue page: " + pageId);
    addButton("Close", closeBox);
    return;
  }

  openBox(page.text);

  page.choices.forEach((choice) => {
    addButton(choice.text, () => choose(choice));
  });
}

// What happens when a dialogue button is clicked.
function choose(choice) {
  if (choice.target === "end") {
    closeBox();
  } else {
    showDialogue(choice.target);
  }
}

```

### 4d. `game.js`: bump into someone to talk

In `tryMove`, right **after** `const tile = getTile(newX, newY);`, add:

```javascript

  // Characters want to talk
  if (tile.talk) {
    showDialogue(tile.talk);
    return;
  }
```

### 4e. `game.js`: no walking while talking

In the keyboard code, right **after** the "Arrow keys shouldn't scroll" `if` block, add:

```javascript

  // No walking while the dialogue box is open
  if (state.paused) {
    return;
  }
```

Save and refresh. Walk into the elder 🧙.

✅ **You should see:**
The dialogue box opens with the elder's words and three buttons. Click through the conversation. The arrow keys don't move the hero until you close the conversation.

💬 **Talk about it:**
- `forEach` runs some code **for each** choice in the list. Three choices → three buttons.
- `() => choose(choice)` is a tiny function that remembers *which* choice this button is for.
- **Why talk *before* checking solid?** The elder is solid, so if we checked solid first, `tryMove` would `return` before ever talking!

---

## 🏪 Step 5 — Open the Shop (~10 min)

**What this does for you:**
Gives your gems a purpose. Gear will matter in next week's battles!

### 5a. `world.js`: the shopkeeper talks too

(📦 Story pack: you already copied your shop's pages. Just add `talk` to your `S` line and skip to 5d.)

Change the shop line to:

```javascript
  "S": { emoji: "🏪", solid: true, talk: "shop" },  // shop
```

### 5b. `world.js`: what items do

**Above** the `// DIALOGUE` comment, add:

```javascript
// ITEMS — things that make you stronger when you own them.
const ITEMS = {
  sword: { attack: 2 },
  shield: { defense: 2 }
};

```

### 5c. `world.js`: the shop's pages

Inside `DIALOGUE`, after the `elderGate` page, add a comma after its closing `}`, then:

```javascript

  shop: {
    text: "Welcome to Pinehill Supplies! What can I get you?",
    choices: [
      { text: "Buy a sword 🗡️ (6 💎)", cost: 6, give: "sword", target: "shopThanks" },
      { text: "Buy a shield 🛡️ (5 💎)", cost: 5, give: "shield", target: "shopThanks" },
      { text: "Just looking", target: "end" }
    ]
  },

  shopThanks: {
    text: "A fine choice! That will help with the ogre.",
    choices: [
      { text: "Keep shopping", target: "shop" },
      { text: "Goodbye", target: "end" }
    ]
  }
```

### 5d. `game.js`: items can make you stronger

Replace the `addItem` function with:

```javascript
// Put an item in the backpack. Some items make you stronger!
function addItem(name) {
  state.inventory.push(name);

  const item = ITEMS[name];
  if (item && item.attack) {
    state.attack = state.attack + item.attack;
  }
  if (item && item.defense) {
    state.defense = state.defense + item.defense;
  }
}
```

### 5e. `game.js`: pay for things

Replace the `choose` function with:

```javascript
// What happens when a dialogue button is clicked.
function choose(choice) {
  if (choice.cost) {
    if (state.gems < choice.cost) {
      boxTextEl.textContent = "You need " + choice.cost + " " + STORY.currency + " for that. Come back with more!";
      return;
    }
    state.gems = state.gems - choice.cost;
  }

  if (choice.give) {
    addItem(choice.give);
  }

  renderHud();

  if (choice.target === "end") {
    closeBox();
  } else {
    showDialogue(choice.target);
  }
}
```

### 5f. `game.js`: don't sell the same thing twice

In `showDialogue`, change the `forEach` part to:

```javascript
  page.choices.forEach((choice) => {
    // Don't offer things the hero already owns
    if (choice.give && hasItem(choice.give)) {
      return;
    }
    addButton(choice.text, () => choose(choice));
  });
```

Save everything and refresh. **Test it:**

1. Visit the shop with **no** gems and try to buy something.
2. Collect **all 7 gems** (2 in the village, 5 in the forest), then buy the sword.
3. Choose "Keep shopping". Is the sword still for sale?

✅ **You should see:**
1. "You need 6 💎 for that…"
2. Your gems go down, **🎒 key, sword** appears, and **⚔️ 3** shows in the HUD.
3. Only the shield is offered now. Can't afford it? That's on purpose: next week, defeating monsters earns more gems.

💬 **Talk about it:**
- `state.gems < choice.cost`: `<` means "less than." Not enough gems? Show a message and `return`.
- `item && item.attack` means "if there **is** an item **and** it has an attack bonus."

---

## 🧠 Step 6 — The Game Remembers: Flags (~10 min)

**What this does for you:**
In great games, **what you say matters**. We'll make the game remember a question you asked, and unlock something new because of it. Next week this secret becomes a whole different way to beat the ogre!

A **flag** is a name the game remembers, like a sticky note: `"ogreSecret"` means "the player has heard the ogre's secret."

### 6a. `game.js`: a list of flags

Add `flags` to `state` (comma after `paused: false`!):

```javascript
  paused: false,
  flags: []
};
```

### 6b. `game.js`: check for a flag

**Below** the `closeBox` function, add:

```javascript
// Has the hero done or learned this? Flags remember choices.
function hasFlag(name) {
  return state.flags.includes(name);
}

```

### 6c. `game.js`: some choices need something first

In `showDialogue`, inside the `forEach`, **below** the "Don't offer things the hero already owns" `if` block, add:

```javascript
    // Only show this choice if the hero has the item or flag it requires
    if (choice.requires && !hasItem(choice.requires) && !hasFlag(choice.requires)) {
      return;
    }
```

### 6d. `game.js`: some choices set a flag

In `choose`, **between** the `cost` part and the `give` part, add:

```javascript
  if (choice.setFlag) {
    state.flags.push(choice.setFlag);
  }

```

### 6e. `world.js`: the elder's secret

Add a new choice to the `elder` page, **above** "Goodbye!":

```javascript
      { text: "Why is the ogre so grumpy?", target: "elderSecret", setFlag: "ogreSecret" },
```

And add a new page **between** `elderGate` and `shop` (keep the comma at the end of the new page):

```javascript

  elderSecret: {
    text:
      "*whispers* He hasn't had a proper meal since the flood.\n\n" +
      "And oh, how he loves Grandma's apple pie... I think the shop has one left.",
    choices: [
      { text: "Tell me something else", target: "elder" },
      { text: "Interesting...", target: "end" }
    ]
  },
```

### 6f. `world.js`: the secret item

In the `shop` page, add this choice **above** "Just looking":

```javascript
      { text: "Buy Grandma's apple pie 🥧 (1 💎)", cost: 1, give: "pie", requires: "ogreSecret", target: "shopThanks" },
```

> 📦 **Using a story pack?** Do 6a–6d (the engine), and skip 6e–6f: your `DIALOGUE` already has its secret question and secret item. Find the choice with `setFlag` and the one with `requires`. Can you see how they connect?

Save everything and refresh. **Test it:**

1. Visit the shop **first**. Is the apple pie for sale?
2. Ask the elder "Why is the ogre so grumpy?"
3. Go back to the shop.

✅ **You should see:**
1. No pie: the choice is hidden.
2. The elder tells you the ogre's secret.
3. The pie appears! Buy it (grab a gem first if you have none), and it lands in your backpack.

🔍 **DevTools:** type `state.flags` in the Console to see what the game remembers. Other testing shortcuts: `state.gems = 20` (then step onto grass), or `showDialogue("shop")` to open the shop from anywhere.

💬 **Talk about it:**
- `!` means **not**. `!hasFlag("ogreSecret")` means "the player has **not** heard the secret yet."
- `&&` means **and**: hide the choice if it requires something **and** you don't have it as an item **and** you don't have it as a flag.
- Flags are how games remember your story: who you helped, what you found out, which door you chose.

---

## 🧠 What You Learned in Session 4

- Conversations can be **data**: pages, choices, and targets
- One **engine function** (`showDialogue`) runs every conversation
- `createElement` + `appendChild` build new buttons from data
- **forEach** runs code for every item in a list
- A **paused** flag in `state` can turn controls off and on
- **Math and comparisons** (`<`, `-`, `+`) make a shop work
- **Flags** let the game remember your choices, and `requires` lets choices appear only when you've earned them

---

## ✍️ Make It Yours (~10 min)

- Rewrite the elder's lines in your own voice
- Add a new character with their own `talk` page
- Add a new item to `ITEMS` and sell it at the shop
- Add your own secret: a question that sets a flag, and a new choice somewhere else that `requires` it

## ⭐ Stretch

- Press **1**, **2**, **3** on the keyboard to pick a dialogue choice
- A character who gives you a **free** item (a choice with `give` but no `cost`)

---

## 🆘 If Something Doesn't Work

Check:

- "Oops! Missing dialogue page: ___" → that `target` (or `talk`) name doesn't match a page in `DIALOGUE`
- Commas between pages in `DIALOGUE` (after each page's closing `}` except the last)
- `boxText` / `boxChoices` ids match between `index.html` and `game.js`
- The talk check in `tryMove` is **above** the solid check
- A `requires` choice never appears → check that the `setFlag` name matches exactly
- The DevTools **Console** for red errors

Ask for help: that's part of learning.

Always follow your family's rules when using the internet.

You've completed Session 4 🎉
