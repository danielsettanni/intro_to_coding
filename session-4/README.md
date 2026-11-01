# Intro to Coding

## Session 4 — Talk and Trade

Welcome to **Session 4** of *Intro to Coding*!

In Session 3, the world got rules: walls, gems, a key, and a locked gate. But the people of Pinehill just stand there silently.

In **Session 4**, they start talking:

- Bump into the elder 🧙 to open a **dialogue box** with choices
- Visit the shop 🏪 and **spend your gems** on a sword 🗡️ and a shield 🛡️
- Your **attack** ⚔️ and **defense** 🛡️ stats go up when you buy gear
- The game **remembers your choices**: ask the elder the right question, and a secret item appears in the shop

Returning students: the dialogue is written just like last semester's *Choose Your Own Adventure* story: pages, choices, and targets!

---

## 🎯 What Students Will Do in Session 4

In this session, students will:

- Add a **dialogue box** that appears when you talk to someone
- Write conversations as **data** (`DIALOGUE` in `world.js`)
- Build a small **dialogue engine** that turns choices into buttons
- **Pause** walking while the dialogue box is open
- Create a **shop**: choices that cost gems and give items
- Make items **change stats** (a sword adds to attack)
- Use **flags** so choices can unlock other choices (`setFlag` and `requires`)

---

## 🧠 Concept Card

| Idea | What it means |
| --- | --- |
| **Objects as data** | A conversation page is an object: `{ text: "...", choices: [ ... ] }` |
| **Reusing code** | One `showDialogue` function runs *every* conversation in the game |
| **Numbers and math** | Checking `state.gems < choice.cost`, subtracting gems, adding attack |
| **Creating elements** | `document.createElement("button")` makes new buttons from data |
| **Flags** | A list of things the game remembers you did, like "heard the ogre's secret" |

The big idea: **one engine, many conversations.** You can add 50 characters without writing any new engine code. Just add pages to `DIALOGUE`.

---

## 📁 Files in This Folder

- `index.html` → The page (now with attack/defense stats and a dialogue box)
- `style.css` → How it looks (now styles the dialogue box and buttons)
- `world.js` → The map, tiles, **items, and conversations**
- `game.js` → The engine: drawing, moving, rules, and **talking**

---

## ▶️ How to Run the Project

### Option 1: Open in a Browser

- Double-click `index.html`

### Option 2: VS Code + Live Server

1. Open this `session-4` folder in **VS Code**
2. Right-click `index.html`
3. Choose **"Open with Live Server"**

**Try it:** talk to the elder 🧙, collect all 7 gems (the forest has more!), then visit the shop 🏪 and buy the sword. Then ask the elder about the ogre... and check the shop again. The shield has to wait until Session 5, when monsters drop gems.

---

## ⏱️ Session Plan (90 minutes)

> ⚠️ **Timing note:** this is a full session. If you're running long, copy-paste the `DIALOGUE` pages from the finished `world.js` while you explain the engine code.

| Time | What we do |
| --- | --- |
| 0:00 – 0:05 | Recap: tile properties, state, if/else |
| 0:05 – 0:15 | Concept Card: conversations as data (show a page from last semester's `story.js` if you have returning students) |
| 0:15 – 1:00 | Live build: follow `STEP_BY_STEP.md` |
| 1:00 – 1:10 | Make it yours: write a new character |
| 1:10 – 1:30 | Questions |

---

## ✍️ Make It Yours

All in **`world.js`**:

- **Rewrite the elder's lines** in your own story voice
- **Add a new character.** Pick a letter, give it `talk`, put it on the map, and write its first page:

```js
// in TILES
"F": { emoji: "🧑‍🌾", solid: true, talk: "farmer" },  // farmer

// in DIALOGUE
farmer: {
  text: "Howdy! Have you seen my lost chicken?",
  choices: [
    { text: "Not yet, sorry!", target: "end" }
  ]
},
```

- **Sell something new** at the shop: add it to `ITEMS` with an `attack` or `defense`, then add a shop choice with a `cost` and `give`

✅ Tip: every `target` must be a page name in `DIALOGUE` (or `"end"`). If you see "Oops! Missing dialogue page", check the spelling.

---

## ⭐ Stretch Goals (for returning or speedy students)

- **Keyboard choices:** press 1, 2, or 3 to pick a dialogue choice
- **A quest:** a character who gives you an item for free (`give` with no `cost`), and only once
- **Different words over time:** a choice that only appears after you've found the key (`requires: "key"` works for items too!)
- **Hide a choice once it's done:** add a `hideIf` property that hides a choice when a flag is set

---

## 🆘 Getting Help

If something doesn't work, check:

- Every `target` matches a page name in `DIALOGUE` exactly
- Every page has both `text` and `choices`
- Commas between pages, choices, and properties
- The `talk:` name on the tile matches a page in `DIALOGUE`
- `index.html` has the `box`, `boxText`, and `boxChoices` ids
- The DevTools **Console** for red errors

For extra learning, we recommend trusted, beginner-friendly resources like:

- MDN Web Docs (Mozilla)
- freeCodeCamp
- W3Schools

**Important Note for Students:**
**Always follow your family's rules and expectations when using the internet.** If you're unsure whether a website is okay to use, please check with a parent or guardian first.

---

## 🚀 What's Next?

You have a sword and shield. Now it's time to use them! In **Session 5**:

- **Battle** the goblins 👺 with **dice rolls**, and track your **hearts** ❤️
- Face the Bridge Ogre 👹 with **three different options**, including one that uses this week's secret
- Unlock **three endings**, then **publish** your game to share it

Nice work: Pinehill is full of characters now! 🎉
