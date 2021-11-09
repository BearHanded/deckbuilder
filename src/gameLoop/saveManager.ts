import {Player, mergeStateWithDefault} from "../player/player";

const SAVE_NAME = "deck_incr_save";

export const loadGame = () => {
  const string = localStorage.getItem(SAVE_NAME);
  return loadSaveFromString(string);
};



export function saveGameExists() {
  return !!localStorage.getItem("deck_incr_save");
}

function loadSaveFromString(string: string | null) {
  const save =  string ? JSON.parse(atob(string)) : null;
  return mergeStateWithDefault(save);
}

export function newSave(): Player {
  return new Player();
}

export function saveGame(player: Player, manualSave: boolean = false) {
  player.saveTime = new Date();

  localStorage.setItem(SAVE_NAME, btoa(JSON.stringify(player)));
}


export function importSave(): Player | null {
  const importText  = prompt("Import Save", "");

  if (importText == null || importText === "") {
    return null;
  } else {
    // Try to parse
    return loadSaveFromString(importText);
  }}

export function exportSave(gameState: Player): string {
  saveGame(gameState);
  return btoa(JSON.stringify(gameState));
}
