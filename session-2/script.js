// STORY ENGINE (Session 2)
// This code renders any node from STORY by ID.

const storyTextEl = document.getElementById("storyText");
const choicesEl = document.getElementById("choices");
const debugEl = document.getElementById("debug");

// Render a node by its key (like "start", "cave", etc.)
function goToNode(nodeId) {
  const node = STORY[nodeId];

  // Safety check: if a target doesn't exist, show an error.
  if (!node) {
    storyTextEl.textContent = "Oops! That part of the story doesn't exist yet.";
    choicesEl.innerHTML = "";
    debugEl.textContent = `Missing node: ${nodeId}`;
    return;
  }

  // Show story text
  // (Replace \n with line breaks for nicer formatting)
  storyTextEl.innerHTML = node.text.replaceAll("\n", "<br>");

  // Clear old buttons
  choicesEl.innerHTML = "";

  // Create one button for each choice
  node.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.textContent = choice.text;

    // When clicked, jump to the target node
    button.onclick = () => goToNode(choice.target);

    choicesEl.appendChild(button);
  });

  // Helpful for teaching/debugging: show current node id
  debugEl.textContent = `Current page: ${nodeId}`;
}

// Start the game at the "start" node
goToNode("start");