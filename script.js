// Select the elements we want to change
const suitcase = document.getElementById("suitcase");
const suitcaseInside = document.getElementById("suitcaseInside");
const toggleButton = document.getElementById("toggleButton");
const statusText = document.getElementById("status");
const memory = document.getElementById("memory");
const messageInput = document.getElementById("message");
const savedMessage = document.getElementById("savedMessage");
const objects = document.querySelectorAll(".object");

// Give each object its own story and background color
const stories = {
  scarf: {
    text: "Before I left, my mother packed this scarf. I thought it was just for the cold. Now it feels like a piece of home.",
    background: "#f3ddd4"
  },
  ticket: {
    text: "This ticket took me to a new city. One journey ended, but another began the moment I arrived.",
    background: "#dce6ee"
  },
  note: {
    text: "Some words are too small to say goodbye with, but too important to leave behind.",
    background: "#eee3cf"
  }
};

// Open or close the suitcase when the button is clicked
toggleButton.addEventListener("click", function () {
  const isOpen = suitcase.classList.toggle("is-open");

  suitcaseInside.hidden = !isOpen;
  toggleButton.textContent = isOpen
    ? "Close the suitcase"
    : "Open the suitcase";

  statusText.textContent = isOpen
    ? "The suitcase is open. Choose an object."
    : "The suitcase is closed.";
});

// Show a story and change the background when an object is clicked
objects.forEach(function (objectButton) {
  objectButton.addEventListener("click", function () {
    const itemName = objectButton.dataset.item;
    const story = stories[itemName];

    memory.textContent = story.text;
    document.body.style.background = story.background;
    statusText.textContent = "You found a memory inside the suitcase.";

    objects.forEach(function (button) {
      button.setAttribute("aria-pressed", "false");
    });

    objectButton.setAttribute("aria-pressed", "true");
  });
});

// Show the message as the user types
messageInput.addEventListener("input", function () {
  const message = messageInput.value.trim();

  savedMessage.textContent = message
    ? `Your note: “${message}”`
    : "";

  // Save the message in the browser
  try {
    window.localStorage.setItem("suitcaseMessage", messageInput.value);
  } catch (error) {
    // Keep the other interactions working if storage is unavailable
  }
});

// Restore the saved message when the page loads
try {
  const previousMessage = window.localStorage.getItem("suitcaseMessage");

  if (previousMessage) {
    messageInput.value = previousMessage;
    savedMessage.textContent = `Your note: “${previousMessage.trim()}”`;
  }
} catch (error) {
  // Some browsers restrict storage when opening a local HTML file
}