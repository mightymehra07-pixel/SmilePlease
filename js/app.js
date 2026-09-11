const STORAGE_KEY = "smileplease_sorry_flow_v1";
const DAY = 24 * 60 * 60 * 1000;

const screens = [...document.querySelectorAll(".screen")];
const toast = document.getElementById("toast");

/* =========================
   SAVE / RESTORE PROGRESS
   ========================= */

function saveState(screenName) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      screen: screenName,
      expiresAt: Date.now() + DAY
    })
  );
}

function getState() {
  try {
    const state = JSON.parse(
      localStorage.getItem(STORAGE_KEY)
    );

    if (!state || Date.now() > state.expiresAt) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return state;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}


/* =========================
   SCREEN NAVIGATION
   ========================= */

function showScreen(name, shouldSave = true) {
  screens.forEach((screen) => {
    screen.classList.toggle(
      "active",
      screen.dataset.screen === name
    );
  });

  if (shouldSave) {
    saveState(name);
  }

  window.scrollTo(0, 0);
}


/* =========================
   NEXT BUTTONS
   ========================= */

document
  .querySelectorAll("[data-next]")
  .forEach((button) => {

    button.addEventListener("click", () => {

      showScreen(button.dataset.next);

      burst(
        ["💗", "💖", "💕", "✨"],
        12
      );

    });

  });


/* =========================
   FLOATING HEART EFFECT
   ========================= */

function burst(emojis, count = 20) {

  for (let i = 0; i < count; i++) {

    const item = document.createElement("span");

    item.className = "particle";

    item.textContent =
      emojis[
        Math.floor(
          Math.random() * emojis.length
        )
      ];

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


/* =========================
   TOAST MESSAGE
   ========================= */

function showToast(text) {

  toast.textContent = text;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 1700);

}


/* =========================
   FINAL SMILE BUTTON
   ========================= */

const smileBtn =
  document.getElementById("smileBtn");

if (smileBtn) {

  smileBtn.addEventListener("click", () => {

    burst(
      ["❤️", "💗", "🥰", "✨", "🌸"],
      35
    );

    showToast(
      "That's all I wanted to see 🥰❤️"
    );

  });

}


/* =========================
   RESTORE AFTER REFRESH
   ========================= */

const saved = getState();

if (saved) {

  showScreen(
    saved.screen,
    false
  );

} else {

  saveState("welcome");

}


/*
  ==============================
  REFRESH PROTECTION
  ==============================

  The current screen is saved in
  localStorage for 24 hours.

  Example:

  If she reaches the final screen
  and refreshes the page, the page
  will remain on the final screen.

  The flow automatically resets to
  the welcome screen after 24 hours.

  Note:
  localStorage is specific to the
  browser/device.
*/
