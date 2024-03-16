import games from './games';
import Card from './cards/Card';
import Game from './Game';
import CardType from './cards/CardType';
export default class Player {
  #game: Game;
  public readonly id: string;
  public name: string;
  private static index = 0;
  public isCandidate = true;
  public currentSocketId: string | null;

  cards: Card[] = [];

  constructor(game: Game, id: string) {
    this.#game = game;
    this.id = id;
    this.name = 'Игрок ' + ++Player.index;
  }

  public getGame(): Game {
    return this.#game;
  }

  fillCards() {
    let game = games.getGame(0);
    this.cards.push(game.world.genRandPersonCard(game));
    let list = [
      'professions',
      'hobbies',
      'healths',
      'backpacks',
      'personal_facts',
      'facts',
    ];
    list.forEach((name) => {
      let card = Card.createCard(
        game,
        game.world.pickOne(game.world.card_schemes[name]),
      );
      if (!card.scheme) throw new Error('Undefined card scheme!');
      this.cards.push(card);
    });
  }

  formData(isYou: boolean) {
    if (isYou) return this;
    else {
      return {
        id: this.id,
        name: this.name,
        cards: this.cards.filter(
          (card) => card.show && card.scheme.type != CardType.Fact,
        ),
        isCandidate: this.isCandidate,
      };
    }
  }

  showCard(card: Card) {
    card.show = true;
    games.getGame(0).updateGameStates();
  }

  public isAdmin(): boolean {
    return this.getGame().getAdmin() == this;
  }
}
