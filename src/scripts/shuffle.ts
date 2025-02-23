import type { Shuffle } from "~scripts/type/type";

import { gsap } from "gsap";

import ShuffleText from "shuffle-text";

const shuffle: Shuffle = {
  opening,
  textShuffleTarget: document.querySelectorAll("[data-textShuffleTarget]"),
  shuffleTexts: [],
  shuffleTextDuration: 1300,
  runningClass: "text-zinc-600",
  rollover: {
    duration: 700,
    states: new Map<Element, string>(),
  },
};

function opening() {
  shuffle.textShuffleTarget.forEach((target) => {
    if (target instanceof HTMLElement) {
      target.classList.add(shuffle.runningClass);

      const text = new ShuffleText(target);
      text.duration = shuffle.shuffleTextDuration;
      const characters = [
        "_",
        "|",
        "/",
        "-",
        "\\",
        ">",
        "<",
        "░",
        "▒",
        "▓",
        "█",
      ];
      text.emptyCharacter =
        characters[Math.floor(Math.random() * characters.length)];
      shuffle.shuffleTexts.push(text);
    }
  });

  _setupTitmeline();
}

function _beforeStart() {
  shuffle.shuffleTexts.forEach((text) => text.stop());
}

function _start() {
  shuffle.shuffleTexts.forEach((text) => text.start());
}

function _dispose() {
  shuffle.shuffleTexts.forEach((text) => text.dispose());
}

function _setupTitmeline() {
  const openingTL = gsap.timeline({
    onComplete: () => {
      shuffle.textShuffleTarget.forEach((target) => {
        target.classList.remove(shuffle.runningClass);
      });

      shuffle.shuffleTexts = [];

      _setupEvents();
    },
  });

  openingTL.add(_beforeStart).add(_start).add(_dispose, 1.5);
}

function _setupEvents() {
  console.log("setup Events");

  const $links = document.querySelectorAll('[data-element="link"]');
  $links.forEach(($link) => {
    const targetText = $link.querySelectorAll("[data-textShuffleTarget]");
    $link.addEventListener("mouseenter", (e) => _mouseEnter($link, targetText));
  });
}

function _mouseEnter($link: Element, targetText: NodeListOf<Element>) {
  // 現在の状態を取得（未設定の場合は'deactive'）
  if (shuffle.rollover.states.get($link) === "active") return;

  // 状態を'active'に設定
  shuffle.rollover.states.set($link, "active");

  targetText.forEach((text) => {
    if (text instanceof HTMLElement) {
      const shuffleText = new ShuffleText(text);
      shuffleText.start();
    }
  });

  setTimeout(() => {
    shuffle.rollover.states.set($link, "deactive");
  }, shuffle.rollover.duration);
}

export default shuffle;
