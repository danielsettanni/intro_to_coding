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

1. Create a file named:

   `script.js`

2. Paste this full code:

```javascript
const storyTextEl = document.getElementById("storyText");
const choicesEl = document.getElementById("choices");
const statusTextEl = document.getElementById("statusText");

const hpBadgeEl = document.getElementById("hpBadge");
const attackBadgeEl = document.getElementById("attackBadge");
const defenseBadgeEl = document.getElementById("defenseBadge");

const generalInventoryEl = document.getElementById("generalInventory");
const weaponInventoryEl = document.getElementById("weaponInventory");
const armorInventoryEl = document.getElementById("armorInventory");
const inventoryGridEl = document.getElementById("inventoryGrid");
let rupeesInventoryEl = document.getElementById("rupeesInventory");

const MAX_HP = 20;

let ADVERSARIES = { weak: [], average: [], strong: [] };
let ITEMS = {};

async function loadAdversaries() {
  const res = await fetch("./adversaries.json");
  if (!res.ok) throw new Error("Failed to load adversaries.json");
  ADVERSARIES = await res.json();
}

async function loadItems() {
  const res = await fetch("./items.json");
  if (!res.ok) throw new Error("Failed to load items.json");
  ITEMS = await res.json();
}

function createOwnedItemsMap() {
  const map = {};
  Object.keys(ITEMS).forEach((itemKey) => {
    map[itemKey] = false;
  });
  return map;
}

function createInitialState() {
  return {
    hp: MAX_HP,
    generalInventory: [],
    weaponInventory: [],
    armorInventory: [],
    equippedWeapon: null,
    equippedArmor: null,
    flags: {},
    defeatedEnemies: {},
    enemyHp: {},
    rupees: 0,
    mineEncounter: null,
    lastMineRewardText: "",
    ownedItems: createOwnedItemsMap()
  };
}

let state = createInitialState();

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function hasGeneral(item) {
  return state.generalInventory.includes(item);
}
function hasWeapon(item) {
  return state.weaponInventory.includes(item);
}
function hasArmor(item) {
  return state.armorInventory.includes(item);
}

function addGeneral(item) {
  if (item && !hasGeneral(item)) state.generalInventory.push(item);
  if (item && state.ownedItems[item] !== undefined) state.ownedItems[item] = true;
}
function removeGeneral(item) {
  state.generalInventory = state.generalInventory.filter((x) => x !== item);
  if (item && state.ownedItems[item] !== undefined) state.ownedItems[item] = false;
}
function addWeapon(item) {
  if (!item) return;
  if (!hasWeapon(item)) state.weaponInventory.push(item);
  state.equippedWeapon = item;
  if (state.ownedItems[item] !== undefined) state.ownedItems[item] = true;
}
function addArmor(item) {
  if (!item) return;
  if (!hasArmor(item)) state.armorInventory.push(item);
  state.equippedArmor = item;
  if (state.ownedItems[item] !== undefined) state.ownedItems[item] = true;
}

function weaponMultiplier() {
  return state.equippedWeapon ? 2 : 1;
}
function armorMultiplier() {
  if (state.equippedArmor === "chain armor") return 2;
  if (state.equippedArmor === "simple armor") return 1.5;
  return 1;
}

function ensureRupeesSection() {
  if (rupeesInventoryEl || !inventoryGridEl) return;

  const box = document.createElement("div");
  box.className = "invBox";
  box.innerHTML = `
    <h3>Rupees</h3>
    <p id="rupeesInventory">0</p>
  `;
  inventoryGridEl.appendChild(box);
  rupeesInventoryEl = document.getElementById("rupeesInventory");
}

function renderHudAndInventory() {
  hpBadgeEl.textContent = `HP: ${state.hp} / ${MAX_HP}`;
  attackBadgeEl.textContent = `Attack x${weaponMultiplier()}`;
  defenseBadgeEl.textContent = `Defense x${armorMultiplier()}`;

  const itemsText =
    state.generalInventory.length > 0 ? state.generalInventory.join(", ") : "(empty)";
  generalInventoryEl.textContent = itemsText;

  weaponInventoryEl.textContent =
    state.weaponInventory.length > 0
      ? `${state.weaponInventory.join(", ")} (equipped: ${state.equippedWeapon})`
      : "(none)";

  armorInventoryEl.textContent =
    state.armorInventory.length > 0
      ? `${state.armorInventory.join(", ")} (equipped: ${state.equippedArmor})`
      : "(none)";

  ensureRupeesSection();
  if (rupeesInventoryEl) {
    rupeesInventoryEl.textContent = String(state.rupees);
  }
}

function spendRupees(amount) {
  if (!Number.isFinite(amount) || amount <= 0) return;
  state.rupees = Math.max(0, state.rupees - amount);
}

function choiceIsVisible(choice) {
  if (choice.hideIfFlag && state.flags[choice.hideIfFlag]) return false;
  return true;
}

function applyChoiceEffects(choice) {
  if (choice.consumeItems) choice.consumeItems.forEach(removeGeneral);
  if (choice.giveItem) addGeneral(choice.giveItem);
  if (choice.giveWeapon) addWeapon(choice.giveWeapon);
  if (choice.giveArmor) addArmor(choice.giveArmor);
  if (choice.setFlag) state.flags[choice.setFlag] = true;
  if (choice.heal) state.hp = Math.min(MAX_HP, state.hp + choice.heal);
  if (choice.resetGame) state = createInitialState();
}

function renderInfoStep(message, returnTarget) {
  storyTextEl.innerHTML = message.replaceAll("\n", "<br>");
  choicesEl.innerHTML = "";

  const backBtn = document.createElement("button");
  backBtn.textContent = "Continue";
  backBtn.onclick = () => goToNode(returnTarget);
  choicesEl.appendChild(backBtn);

  renderHudAndInventory();
  statusTextEl.textContent = "Info";
}

function getDuplicateMessage(choice) {
  if (choice.giveItem === "lantern") {
    return "You open the chest again.\n\nIt's empty now — you already took the lantern.";
  }
  if (choice.giveItem === "gift basket") {
    return "The shopkeeper checks the shelf.\n\n'Sorry, gift baskets are out of stock. You already got the last one.'";
  }
  if (choice.giveWeapon) {
    return `The blacksmith shakes their head.\n\n'You already have a ${choice.giveWeapon}. I won't trade a second one.'`;
  }
  if (choice.giveArmor) {
    return `The blacksmith says:\n\n'You already have ${choice.giveArmor}. One set is enough.'`;
  }
  if (choice.giveItem) {
    const label = ITEMS[choice.giveItem]?.description || choice.giveItem;
    return `You check again.\n\nYou already have ${label}.`;
  }
  return "Nothing new happens here.";
}

