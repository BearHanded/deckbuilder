import React from "react";
import { Player } from "../player/player";

function DeckView(props: { player: Player; }) {
  const {player} = props;
  const deck = player.deck.map((card => {
    return <li key={card.id}>{card.name}</li>
  }));

  return <div>
    <h4>Current Deck</h4>
    <ul>
      {deck}
    </ul>
  </div>
}

export default DeckView;
