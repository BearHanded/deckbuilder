import './app.css';
import {Player} from "./player/player";
import * as React from "react";
import {useEffect, useState} from "react";
import {saveGameExists, loadGame, newSave} from "./gameLoop/saveManager";
import {GameClock} from "./gameLoop/gameClock";
import DeckView from "./layout/deckView";
import CurrentCard from "./layout/currentCard";
import ResourceDisplay from "./layout/resourceDisplay";


function App(props: { player: Player | (() => Player); }) {
  const [player, setPlayerState] = useState<Player>(props.player);
  let clock: GameClock | undefined;

  useEffect(() => {
    clock = new GameClock(player, (newPlayerState: Player) => onTick(newPlayerState));
  }, []);

  useEffect(() => {
    // Normal rerender
    // Could also add [player] as the second arg to only listen to player
  });

  const onTick = (newPlayerState: Player) => {
    setPlayerState(newPlayerState);
  };


  return (
    <div className="App">
      <ResourceDisplay player={player}/>
      <DeckView player={player}/>
      <CurrentCard player={player}/>
    </div>
  );
}

export default App;