function resolveChoiceTarget(choice, nodeId) {
  let resolvedTarget = choice.target || nodeId;

  if (choice.checkItem && choice.targetIfHasItem && hasGeneral(choice.checkItem)) {
    resolvedTarget = choice.targetIfHasItem;
  } else if (choice.checkItem && choice.targetIfMissingItem && !hasGeneral(choice.checkItem)) {
    resolvedTarget = choice.targetIfMissingItem;
  }

  return resolvedTarget;
}

function applyVillageSquareButtonColors(button, choice) {
  const inTownTargets = new Set([
    "orchard",
    "toolShed",
    "blacksmith",
    "generalStore",
    "mineEntrance",
    "villageShrine"
  ]);

  const leavingTownTargets = new Set([
    "forestTrail",
    "riverDock",
    "mountainFoot"
  ]);

  if (choice.target === "start") {
    button.style.backgroundColor = "#16a34a";
    button.style.color = "#ffffff";
    return;
  }

  if (inTownTargets.has(choice.target)) {
    button.style.backgroundColor = "#2563eb";
    button.style.color = "#ffffff";
    return;
  }

  if (leavingTownTargets.has(choice.target)) {
    button.style.backgroundColor = "#111827";
    button.style.color = "#ffffff";
  }
}

function createChoiceButton(choice, nodeId) {
  const button = document.createElement("button");
  button.textContent = choice.text;

  if (nodeId === "villageSquare") {
    applyVillageSquareButtonColors(button, choice);
  }

  button.onclick = () => {
    const resolvedTarget = resolveChoiceTarget(choice, nodeId);

    if (choice.requiredFlag && !state.flags[choice.requiredFlag]) {
      goToNode(choice.missingFlagTarget || nodeId);
      return;
    }

    if (choice.requiredItem && !hasGeneral(choice.requiredItem)) {
      goToNode(choice.missingTarget || nodeId);
      return;
    }

    if (choice.spendRupees && state.rupees < choice.spendRupees) {
      goToNode(choice.missingTarget || nodeId);
      return;
    }

    const isDuplicateItem = choice.giveItem && hasGeneral(choice.giveItem);
    const isDuplicateWeapon = choice.giveWeapon && hasWeapon(choice.giveWeapon);
    const isDuplicateArmor = choice.giveArmor && hasArmor(choice.giveArmor);

    if (isDuplicateItem || isDuplicateWeapon || isDuplicateArmor) {
      renderInfoStep(getDuplicateMessage(choice), resolvedTarget);
      return;
    }

    if (choice.spendRupees) {
      spendRupees(choice.spendRupees);
    }

    applyChoiceEffects(choice);

    if (resolvedTarget === "mineContinue") {
      handleMineContinue();
      return;
    }

    goToNode(resolvedTarget);
  };
  return button;
}

