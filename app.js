import {
  WORDS,
  LETTERS,
  audioLetterPath,
  audioWordPath,
} from "./words.js";

const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const startBtn = document.getElementById("start-btn");
const pictureStage = document.getElementById("picture-stage");
const slotsEl = document.getElementById("slots");
const alphabetEl = document.getElementById("alphabet");
const progressEl = document.getElementById("progress");
const coachEl = document.getElementById("coach");
const celebrateEl = document.getElementById("celebrate");
const celebrateWord = document.getElementById("celebrate-word");
const speakWordBtn = document.getElementById("speak-word-btn");
const hintBtn = document.getElementById("hint-btn");
const skipBtn = document.getElementById("skip-btn");

/** @type {{word: string, letters: string[], filled: (string|null)[], order: number[]}} */
let state = null;
let selectedLetter = null;
let drag = null;
let busy = false;
let queue = [];
let index = 0;

const audioCache = new Map();
/** @type {HTMLAudioElement | null} */
let activeAudio = null;
let playGeneration = 0;

function shuffle(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function stopAllAudio() {
  playGeneration += 1;
  if (activeAudio) {
    activeAudio.pause();
    try {
      activeAudio.currentTime = 0;
    } catch {
      /* ignore seek errors on fresh elements */
    }
    activeAudio = null;
  }
  for (const audio of audioCache.values()) {
    audio.pause();
    try {
      audio.currentTime = 0;
    } catch {
      /* ignore */
    }
  }
}

function playAudio(src) {
  return new Promise((resolve) => {
    stopAllAudio();
    const generation = playGeneration;

    let audio = audioCache.get(src);
    if (!audio) {
      audio = new Audio(src);
      audio.preload = "auto";
      audioCache.set(src, audio);
    }

    audio.pause();
    try {
      audio.currentTime = 0;
    } catch {
      /* ignore */
    }

    activeAudio = audio;
    const done = () => {
      audio.removeEventListener("ended", done);
      audio.removeEventListener("error", done);
      if (generation !== playGeneration) {
        resolve();
        return;
      }
      if (activeAudio === audio) activeAudio = null;
      resolve();
    };
    audio.addEventListener("ended", done);
    audio.addEventListener("error", done);
    audio.play().catch(() => done());
  });
}

function speakLetter(letter) {
  return playAudio(audioLetterPath(letter));
}

function speakWord(word) {
  return playAudio(audioWordPath(word));
}

function speakUi(name) {
  return playAudio(`./audio/${name}.mp3`);
}

function showScreen(which) {
  const start = which === "start";
  startScreen.classList.toggle("hidden", !start);
  startScreen.hidden = !start;
  gameScreen.classList.toggle("hidden", start);
  gameScreen.hidden = start;
}

function renderProgress() {
  progressEl.innerHTML = queue
    .map((_, i) => `<span class="dot${i === index ? " on" : ""}"></span>`)
    .join("");
}

function currentWord() {
  return queue[index];
}

function unusedCount(letter) {
  const needed = state.letters.filter((l) => l === letter).length;
  const placed = state.filled.filter((l) => l === letter).length;
  return needed - placed;
}

function renderSlots() {
  slotsEl.innerHTML = "";
  state.letters.forEach((_, i) => {
    const slot = document.createElement("button");
    slot.type = "button";
    slot.className = `slot${state.filled[i] ? " filled" : ""}`;
    slot.dataset.index = String(i);
    slot.setAttribute("role", "listitem");
    slot.setAttribute(
      "aria-label",
      state.filled[i] ? `ასო ${state.filled[i]}` : `ცარიელი ადგილი ${i + 1}`,
    );
    slot.textContent = state.filled[i] || "";
    slot.addEventListener("click", () => onSlotTap(i));
    slotsEl.appendChild(slot);
  });
}

function renderAlphabet() {
  alphabetEl.innerHTML = "";
  alphabetEl.classList.remove("hint-active");
  LETTERS.forEach((letter) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "letter";
    btn.textContent = letter;
    btn.dataset.letter = letter;
    btn.setAttribute("aria-label", `ასო ${letter}`);
    btn.addEventListener("pointerdown", (e) => onLetterPointerDown(e, letter, btn));
    btn.addEventListener("click", (e) => {
      if (drag?.moved) {
        e.preventDefault();
      }
    });
    alphabetEl.appendChild(btn);
  });
  syncAlphabetSelection();
}

function syncAlphabetSelection() {
  alphabetEl.querySelectorAll(".letter").forEach((btn) => {
    const letter = btn.dataset.letter;
    btn.classList.toggle("selected", selectedLetter === letter);
  });
}

