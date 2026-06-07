# ADAPTING.MD
## How to Build Your Own Story Using the Session 5 Baseline

This file explains how to reuse the Session 5 project as a **template** for your own game.

The baseline is designed so you can usually keep these files the same:

- `index.html`
- `script.js`
- `style.css`

…and customize your game mostly by editing:

- `story.js`
- `items.json`
- `adversaries.json`

---

## 1) Recommended Workflow (Fast + Safe)

1. Duplicate the `session-5` folder and rename it (example: `session-5-my-story`).
2. Keep `index.html`, `script.js`, and `style.css` unchanged at first.
3. Edit `story.js` to change world, locations, and choices.
4. Edit `items.json` to match your item names/descriptions.
5. Edit `adversaries.json` to define your own enemies.
6. Run and test after each small change.

✅ Rule of thumb: Change one thing, run it, confirm it works.

---

## 2) What to Edit in `story.js`

Your story is made of **nodes**.  
Each node has text + choices.

Basic node:
```js
myNode: {
  text: "You stand at a crossroads.",
  choices: [
    { text: "Go left", target: "leftPath" },
    { text: "Go right", target: "rightPath" }
  ]
}
```

### Common choice fields supported by the baseline

- `text` – button label
- `target` – next node id
- `requiredItem` – item needed
- `missingTarget` – where to go if item missing
- `requiredFlag` – story flag needed
- `missingFlagTarget` – where to go if flag missing
- `giveItem`, `giveWeapon`, `giveArmor`
- `consumeItems` (array)
- `setFlag`
- `spendRupees`
- `checkItem`, `targetIfHasItem`, `targetIfMissingItem`
- `resetGame`

---

## 3) Battle Nodes in `story.js`

A battle node uses `type: "battle"`.

```js
wolfBattle: {
  type: "battle",
  text: "A wolf blocks your path!",
  enemy: { id: "wolf", name: "Forest Wolf", maxHp: 14 },
  retreatTarget: "forestPath",
  onWinTarget: "afterWolf",
  clearedText: "The wolf has already been defeated.",
  clearedChoices: [
    { text: "Continue", target: "afterWolf" }
  ]
}
```

For mine encounters, enemies are loaded from `adversaries.json`.

---

## 4) Updating `items.json`

`items.json` should include every item name you use in story choices.

If your story uses `giveItem: "magic key"`, add `"magic key"` to `items.json`.

Keep naming exact (capitalization and spaces matter).

---

## 5) Updating `adversaries.json`

Define enemy pools for mine/random battle logic:

- `weak`
- `average`
- `strong`

Each enemy should include:

- `name`
- `hitPoints`
- `backstory`
- `strengthClassification`
- `rewardRupeesRange`

Example:
```json
{
  "name": "Cave Rat",
  "hitPoints": 12,
  "backstory": "A hungry scavenger in dark tunnels.",
  "strengthClassification": "weak",
  "rewardRupeesRange": [10, 20]
}
```

---

## 6) Testing Checklist (Use Every Time)

- All `target` node names exist
- Required items match item names exactly
- Mine/adversary JSON loads without errors
- You can reach at least one ending
- Replay/reset works
- No dead-end node without choices

---

## Appendix A — When to Edit Foundation Files

You can keep baseline files unchanged for most stories.  
Edit only when needed:

### `index.html` (structure)
Edit if you want:
- New sections (quest log, minimap, custom stats)
- Different layout order
- Extra accessibility labels/text

### `script.js` (logic/engine)
Edit if you want:
- New mechanics (mana, spells, stealth, reputation)
- Different battle formula
- Save/load support
- Different inventory rules

### `style.css` (visual theme)
Edit if you want:
- New color scheme
- Font/theme changes
- Different button/card styles
- Mobile layout improvements

---

## Appendix B — Basics for Editing Foundation Files Safely

### If editing `index.html`
- Keep required IDs unless you also update `script.js`:
  - `storyText`
  - `choices`
  - `statusText`
  - inventory IDs (`generalInventory`, `weaponInventory`, `armorInventory`)
- If an ID changes, update the matching `document.getElementById(...)` call.

### If editing `script.js`
- Keep function responsibilities clear:
  - render node
  - build buttons
  - apply effects
  - render inventory/HUD
- Change one function at a time and test.
- Watch browser Console for errors.

### If editing `style.css`
- Start with colors/spacing first.
- Avoid removing class names used by HTML.
- Test readability and contrast for buttons/text.

---

## Final Advice

Start by changing only `story.js`, `items.json`, and `adversaries.json`.  
That gives you maximum creativity with minimal breakage.

When comfortable, gradually customize the foundation files.