function renderBattle(nodeId, node) {
  const enemy = node.enemy;
  const enemyId = enemy.id;

  if (state.defeatedEnemies[enemyId]) {
    storyTextEl.innerHTML = node.clearedText.replaceAll("\n", "<br>");
    choicesEl.innerHTML = "";
    node.clearedChoices.forEach((choice) => {
      if (!choiceIsVisible(choice)) return;
      choicesEl.appendChild(createChoiceButton(choice, nodeId));
    });
    statusTextEl.textContent = `Current page: ${nodeId} | ${enemy.name} already defeated`;
    renderHudAndInventory();
    return;
  }

  if (state.enemyHp[enemyId] == null) state.enemyHp[enemyId] = enemy.maxHp;
  const enemyCurrentHp = state.enemyHp[enemyId];

  storyTextEl.innerHTML = (
    `${node.text}\n\n` +
    `Your HP: ${state.hp}/${MAX_HP}\n` +
    `${enemy.name} HP: ${enemyCurrentHp}/${enemy.maxHp}`
  ).replaceAll("\n", "<br>");

  choicesEl.innerHTML = "";

  const attackBtn = document.createElement("button");
  attackBtn.textContent = "Attack";
  attackBtn.onclick = () => {
    const playerRoll = rollDie();
    const enemyRoll = rollDie();

    const playerDamage = Math.max(1, Math.ceil(playerRoll * weaponMultiplier()));
    const enemyDamage = Math.max(1, Math.ceil(enemyRoll / armorMultiplier()));

    state.enemyHp[enemyId] -= playerDamage;
    state.hp -= enemyDamage;

    if (state.hp <= 0) {
      state.hp = MAX_HP;
      state.enemyHp[enemyId] = enemy.maxHp;
      goToNode("wakeUp");
      return;
    }

    if (state.enemyHp[enemyId] <= 0) {
      state.defeatedEnemies[enemyId] = true;
      state.enemyHp[enemyId] = enemy.maxHp;
      goToNode(node.onWinTarget);
      return;
    }

    goToNode(nodeId);
  };

  const retreatBtn = document.createElement("button");
  retreatBtn.textContent = "Retreat";
  retreatBtn.onclick = () => {
    state.enemyHp[enemyId] = enemy.maxHp;
    goToNode(node.retreatTarget);
  };

  choicesEl.appendChild(attackBtn);
  choicesEl.appendChild(retreatBtn);

  statusTextEl.textContent = `Current page: ${nodeId} | Battle`;
  renderHudAndInventory();
}

function startMineEncounter(classification) {
  const pool = ADVERSARIES[classification] || [];
  if (pool.length === 0) {
    goToNode("mineDeeper");
    return;
  }

  const picked = pool[Math.floor(Math.random() * pool.length)];
  let hp = picked.hitPoints || MAX_HP;

  if (classification === "average") hp = MAX_HP;
  if (classification === "strong") hp = Math.ceil(MAX_HP * (1.2 + Math.random() * 0.3));

  state.mineEncounter = {
    ...picked,
    classification,
    currentHp: hp,
    maxHp: hp
  };

  goToNode("mineBattle");
}

function handleMineContinue() {
  const roll = Math.random() * 100;

  if (roll < 40) {
    goToNode("mineDeeper");
    return;
  }

  if (roll < 52) {
    const foundRupees = randomInt(5, 20);
    state.rupees += foundRupees;
    state.lastMineRewardText = `You found a hidden pouch with ${foundRupees} rupees.`;
    goToNode("mineGemFound");
    return;
  }

  if (roll < 75) {
    startMineEncounter("weak");
    return;
  }

  if (roll < 95) {
    startMineEncounter("average");
    return;
  }

  startMineEncounter("strong");
}

