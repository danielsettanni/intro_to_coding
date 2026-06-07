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
Adds the full story routes, route requirements, village systems, and ending flow.

1. Create a file named:

   `story.js`

2. Paste this full code:

```javascript
const STORY = {
  start: {
    text:
      "Morning sunlight spills across your room in Pinehill Village.\n\n" +
      "You promised to visit Grandma today, but the roads are dangerous. You'll need to prepare in town: gather supplies, make at least one trade at the blacksmith, and bring a proper gift basket from the store before heading out.",
    choices: [
      {
        text: "Check the old chest beside your bed",
        target: "startChest",
        checkItem: "lantern",
        targetIfHasItem: "startChestEmpty"
      },
      { text: "Head to the village square", target: "villageSquare" }
    ]
  },

  startChest: {
    text:
      "Inside the chest you find a sturdy lantern.\n\n" +
      "That will help if you choose the forest path.",
    choices: [
      { text: "Pack the lantern and continue", target: "start", giveItem: "lantern", hideIfHasItem: "lantern" },
      { text: "Leave it for now", target: "start" }
    ]
  },

  startChestEmpty: {
    text:
      "You open the old chest again.\n\n" +
      "It's empty — you already took the lantern earlier.",
    choices: [{ text: "Back away from the chest", target: "start" }]
  },

  wakeUp: {
    text:
      "You wake up in your bed again, sore but safe.\n\n" +
      "If you still want to reach Grandma's house, prepare better and try again.",
    choices: [{ text: "Go to the village square", target: "villageSquare" }]
  },

  villageSquare: {
    text:
      "The square is busy. You can gather supplies, trade, explore the mine, or choose a route to Grandma's house.",
    choices: [
      { text: "Visit the orchard", target: "orchard" },
      { text: "Visit the tool shed", target: "toolShed" },
      { text: "Visit the blacksmith", target: "blacksmith" },
      { text: "Visit the general store", target: "generalStore" },
      {
        text: "Explore the village mine",
        target: "mineEntrance",
        requiredItem: "lantern",
        missingTarget: "needLanternMine"
      },
      { text: "Visit the village shrine", target: "villageShrine" },

      {
        text: "Take the forest route",
        target: "forestTrail",
        requiredFlag: "madeBlacksmithTrade",
        missingFlagTarget: "needBlacksmithTrade",
        requiredItem: "lantern",
        missingTarget: "needLantern"
      },
      {
        text: "Take the river route",
        target: "riverDock",
        requiredFlag: "madeBlacksmithTrade",
        missingFlagTarget: "needBlacksmithTrade",
        requiredItem: "rope",
        missingTarget: "needRope"
      },
      {
        text: "Take the mountain route",
        target: "mountainFoot",
        requiredFlag: "madeBlacksmithTrade",
        missingFlagTarget: "needBlacksmithTrade",
        requiredItem: "climbing pick",
        missingTarget: "needPick"
      },

      { text: "Return home", target: "start" }
    ]
  },

  villageShrine: {
    text:
      "You step into the village shrine.\n\n" +
      "A gentle fairy appears in a swirl of light and offers to restore your strength.",
    fullHeal: true,
    choices: [{ text: "Thank the fairy and return to the square", target: "villageSquare" }]
  },

  orchard: {
    text: "You walk between rows of apple trees heavy with fruit.",
    choices: [
      { text: "Search for ripe fruit", target: "orchardFound" },
      { text: "Back to village square", target: "villageSquare" }
    ]
  },

  orchardFound: {
    text:
      "You find a basket of ripe apples near the base of a tree.\n\n" +
      "These could be traded at the store.",
    choices: [
      { text: "Pack them and continue", target: "orchard", giveItem: "apples", hideIfHasItem: "apples" },
      { text: "Leave them and continue", target: "orchard" }
    ]
  },

  toolShed: {
    text: "The shed is cluttered with old travel gear.",
    choices: [
      { text: "Search the hook rack", target: "toolShedRope" },
      { text: "Search the armor shelf", target: "toolShedArmor" },
      { text: "Back to village square", target: "villageSquare" }
    ]
  },

  toolShedRope: {
    text: "You pull down a sturdy rope from a wall hook.",
    choices: [
      { text: "Pack it", target: "toolShed", giveItem: "rope", hideIfHasItem: "rope" },
      { text: "Leave it", target: "toolShed" }
    ]
  },

  toolShedArmor: {
    text: "You find simple leather armor that still fits.",
    choices: [
      { text: "Wear it", target: "toolShed", giveArmor: "simple armor", hideIfHasArmor: "simple armor" },
      { text: "Leave it", target: "toolShed" }
    ]
  },

  blacksmith: {
    text:
      "The blacksmith says: 'I only trade for rupees.'\n\n" +
      "You must complete at least one trade here before leaving town routes.",
    choices: [
      { text: "Trade 30 rupees for a sword", target: "blacksmith", spendRupees: 30, giveWeapon: "sword", setFlag: "madeBlacksmithTrade", missingTarget: "needRupees" },
      { text: "Trade 30 rupees for a bow", target: "blacksmith", spendRupees: 30, giveWeapon: "bow", setFlag: "madeBlacksmithTrade", missingTarget: "needRupees" },
      { text: "Trade 50 rupees for chain armor", target: "blacksmith", spendRupees: 50, giveArmor: "chain armor", setFlag: "madeBlacksmithTrade", missingTarget: "needRupees" },
      { text: "Trade 20 rupees for a climbing pick", target: "blacksmith", spendRupees: 20, giveItem: "climbing pick", setFlag: "madeBlacksmithTrade", missingTarget: "needRupees" },
      { text: "Back to village square", target: "villageSquare" }
    ]
  },

  generalStore: {
    text: "The shopkeeper smiles: 'I can trade apples for a gift basket for your grandma.'",
    choices: [
      {
        text: "Ask for the gift basket trade",
        target: "generalStoreTrade",
        requiredItem: "apples",
        missingTarget: "needApplesTrade"
      },
      { text: "Back to village square", target: "villageSquare" }
    ]
  },

  generalStoreTrade: {
    text: "The shopkeeper nods and prepares the trade.",
    choices: [
      {
        text: "Complete trade",
        target: "generalStore",
        consumeItems: ["apples"],
        giveItem: "gift basket",
        setFlag: "madeStoreTrade",
        hideIfHasItem: "gift basket"
      }
    ]
  },

  needBlacksmithTrade: {
    text:
      "You pause at the edge of town.\n\n" +
      "You should complete at least one blacksmith trade before taking a route.",
    choices: [{ text: "Go to the blacksmith", target: "blacksmith" }, { text: "Back to village square", target: "villageSquare" }]
  },

  needLantern: {
    text: "The forest is too dark without a lantern.",
    choices: [{ text: "Go back to prepare", target: "villageSquare" }]
  },

  needRope: {
    text: "The river path is unsafe without a rope.",
    choices: [{ text: "Go back to prepare", target: "villageSquare" }]
  },

  needPick: {
    text: "The mountain route needs a climbing pick.",
    choices: [{ text: "Go back to prepare", target: "villageSquare" }]
  },

  needApplesTrade: {
    text: "You need apples before the store can trade you a gift basket.",
    choices: [{ text: "Go to the orchard", target: "orchard" }, { text: "Back to village square", target: "villageSquare" }]
  },

  needRupees: {
    text:
      "You do not have enough rupees for that trade.\n\n" +
      "Try the mine to collect more rupees.",
    choices: [{ text: "Go to the mine", target: "mineEntrance" }, { text: "Back to blacksmith", target: "blacksmith" }]
  },

  needGiftBasket: {
    text:
      "You cannot arrive empty-handed.\n\n" +
      "Grandma's gate stays shut until you bring a gift basket.",
    choices: [{ text: "Return toward town", target: "villageSquare" }]
  },

  needLanternMine: {
    text:
      "You step toward the mine entrance, but the tunnel is pitch black.\n\n" +
      "You should find the lantern before entering.",
    choices: [{ text: "Go back to the village square", target: "villageSquare" }]
  },

  mineEntrance: {
    text:
      "You stand at the entrance of Pinehill Mine.\n\n" +
      "You can always leave safely, or continue deeper and risk what you find.",
    choices: [
      { text: "Continue deeper into the mine", target: "mineDeeper" },
      { text: "Leave the mine", target: "villageSquare" }
    ]
  },

  mineDeeper: {
    text:
      "The tunnels split and twist.\n\n" +
      "You can keep exploring, or leave while you still can.",
    choices: [
      { text: "Keep exploring", target: "mineContinue" },
      { text: "Leave the mine", target: "villageSquare" }
    ]
  },

  mineGemFound: {
    text: "You spot an old coin pouch tucked into a crack in the rock wall.",
    choices: [
      { text: "Continue exploring", target: "mineContinue" },
      { text: "Leave the mine", target: "villageSquare" }
    ]
  },

  mineVictory: {
    text: "You survive the mine encounter.",
    choices: [
      { text: "Continue exploring", target: "mineContinue" },
      { text: "Leave the mine", target: "villageSquare" }
    ]
  },

  forestTrail: {
    text: "You enter the forest trail. Lantern light dances on the trees.",
    choices: [
      { text: "Continue to Whispering Pines", target: "forestPines" },
      { text: "Back to village square", target: "villageSquare" }
    ]
  },
  forestPines: {
    text: "The pines creak in the wind. A narrow path leads deeper.",
    choices: [
      { text: "Continue to Creek Bend", target: "forestCreek" },
      { text: "Back to Forest Trail", target: "forestTrail" }
    ]
  },
  forestCreek: {
    text: "You cross a shallow creek. Tracks in the mud look fresh.",
    choices: [
      { text: "Move toward the clearing", target: "wolfBattle" },
      { text: "Back to Whispering Pines", target: "forestPines" }
    ]
  },
  wolfBattle: {
    type: "battle",
    text: "A shadow wolf leaps from the brush!",
    enemy: { id: "wolf", name: "Shadow Wolf", maxHp: 14, rewards: { rupees: [10, 18] } },
    retreatTarget: "forestCreek",
    onWinTarget: "fireflyBridge",
    clearedText:
      "The shadow wolf has already been defeated.\n\n" +
      "The clearing is quiet now.",
    clearedChoices: [
      { text: "Continue to Firefly Bridge", target: "fireflyBridge" },
      { text: "Back to Creek Bend", target: "forestCreek" }
    ]
  },
  fireflyBridge: {
    text: "You cross a tiny bridge lit by fireflies.",
    choices: [
      { text: "Continue to Mossy Turn", target: "forestTurn" },
      { text: "Back to Wolf Clearing", target: "wolfBattle" }
    ]
  },
  forestTurn: {
    text: "The path bends around mossy stones. You can smell chimney smoke nearby.",
    choices: [
      { text: "Approach Grandma's forest gate", target: "forestGate" },
      { text: "Back to Firefly Bridge", target: "fireflyBridge" }
    ]
  },
  forestGate: {
    text: "You reach Grandma's forest gate.",
    choices: [
      { text: "Knock and offer your basket", target: "grandmaHouse", requiredItem: "gift basket", missingTarget: "needGiftBasket" },
      { text: "Go back", target: "forestTurn" }
    ]
  },

  riverDock: {
    text: "You walk to the dock. The rope helps you steady along wet planks.",
    choices: [
      { text: "Continue to Reed Bank", target: "reedBank" },
      { text: "Back to village square", target: "villageSquare" }
    ]
  },
  reedBank: {
    text: "Tall reeds sway. You hear footsteps behind an old cart.",
    choices: [
      { text: "Move to the ford", target: "riverFord" },
      { text: "Back to river dock", target: "riverDock" }
    ]
  },
  riverFord: {
    text: "Cold water rushes over stones. A masked bandit blocks the way.",
    choices: [
      { text: "Face the bandit", target: "banditBattle" },
      { text: "Back to Reed Bank", target: "reedBank" }
    ]
  },
  banditBattle: {
    type: "battle",
    text: "Bandit Scout draws a blade and attacks!",
    enemy: { id: "bandit", name: "Bandit Scout", maxHp: 16, rewards: { rupees: [15, 25] } },
    retreatTarget: "riverFord",
    onWinTarget: "oldFerry",
    clearedText:
      "The bandit scout has already been defeated.\n\n" +
      "The ford is safe for now.",
    clearedChoices: [
      { text: "Continue to Old Ferry", target: "oldFerry" },
      { text: "Back to River Ford", target: "riverFord" }
    ]
  },
  oldFerry: {
    text: "You push an old ferry rope and glide across the river.",
    choices: [
      { text: "Continue to Willow Bend", target: "willowBend" },
      { text: "Back to Bandit Ford", target: "banditBattle" }
    ]
  },
  willowBend: {
    text: "Willow branches form a tunnel over the path.",
    choices: [
      { text: "Approach Grandma's river gate", target: "riverGate" },
      { text: "Back to Old Ferry", target: "oldFerry" }
    ]
  },
  riverGate: {
    text: "You reach Grandma's river gate.",
    choices: [
      { text: "Knock and offer your basket", target: "grandmaHouse", requiredItem: "gift basket", missingTarget: "needGiftBasket" },
      { text: "Go back", target: "willowBend" }
    ]
  },

  mountainFoot: {
    text: "You arrive at the mountain foot. Your climbing pick helps with grip.",
    choices: [
      { text: "Climb to switchbacks", target: "switchbacks" },
      { text: "Back to village square", target: "villageSquare" }
    ]
  },
  switchbacks: {
    text: "The switchback trail is steep but steady.",
    choices: [
      { text: "Continue to cliff ledge", target: "cliffLedge" },
      { text: "Back to mountain foot", target: "mountainFoot" }
    ]
  },
  cliffLedge: {
    text: "A rumble shakes the cliff. A stone guardian steps forward.",
    choices: [
      { text: "Stand your ground", target: "golemBattle" },
      { text: "Back to switchbacks", target: "switchbacks" }
    ]
  },
  golemBattle: {
    type: "battle",
    text: "Granite Golem blocks the pass!",
    enemy: { id: "golem", name: "Granite Golem", maxHp: 18, rewards: { rupees: [20, 35] } },
    retreatTarget: "cliffLedge",
    onWinTarget: "highPass",
    clearedText:
      "The granite golem has already been defeated.\n\n" +
      "Broken stone marks your victory.",
    clearedChoices: [
      { text: "Continue to High Pass", target: "highPass" },
      { text: "Back to Cliff Ledge", target: "cliffLedge" }
    ]
  },
  highPass: {
    text: "Cold wind whistles through the high pass.",
    choices: [
      { text: "Continue to Stone Arch", target: "stoneArch" },
      { text: "Back to Golem Pass", target: "golemBattle" }
    ]
  },
  stoneArch: {
    text: "You pass beneath a giant stone arch and see smoke from Grandma's chimney.",
    choices: [
      { text: "Approach Grandma's mountain gate", target: "mountainGate" },
      { text: "Back to High Pass", target: "highPass" }
    ]
  },
  mountainGate: {
    text: "You reach Grandma's mountain gate.",
    choices: [
      { text: "Knock and offer your basket", target: "grandmaHouse", requiredItem: "gift basket", missingTarget: "needGiftBasket" },
      { text: "Go back", target: "stoneArch" }
    ]
  },

  grandmaHouse: {
    text:
      "Grandma opens the door with a big smile.\n\n" +
      "'You made it! You prepared, traded, and made it safely.'\n\n" +
      "Ending unlocked: Safe Arrival.",
    choices: [{ text: "Play again (reset everything)", target: "start", resetGame: true }]
  }
};
```

✅ You should now be able to copy/paste one complete file.

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
