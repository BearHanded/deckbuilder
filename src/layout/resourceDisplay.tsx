import React from "react";

function ResourceDisplay(props: { player: any; }) {
  const {player} = props;


  return <div>
    Gold: {player.gold}
  </div>
}

export default ResourceDisplay;
