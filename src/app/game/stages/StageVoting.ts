import GameStage from './GameStage';
import Game from '@/app/Game';

export default class StageVoting extends GameStage {
  private nextIndex = 0;
  private votes = {};

  constructor(game: Game) {
    super(game, 'voting', 0);
    //this.currentPlayer = game.players[0]
    for (let player_id in game.players) {
      this.votes[player_id] = player_id; //По умолчанию все голосуют за себя.
    }
    console.log('votes from stageVoting: ')
    console.log(this.votes)
  }

  public vote(who: string, target: string) {
    this.votes[who] = target;
    this.getGame().updateGameStage();
  }

  onStart() {}
  onEnd() {
    let game = this.getGame();
    //Пока что пусть всегда идёт дальше.
    game.nextRound();
  }
}