function clearLetterHints() {
  alphabetEl.classList.remove("hint-active");
  alphabetEl.querySelectorAll(".letter").forEach((btn) => {
    btn.classList.remove("hint", "dimmed");
  });
}

/** Unique letters still required by empty slots. */
function remainingNeededLetters() {
  /** @type {Set<string>} */
  const needed = new Set();
  if (!state) return needed;
  for (let i = 0; i < state.letters.length; i += 1) {
    if (!state.filled[i]) needed.add(state.letters[i]);
  }
  return needed;
}

function applyLetterHints(needed) {
  alphabetEl.classList.add("hint-active");
  const hintButtons = [];
  alphabetEl.querySelectorAll(".letter").forEach((btn) => {
    const isNeeded = needed.has(btn.dataset.letter);
    btn.classList.toggle("hint", isNeeded);
    btn.classList.toggle("dimmed", !isNeeded);
    if (isNeeded) hintButtons.push(btn);
  });
  return hintButtons;
}

function loadRound() {
  busy = false;
  selectedLetter = null;
  stopAllAudio();
  const item = currentWord();
  state = {
    word: item.word,
    letters: [...item.word],
    filled: Array(item.word.length).fill(null),
  };

  pictureStage.innerHTML = item.svg;
  pictureStage.setAttribute("aria-label", item.label);
  coachEl.textContent = "შეეხე ასოს — გაიგონე ხმა — გადაიტანე ცარიელ ადგილას";
  renderSlots();
  renderAlphabet();
  renderProgress();
  celebrateEl.classList.add("hidden");
  celebrateEl.hidden = true;

  // Softly introduce the picture word after a short beat
  window.setTimeout(() => {
    speakWord(item.word);
  }, 350);
}

function onLetterPointerDown(event, letter, btn) {
  if (busy) return;
  if (event.button != null && event.button !== 0) return;
  event.preventDefault();

  // Play sound immediately, but do NOT select yet —
  // selecting on press makes short/failed drags feel sticky.
  speakLetter(letter);

  const rect = btn.getBoundingClientRect();
  drag = {
    letter,
    originBtn: btn,
    moved: false,
    pointerId: event.pointerId,
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top,
    ghost: null,
    startX: event.clientX,
    startY: event.clientY,
  };

  btn.classList.add("pressing");
  btn.setPointerCapture(event.pointerId);
  btn.addEventListener("pointermove", onLetterPointerMove);
  btn.addEventListener("pointerup", onLetterPointerUp);
  btn.addEventListener("pointercancel", onLetterPointerCancel);
}

function onLetterPointerMove(event) {
  if (!drag || event.pointerId !== drag.pointerId) return;
  const dx = event.clientX - drag.startX;
  const dy = event.clientY - drag.startY;
  // Slightly higher threshold so tiny finger jitter isn't a drag
  if (!drag.moved && Math.hypot(dx, dy) < 12) return;

  if (!drag.moved) {
    drag.moved = true;
    // Drag mode: clear selection so the letter doesn't stay "picked"
    selectedLetter = null;
    syncAlphabetSelection();
    drag.originBtn.classList.remove("pressing");
    drag.originBtn.classList.add("dragging");

    const ghost = drag.originBtn.cloneNode(true);
    ghost.classList.add("ghost", "dragging");
    ghost.classList.remove("selected", "hint", "dimmed", "pressing", "hint-pop");
    ghost.style.width = `${drag.originBtn.offsetWidth}px`;
    ghost.style.height = `${drag.originBtn.offsetHeight}px`;
    document.body.appendChild(ghost);
    drag.ghost = ghost;
    drag.originBtn.style.opacity = "0.35";
  }

  drag.ghost.style.left = `${event.clientX - drag.offsetX}px`;
  drag.ghost.style.top = `${event.clientY - drag.offsetY}px`;

  const el = document.elementFromPoint(event.clientX, event.clientY);
  const slot = el?.closest?.(".slot");
  slotsEl.querySelectorAll(".slot").forEach((s) => {
    s.classList.toggle("drop-target", s === slot && !state.filled[Number(s.dataset.index)]);
  });
}

