import Library from "./library.js";
import {Card} from "../cards/card";
import {defaultDeck} from "../cards/cardList";

export class Player {
  deck: Card[] = defaultDeck;
  gold: number = 0;
  saveTime: Date = new Date();
  runStartTime: Date = new Date();
  cardTracker: CardTracker = new CardTracker();

  // helper functions
  getCurrentCard = () => this.deck[this.cardTracker.index]
  nextCard = () => {
    this.cardTracker.cardActive = false;
    this.cardTracker.cardProgress = 0;
    this.cardTracker.index++;
    if (this.cardTracker.index >= this.deck.length) this.cardTracker.index = 0; // Go to the top
  }
}

export class CardTracker {
  index: number = 0; // top of the deck
  cardActive: boolean = false;
  cardProgress: number = 0;
}

export function mergeStateWithDefault(player: Player): Player {
  const newState = {...new Player(), ...Player};
  // Handle any nested items if necessary
  // newState.resourceState = {...newState.resourceState, ...gameState.resourceState};
  newState.saveTime = player.saveTime;
  newState.runStartTime = newState.runStartTime ? newState.runStartTime : new Date();
  return newState;
}
