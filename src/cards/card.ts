import {Player} from "../player/player";

export type Card = {
  id: number,
  name: string,
  text: string,
  progressRequired: number,
  tryStart: (p: Player) => boolean,
  tryProgress: (p: Player) => boolean,
  onComplete: (p: Player) => void,
}

export type Deck = {
  cards: Card[],
  index: number,
  cardProgress: number,
  cardActivated: boolean,
}
