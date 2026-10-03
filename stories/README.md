# 📦 Story Packs

The Pinehill Quest engine (`game.js`) can tell **any** story. Everything about the story lives in one file, `world.js`: the title, the hero, the map, the characters, the monsters, and the endings.

This folder has **four ready-made stories**. Each one works with the same engine and the same step-by-step guides as Pinehill.

---

## 🎮 Try Them First

Double-click `index.html` inside any story folder to play the finished version (it uses the Session 5 engine).

> 🗓️ **In the class repo, story files arrive one session at a time.** `world-2.js` comes with Session 2, `world-3.js` with Session 3, and so on. The preview pages arrive after Session 5. Until then, your teacher will show the previews on screen.

| Story | Folder | You are... | Vibe |
| --- | --- | --- | --- |
| **Pinehill Quest** | *(the session folders)* | a traveler visiting Grandma across the river | cozy fantasy |
| **GLITCH** | [`glitch/`](./glitch/) | a coder pulled inside a broken video game | techy, funny, a little meta |
| **Signal Lost** | [`signal-lost/`](./signal-lost/) | the last crew member on a damaged space station | sci-fi mystery |
| **The Last Lighthouse** | [`lighthouse/`](./lighthouse/) | an islander relighting a lighthouse in cursed fog | spooky (but not scary) |
| **The Midnight Heist** | [`museum-heist/`](./museum-heist/) | a young detective retaking a museum from thieves | detective caper |

Every story has a boss with **three ways past it** and **three endings**. One of those ways depends on a secret you learn in Session 4.

---

## 🧭 How to Use a Story Pack in Class

You choose your story in **Session 2**, when `world.js` is first created.

- **Session 2, Step 1:** paste `stories/<your-story>/world-2.js` into your `world.js` instead of the Pinehill code.
- **Sessions 3–5:** follow the guide as normal. When a step changes `world.js`, look for the **📦 Using a story pack?** note.
- **Stuck or behind?** Each story has a finished `world.js` for the end of every session:

| File | Matches the end of |
| --- | --- |
| `world-2.js` | Session 2: map and emoji only |
| `world-3.js` | Session 3: solid tiles, currency, key, and lock |
| `world-4.js` | Session 4: characters, shop, items, and the secret flag |
| `world-5.js` | Session 5: monsters, boss choices, and endings |

Copy the one for the session you just finished into your `world.js`, then keep going.

---

## 🔤 Every Story Uses the Same Letters

This is what makes the guides work for every story. The **emoji and words** change, but each letter always plays the same **role**:

| Letter | Role | Pinehill | GLITCH | Signal Lost | Lighthouse | Heist |
| --- | --- | --- | --- | --- | --- | --- |
| `.` | empty floor | grass | empty level | metal floor | misty grass | marble |
| `@` | hero's start | | | | | |
| `T` | wall | 🌲 | ⬛ | 🔳 | 🪨 | 🧱 |
| `~` | hazard (solid) | 🌊 | 🌀 | 🌌 | 🌊 | 🚨 |
| `$` | currency | 💎 | 🪙 | ⚡ | 🐚 | 💵 |
| `k` | key item | 🗝️ | 🔑 | 🪪 | 🗝️ | 🪪 |
| `D` | locked door | 🚪 | 🔐 | 🔒 | 🚪 | 🔒 |
| `h` | healing | 💖 | 💊 | 💉 | 🍲 | 🍩 |
| `E` | guide character | 🧙 | 🤖 | 🛰️ | 👴 | 👮 |
| `S` | shop | 🏪 | 💾 | 🤖 | 🎣 | 🦝 |
| `H` | goal | 🏠 | 🖥️ | 🚀 | 🗼 | 🏺 |
| `g` | minion | 👺 | 🐛 | 👽 | 👻 | 🦹 |
| `O` | boss | 👹 | 👾 | 🐙 | 🐉 | 🎩 |

Every map follows the same plan:

1. A **starting area** with the guide, the shop, the key, 2 currency, and a healing tile
2. A **locked door** into the second area
3. A **second area** with 5 currency, 2 minions, and another healing tile
4. A **boss** blocking the only way to the **goal**

---

## ✍️ Write Your Own Story

Copy any `world-5.js` and change it! The easiest way to start:

1. Change `STORY` (title, hero, intro, floor color, currency)
2. Swap the emoji in `TILES`
3. Rewrite the `DIALOGUE` text in your own voice
4. Rename the `MONSTERS`
5. Redraw the `MAP`, but keep the same plan (above) so the game stays winnable

See `session-5/MAKE_IT_YOURS.md` *(coming soon)* for every property you can use.
