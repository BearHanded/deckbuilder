import {
    TICK_SPEED,
} from "../config/constants";
import {Player} from "../player/player";
import {saveGame} from "./saveManager"

export class GameClock {
    saveClockId: any;
    resourceClockId: any;
    player: Player; // Not readonly, we're emitting the changes for the rest of the app
    tickRatio: number; // Modified each pass of the clock so that we can deal with running in the background
    emitTick: any;
    maxTicks: number;
    lastTickDate: Date;
    randomEventTimer = 0;

    constructor(player: Player, onTick: any) {
        this.saveClockId = setInterval(
            () => saveGame(player),
            30000
        );
        this.player = player;
        this.updateState(player);
        this.tickRatio = TICK_SPEED / 1000; // Default: 50ms / 1000ms, multiply by how many per second you want
        this.maxTicks = (5 * 1000) / TICK_SPEED;
        this.emitTick = onTick;
        this.lastTickDate = new Date(player.saveTime); //Easy offline progress solution?
    }

    private calibrate() {
        const tickTimeStamp = new Date();
        const seconds = (tickTimeStamp.getTime() - this.lastTickDate.getTime()) / 1000;
        this.lastTickDate = tickTimeStamp;
        this.tickRatio = seconds;
        this.randomEventTimer += seconds;
    }


    tick() {
        this.calibrate();
        const newState = {...this.player};

        const card = this.player.getCurrentCard();
        const cardTracker = this.player.cardTracker;

        if(!cardTracker.cardActive) {
          // Activation Phase
          newState.cardTracker.cardActive = card.tryStart(newState);
        } else {
          // Card is active, progress
          if (card.tryProgress(newState)) {
             // Handle fail.
            console.log(newState.gold);
            newState.cardTracker.cardProgress++;
          }
          if (cardTracker.cardProgress >= card.progressRequired) {
            card.onComplete(newState);
            newState.nextCard();
          }
        }
      // Save and output
        this.player = newState;
        this.emitTick(this.player);
    }

    updateState(player: Player) {
        clearInterval(this.resourceClockId);
        this.resourceClockId = setInterval(() => this.tick(), TICK_SPEED);
    }

    clearClock() {
        clearInterval(this.resourceClockId);
        clearInterval(this.saveClockId);
    }


}
