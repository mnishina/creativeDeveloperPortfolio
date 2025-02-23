import type { Opening } from "~scripts/type/type";

import { gsap } from "gsap";

import ShuffleText from "shuffle-text";

const opening: Opening = {
  init,
  textShuffleTarget: document.querySelectorAll("[data-textShuffleTarget]"),
  shuffleTexts: [],
  shuffleTextDuration: 1500,
  runningClass: "text-zinc-600",
};

function init() {
  opening.textShuffleTarget.forEach((target) => {
    if (target instanceof HTMLElement) {
      target.classList.add(opening.runningClass);

      const text = new ShuffleText(target);
      text.duration = opening.shuffleTextDuration;
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
      opening.shuffleTexts.push(text);
    }
  });

  _setupTitmeline();
}

function _beforeStart() {
  opening.shuffleTexts.forEach((text) => text.stop());
}

function _start() {
  opening.shuffleTexts.forEach((text) => text.start());
}

function _dispose() {
  opening.shuffleTexts.forEach((text) => text.dispose());
}

function _setupTitmeline() {
  const openingTL = gsap.timeline({
    onComplete: () => {
      opening.textShuffleTarget.forEach((target) => {
        target.classList.remove(opening.runningClass);
      });
    },
  });

  openingTL.add(_beforeStart, 0.3).add(_start).add(_dispose, 2.2);
}

export default opening;
