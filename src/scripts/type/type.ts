import ShuffleText from "shuffle-text";

interface Opening {
  init: () => void;
  textShuffleTarget: NodeListOf<Element>;
  shuffleTexts: ShuffleText[];
  shuffleTextDuration: number;
  runningClass: string;
}

export type { Opening };