function renderMineBackstory() {
  if (!state.mineEncounter) {
    goToNode("mineEntrance");
    return;
  }

  const e = state.mineEncounter;
  storyTextEl.innerHTML =
    `${e.name} (${e.classification})\n\n${e.backstory || "No backstory available."}`.replaceAll("\n", "<br>");
  choicesEl.innerHTML = "";

  const backBtn = document.createElement("button");
  backBtn.textContent = "Return to the encounter";
  backBtn.onclick = () => goToNode("mineBattle");
  choicesEl.appendChild(backBtn);

  renderHudAndInventory();
  statusTextEl.textContent = "Mine encounter backstory";
}

function renderMineBattle() {
  const e = state.mineEncounter;
  if (!e) {
    goToNode("mineEntrance");
    return;
  }

  storyTextEl.innerHTML = (
    `A ${e.name} appears!\n\n` +
    `Classification: ${e.classification}\n` +
    `Your HP: ${state.hp}/${MAX_HP}\n` +
    `${e.name} HP: ${e.currentHp}/${e.maxHp}`
  ).replaceAll("\n", "<br>");
  choicesEl.innerHTML = "";

  const attackBtn = document.createElement("button");
  attackBtn.textContent = "Attack";
  attackBtn.onclick = () => {
    const playerDamage = Math.max(1, Math.ceil(rollDie() * weaponMultiplier()));
    const enemyDamage = Math.max(1, Math.ceil(rollDie() / armorMultiplier()));

    e.currentHp -= playerDamage;
    state.hp -= enemyDamage;

    if (state.hp <= 0) {
      state.hp = MAX_HP;
      state.mineEncounter = null;
      goToNode("wakeUp");
      return;
    }

    if (e.currentHp <= 0) {
      const [rMin, rMax] = e.rewardRupeesRange || [0, 0];
      const rupees = randomInt(rMin, rMax);
      state.rupees += rupees;

      state.lastMineRewardText = `You defeated ${e.name}. Rewards: ${rupees} rupees.`;
      state.mineEncounter = null;
      goToNode("mineVictory");
      return;
    }

    goToNode("mineBattle");
  };

  const fleeBtn = document.createElement("button");
  fleeBtn.textContent = "Flee";
  fleeBtn.onclick = () => {
    state.mineEncounter = null;
    goToNode("mineEntrance");
  };

  const loreBtn = document.createElement("button");
  loreBtn.textContent = "View more about the enemy";
  loreBtn.onclick = () => goToNode("enemyBackstory");

  choicesEl.appendChild(attackBtn);
  choicesEl.appendChild(fleeBtn);
  choicesEl.appendChild(loreBtn);

  renderHudAndInventory();
  statusTextEl.textContent = "Mine encounter";
}

function goToNode(nodeId) {
  if (nodeId === "mineBattle") {
    renderMineBattle();
    return;
  }

  if (nodeId === "enemyBackstory") {
    renderMineBackstory();
    return;
  }

  const node = STORY[nodeId];

  if (!node) {
    storyTextEl.textContent = "Oops! That story page does not exist yet.";
    choicesEl.innerHTML = "";
    statusTextEl.textContent = `Missing node: ${nodeId}`;
    return;
  }

  if (node.type === "battle") {
    renderBattle(nodeId, node);
    return;
  }

  let nodeText = node.text;

  if (node.fullHeal) {
    const wasHp = state.hp;
    state.hp = MAX_HP;
    nodeText += wasHp < MAX_HP
      ? "\n\nThe fairy's magic restores your health to full."
      : "\n\nThe fairy smiles. You are already at full health.";
  }

  if (nodeId === "mineGemFound" || nodeId === "mineVictory") {
    storyTextEl.innerHTML = `${nodeText}\n\n${state.lastMineRewardText}`.replaceAll("\n", "<br>");
  } else {
    storyTextEl.innerHTML = nodeText.replaceAll("\n", "<br>");
  }

  choicesEl.innerHTML = "";

  node.choices.forEach((choice) => {
    if (!choiceIsVisible(choice)) return;
    choicesEl.appendChild(createChoiceButton(choice, nodeId));
  });

  renderHudAndInventory();
  statusTextEl.textContent = `Current page: ${nodeId}`;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function init() {
  try {
    await Promise.all([loadAdversaries(), loadItems()]);
  } catch (error) {
    console.error("Failed to initialize data files:", error);
    statusTextEl.textContent = "Could not load data files. Some features may be limited.";
  }

  state = createInitialState();
  ensureRupeesSection();
  goToNode("start");
}

init();
```

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
