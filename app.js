  });
});

/* Create floating hearts */
function burst(emojis, count = 20) {
  for (let i = 0; i < count; i++) {
    const item = document.createElement("span");

    item.className = "particle";
    item.textContent =
      emojis[Math.floor(Math.random() * emojis.length)];

    item.style.left =
      `${48 + (Math.random() * 20 - 10)}vw`;

    item.style.top =
      `${55 + (Math.random() * 10 - 5)}vh`;

    item.style.setProperty(
      "--x",
      `${Math.random() * 260 - 130}px`
    );

    item.style.setProperty(
      "--y",
      `${-180 - Math.random() * 500}px`
    );

    item.style.animationDelay =
      `${Math.random() * 0.35}s`;

    document.body.appendChild(item);

    setTimeout(() => {
      item.remove();
    }, 3300);
  }
}

/* Small notification */
function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1700);
}

/* Final smile button */
document
  .getElementById("smileBtn")
  .addEventListener("click", () => {

    burst(
      ["❤️", "💗", "🥰", "✨", "🌸"],
      35
    );

    showToast(
      "That's all I wanted to see 🥰❤️"
    );
  });


/*
  Restore the user's progress after refresh.

  The current screen is stored in localStorage
  for 24 hours.

  Example:

  If she reaches:

      "Please smile 🥰"

  and refreshes the page...

  the page will still open on:

      "Please smile 🥰"

  until the 24-hour period expires.
*/

const saved = getState();

if (saved) {
  showScreen(saved.screen, false);
} else {
  saveState("welcome");
}
