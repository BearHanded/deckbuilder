import React from "react";
import {Player} from "../player/player";

function CurrentCard(props: { player: Player; }) {
  const {player} = props;
  const card = player.getCurrentCard();
  return <div>
    <h4>Current Card</h4>
    <div>Name: {card.name}</div>
    <div>Active: {player.cardTracker.cardActive ? "true" : "false"}</div>
    <div>Progress: {player.cardTracker.cardProgress} / {card.progressRequired}</div>
  </div>
}
export default CurrentCard;
