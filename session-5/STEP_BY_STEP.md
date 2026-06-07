# SESSION_5_STEP_BY_STEP.md
## Intro to Coding — Session 5: Endings, Polish, and Publishing

In Session 4, your game added mood, visuals, and atmosphere.  
In **Session 5**, you’ll finish your project by adding:

- Multiple long routes to Grandma’s house
- Battles with chance (dice-style rolls)
- Ending + replay logic
- Publishing steps so you can safely share your game

You’ll create **6 files** in this session:
- `index.html`
- `style.css`
- `story.js`
- `items.json`
- `adversaries.json`
- `script.js`

After each step, run your game and test one thing.

---

## 🧰 Step 0 — Create Your Session Folder

1. Create a folder named:

   `session-5`

2. Open it in **VS Code**.

---

## 🌐 Step 1 — Create `index.html`

**What this does for you:**  
Sets up your game screen, HUD, and separate inventory areas.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Choose Your Own Adventure (Session 5)</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div id="game">
    <h1>Roads to Grandma's House</h1>

    <div id="hud">
      <span id="hpBadge">HP: 20 / 20</span>
      <span id="attackBadge">Attack x1</span>
      <span id="defenseBadge">Defense x1</span>
    </div>

    <p id="storyText">Loading story...</p>
    <div id="choices"></div>

    <div id="inventoryGrid">
      <div class="invBox">
        <h3>General Inventory</h3>
        <p id="generalInventory">(empty)</p>
      </div>
      <div class="invBox">
        <h3>Weapons</h3>
        <p id="weaponInventory">(none)</p>
      </div>
      <div class="invBox">
        <h3>Defense</h3>
        <p id="armorInventory">(none)</p>
      </div>
    </div>

    <p id="statusText" class="status"></p>
  </div>

  <script src="story.js"></script>
  <script src="script.js"></script>
</body>
</html>
```

✅ You should see a title, HUD chips, and inventory boxes.

---

## 🎨 Step 2 — Create `style.css`

**What this does for you:**  
Adds final polish and clean layout.

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #dbeafe, #eef2ff);
  display: flex;
  justify-content: center;
  padding: 24px 12px;
}

#game {
  width: 760px;
  background: #fff;
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.15);
}

h1 {
  margin-top: 0;
}

#hud {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

#hud span {
  background: #111827;
  color: #fff;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 14px;
}

#storyText {
  font-size: 18px;
  line-height: 1.5;
}

#choices {
  margin-top: 14px;
  display: grid;
  gap: 10px;
}

button {
  border: none;
  border-radius: 10px;
  background: #2563eb;
  color: #fff;
  padding: 11px 12px;
  font-size: 15px;
  cursor: pointer;
}

button:hover {
  filter: brightness(1.05);
}

#inventoryGrid {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.invBox {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px;
}

.invBox h3 {
  margin: 0 0 6px;
  font-size: 14px;
}

.invBox p {
  margin: 0;
  font-size: 14px;
  color: #334155;
}

.status {
  margin-top: 14px;
  font-style: italic;
  opacity: 0.8;
}
```

✅ You should see a polished game card and cleaner UI.

---

## 📖 Step 3 — Create `story.js`

**What this does for you:**  
Adds the full story nodes, routes, requirements, and battle/story flow.

Use the same `story.js` from this session folder.

✅ Test quickly:
- Can you move from start to village?
- Do route requirements redirect correctly when missing?

---

## 🧱 Step 4 — Create `items.json`

**What this does for you:**  
Defines all possible items and metadata the engine uses for inventory messaging and ownership checks.

Create a file named:

`items.json`

Paste this:

```json
{
  "lantern": {
    "category": "general",
    "description": "a sturdy lantern",
    "owned": false
  },
  "apples": {
    "category": "general",
    "description": "a basket of ripe apples",
    "owned": false
  },
  "gift basket": {
    "category": "general",
    "description": "Grandma's gift basket",
    "owned": false
  },
  "rope": {
    "category": "general",
    "description": "a sturdy rope",
    "owned": false
  },
  "climbing pick": {
    "category": "general",
    "description": "a climbing pick",
    "owned": false
  },
  "sword": {
    "category": "weapon",
    "description": "a sword (attack x2)",
    "owned": false
  },
  "bow": {
    "category": "weapon",
    "description": "a bow (attack x2)",
    "owned": false
  },
  "simple armor": {
    "category": "armor",
    "description": "simple armor (defense x1.5)",
    "owned": false
  },
  "chain armor": {
    "category": "armor",
    "description": "chain armor (defense x2)",
    "owned": false
  }
}
```

✅ Test quickly:
- App still loads (no JSON syntax error in browser console).

---

## 👾 Step 5 — Create `adversaries.json`

**What this does for you:**  
Provides enemy pools for mine encounters (weak/average/strong), including rewards and backstory.

Create a file named:

`adversaries.json`

Paste this:

```json
{
  "weak": [
    {
      "name": "Cave Rat Pack Leader",
      "hitPoints": 12,
      "backstory": "A hungry tunnel scavenger that guards shiny scraps.",
      "strengthClassification": "weak",
      "rewardRupeesRange": [10, 20]
    }
  ],
  "average": [
    {
      "name": "Ironcap Brigand",
      "hitPoints": 20,
      "backstory": "A seasoned outlaw who controls old side tunnels.",
      "strengthClassification": "average",
      "rewardRupeesRange": [15, 25]
    }
  ],
  "strong": [
    {
      "name": "Obsidian Brute",
      "hitPoints": 28,
      "backstory": "A hulking cave warrior clad in obsidian shards.",
      "strengthClassification": "strong",
      "rewardRupeesRange": [20, 35]
    }
  ]
}
```

✅ Test quickly:
- Mine encounter can show enemy name/classification and backstory.

---

## ⚙️ Step 6 — Create `script.js`

**What this does for you:**  
Runs the engine with:
- state
- inventory categories
- HP and battle rolls
- weapon/armor multipliers
- defeat/retreat flow
- persistent defeated enemies
- JSON data loading (`items.json` + `adversaries.json`)

Use the same `script.js` from this session folder.

✅ Test quickly:
- No startup errors in console
- Mine + battles + store/blacksmith logic works

---

## ✅ Step 7 — Endings + Replay Test

1. Make sure each route can reach `grandmaHouse`.
2. Make sure `gift basket` is required.
3. Confirm ending includes a replay/reset button.

✅ Success check:
- You can finish by forest, river, or mountain
- Replay resets state correctly

---

## 🌍 Step 8 — Publishing (Safe + Free)

**Do this with a parent/guardian or teacher.**

Recommended free options:

- GitHub Pages
- Cloudflare Pages
- Netlify (free plan)
- Vercel (hobby/free)

Low-cost alternatives if needed:

- Neocities Supporter
- Namecheap shared hosting
- Hostinger basic shared hosting

Safety rules:
- No personal info
- Use adult-approved account/settings
- Ask before making your project public

---

## 🧠 What You Learned in Session 5

- How to complete and polish a full game project
- How to mix story + inventory + combat systems
- How to design multiple routes with shared ending rules
- How to prepare a kid-safe publishing plan

You finished all 5 sessions 🎉
