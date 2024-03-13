import Game from '@/app/Game';

export default abstract class GameStage {
  // В секундах
  #game: Game;
  public type: string;
  public duration: number;

  constructor(game: Game, type: string, duration: number) {
    this.#game = game;
    this.type = type;
    this.duration = duration;
  }

  abstract onStart();
  abstract onEnd();

  start() {
    console.log(this.type + ' stage started.');
    this.onStart();
  }
  end() {
    console.log(this.type + ' stage ended.');
    this.onEnd();
  }

  protected getGame(){
    return this.#game;
  }
}
