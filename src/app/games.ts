import Game from './Game';

class Games {
  games = [this.createGame()];

  createGame(): Game {
    console.log('createGame() called.');
    return new Game();
  }

  public getGame(id: any): Game {
    return this.games[0];
  }
}

function createInstance(): Games{
  return new Games();
}

const instance = createInstance();

export default instance
