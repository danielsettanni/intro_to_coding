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
  // Keep route/pickup/trade options visible so player can get feedback story steps.
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
    button.style.backgroundColor = "#16a34a"; // green
    button.style.color = "#ffffff";
    return;
  }

  if (inTownTargets.has(choice.target)) {
    button.style.backgroundColor = "#2563eb"; // blue
    button.style.color = "#ffffff";
    return;
  }

  if (leavingTownTargets.has(choice.target)) {
    button.style.backgroundColor = "#111827"; // black
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

  // rebuild state after data load so ownedItems includes all catalog items
  state = createInitialState();
  ensureRupeesSection();
  goToNode("start");
}

init();
