import Player from '@/app/Player';
import GameStage from './GameStage';
import Game from '@/app/Game';

export default class StageVoting extends GameStage {
  private nextIndex = 0;
  private votes = {};

  constructor(game: Game) {
    super(game, 'voting', 0);
    //this.currentPlayer = game.players[0]
    for (let player_id in game.players) {
      let player = this.getGame().players[player_id] as Player;
      if(player.isCandidate) this.votes[player_id] = player_id; //По умолчанию все голосуют за себя.
    }
    console.log('votes from stageVoting: ')
    console.log(this.votes)
  }

  public vote(who: string, target: string) {
    let playerWho = this.getGame().players[who] as Player;
    let playerTarget = this.getGame().players[target] as Player;
    if(!playerWho.isCandidate || !playerTarget.isCandidate) return;
    this.votes[who] = target;
    this.getGame().updateGameStage();
  }

  onStart() {}
  onEnd() {
    let game = this.getGame();
    //Пока что пусть всегда идёт дальше.
    let winners = {}
    for(let key in this.votes){
      if (winners[this.votes[key]]) winners[this.votes[key]]++;
      else winners[this.votes[key]] = 1;
    }
    console.log('winners is', winners);
    let winner = null;
    let max = 0;
    for (let key in winners) {
      if(winners[key]>max){
        winner = key
        max = winners[key]
      }
    }
    console.log('winner is', winner)
    let player = this.getGame().players[winner]
    player.isCandidate = false;
    game.nextRound();
  }
}
