// JavaScript controls the INTERACTION.
// In Session 1, our goal is simple:
// Clicking a button changes the story text.

// 1) Grab HTML elements by their IDs.
// This is how we connect JavaScript to the webpage.
const storyText = document.getElementById("storyText");
const statusText = document.getElementById("statusText");

const choiceDarkButton = document.getElementById("choiceDark");
const choiceBrightButton = document.getElementById("choiceBright");

// 2) Write what should happen when a button is clicked.
// This is called an "event handler" (it handles the click event).

choiceDarkButton.onclick = () => {
  // Change the story paragraph text
  storyText.textContent =
    "You step onto the dark path. The trees seem to lean in closer. " +
    "You hear a rustling sound nearby... something is definitely watching you.";

  // Update the status line so the player sees what they chose
  statusText.textContent = "You chose: the dark path.";
};

choiceBrightButton.onclick = () => {
  storyText.textContent =
    "You follow the bright path and soon hear laughter. " +
    "A group of travelers waves at you and offers you food and a place to rest. " +
    "Tonight, you are safe.";

  statusText.textContent = "You chose: the bright path.";
};

// 3) That’s it for Session 1!
// In Session 2, we’ll replace this hard-coded story with a story 'data' file
// so students can write MANY pages without copying lots of code.