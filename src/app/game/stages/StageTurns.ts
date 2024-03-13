import Player from '@/app/Player';
import GameStage from './GameStage';
import Game from '@/app/Game';
import StageVoting from './StageVoting';

export default class StageTurns extends GameStage {
  private nextIndex = 0;
  private playersCached: Player[];
  public currentPlayer: Player;

  constructor(game: Game) {
    super(game, 'turns', 0);
    //this.currentPlayer = game.players[0]
    this.playersCached = Object.keys(game.players).map(function (k) {
      return game.players[k];
    });
  }

  public nextPlayer() {
    while (this.nextIndex < this.playersCached.length) {
      this.currentPlayer = this.playersCached[this.nextIndex++];
      if (!this.getGame().players[this.currentPlayer.id] || !this.currentPlayer.isCandidate) continue;
      this.getGame().updateGameStage();
      return;
    }
    this.end();
  }

  onStart() {
    this.nextPlayer();
  }
  onEnd() {
    let game = this.getGame();
    let gameState = game.game_state;
    if (gameState.round < 3) {
      game.nextRound();
    } else {
      game.setStage(new StageVoting(game));
    }
  }
}