function endLetterPointer(event, { cancelled = false } = {}) {
  if (!drag || event.pointerId !== drag.pointerId) return;
  const { letter, originBtn, moved, ghost } = drag;

  try {
    originBtn.releasePointerCapture(event.pointerId);
  } catch {
    /* already released */
  }
  originBtn.removeEventListener("pointermove", onLetterPointerMove);
  originBtn.removeEventListener("pointerup", onLetterPointerUp);
  originBtn.removeEventListener("pointercancel", onLetterPointerCancel);
  originBtn.classList.remove("pressing", "dragging");
  originBtn.style.opacity = "";

  slotsEl.querySelectorAll(".slot").forEach((s) => s.classList.remove("drop-target"));
  if (ghost) ghost.remove();
  drag = null;

  if (cancelled) {
    selectedLetter = null;
    syncAlphabetSelection();
    return;
  }

  if (moved) {
    // Drag gesture finished — never leave a sticky selection behind
    selectedLetter = null;
    syncAlphabetSelection();
    const el = document.elementFromPoint(event.clientX, event.clientY);
    const slot = el?.closest?.(".slot");
    if (slot && !state.filled[Number(slot.dataset.index)]) {
      tryPlace(Number(slot.dataset.index), letter);
    } else {
      coachEl.textContent = "გადაიტანე ასო ცარიელ ადგილას";
    }
    return;
  }

  // True tap (almost no movement): select for tap-to-slot
  selectedLetter = letter;
  syncAlphabetSelection();
  coachEl.textContent = `აირჩიე ცარიელი ადგილი ასოსთვის „${letter}“`;
}

function onLetterPointerUp(event) {
  endLetterPointer(event, { cancelled: false });
}

function onLetterPointerCancel(event) {
  endLetterPointer(event, { cancelled: true });
}

function onSlotTap(slotIndex) {
  if (busy) return;
  if (state.filled[slotIndex]) {
    state.filled[slotIndex] = null;
    renderSlots();
    return;
  }
  if (!selectedLetter) {
    coachEl.textContent = "ჯერ შეეხე ასოს ქვემოთ";
    return;
  }
  tryPlace(slotIndex, selectedLetter);
}

function tryPlace(slotIndex, letter) {
  if (busy) return;
  if (state.filled[slotIndex]) return;

  const expected = state.letters[slotIndex];
  const slotBtn = slotsEl.querySelector(`[data-index="${slotIndex}"]`);

  if (letter === expected) {
    state.filled[slotIndex] = letter;
    selectedLetter = null;
    clearLetterHints();
    renderSlots();
    syncAlphabetSelection();
    coachEl.textContent = "კარგი!";
    if (state.filled.every(Boolean)) {
      onWordComplete();
    }
    return;
  }

  if (slotBtn) {
    slotBtn.classList.add("wrong");
    window.setTimeout(() => slotBtn.classList.remove("wrong"), 420);
  }
  coachEl.textContent = "სცადე სხვა ადგილი ან სხვა ასო";
}

async function onWordComplete() {
  busy = true;
  celebrateWord.textContent = state.word;
  celebrateEl.classList.remove("hidden");
  celebrateEl.hidden = false;
  burstConfetti();
  await speakUi("bravo");
  await speakWord(state.word);
  window.setTimeout(() => {
    nextRound();
  }, 900);
}

function nextRound() {
  celebrateEl.classList.add("hidden");
  celebrateEl.hidden = true;
  index = (index + 1) % queue.length;
  if (index === 0) {
    queue = shuffle(WORDS);
  }
  loadRound();
}

function burstConfetti() {
  const colors = ["#ffd45a", "#ff7aa2", "#7ad0ff", "#4fb56a", "#f0a820", "#fff"];
  for (let i = 0; i < 28; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = `${Math.random() * 180}ms`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    document.body.appendChild(piece);
    window.setTimeout(() => piece.remove(), 1400);
  }
}

function giveHint() {
  if (busy || !state) return;
  const needed = remainingNeededLetters();
  if (needed.size === 0) return;

  selectedLetter = null;
  syncAlphabetSelection();
  const hintButtons = applyLetterHints(needed);

  const list = [...needed].join(" · ");
  coachEl.textContent = `დახმარება: აი საჭირო ასოები — ${list}`;
  speakUi("hint");

  // Bring the alphabet into view and ensure every hinted letter is noticeable
  alphabetEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  hintButtons.forEach((btn, i) => {
    window.setTimeout(() => {
      btn.classList.remove("hint-pop");
      // force reflow for replayable pop
      void btn.offsetWidth;
      btn.classList.add("hint-pop");
    }, i * 70);
  });
}

startBtn.addEventListener("click", () => {
  queue = shuffle(WORDS);
  index = 0;
  showScreen("game");
  loadRound();
});

speakWordBtn.addEventListener("click", () => {
  if (!state) return;
  speakWord(state.word);
});

hintBtn.addEventListener("click", giveHint);

skipBtn.addEventListener("click", () => {
  if (busy) return;
  nextRound();
});

// Unlock audio on first gesture (mobile browsers)
window.addEventListener(
  "pointerdown",
  () => {
    const silent = new Audio(
      "data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA//////////////////////////////////////////////////////////////////8AAAA8TEFNRTMuMTAwBK8AAAAAAAAAABUgJQgNAADsAAAAnGKjTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==",
    );
    silent.play().catch(() => {});
  },
  { once: true },
);