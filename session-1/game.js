// PINEHILL QUEST — Session 1
// JavaScript makes the page DO things.

// 1) Find the parts of the page we will change (using their ids)
const chestEl = document.getElementById("chest");
const gemsEl = document.getElementById("gems");
const messageEl = document.getElementById("message");

// 2) A variable remembers how many gems we have
let gems = 0;

// 3) What happens when someone clicks the chest
chestEl.onclick = () => {
  console.log("The chest was clicked!");

  gems = gems + 1;
  gemsEl.textContent = "💎 " + gems;

  chestEl.textContent = "💎";
  messageEl.textContent = "You opened the chest and found a gem!";
};
