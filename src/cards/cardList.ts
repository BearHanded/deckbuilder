import {Card} from "./card";
import {Player} from "../player/player";

// Define cards in one file for now, may break apart later
const generateGold : Card = {
  id: 0,
  name: "Generate Gold",
  text: "build wealth",
  progressRequired: 500,
  onComplete: (p: Player) => {
  },
  tryProgress:(p: Player) => {
    p.gold += 1;
    console.log(p.gold);
    return true;
  },
  tryStart: (p: Player) => {
    return true;
  },
};

const sleep : Card = {
  id: 1,
  name: "Sleep",
  text: "relax",
  progressRequired: 1000,
  onComplete: (p: Player) => {},
  tryProgress:(p: Player) => {
    return true;
  },
  tryStart: (p: Player) => {
    return true;
  },
};


export const defaultDeck : Card[] = [
  generateGold,
  sleep
];

