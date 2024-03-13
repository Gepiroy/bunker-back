import GameStage from './GameStage';
import Game from '@/app/Game';

export default class StageWaiting extends GameStage {

  constructor(game: Game) {
    super(game, 'waiting', 0);
  }

  onStart() {}
  onEnd() {}
}
