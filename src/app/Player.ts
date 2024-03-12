import games from './games';
import Card from './cards/Card';
import Cards from './cards/Cards';
export default class Player {
  private id: string;
  public name: string;
  private static index = 0;

  cards = new Cards();

  constructor(id: string) {
    this.id = id;
    this.name = 'Игрок ' + (++Player.index);
    this.fillCards();
  }

  fillCards() {
    let game = games.getGame(0)
    this.cards.push(game.world.genRandPersonCard(game))
    let list = [
      'professions',
      'hobbies',
      'healths',
      'backpacks',
      'personal_facts',
      'facts',
    ];
    list.forEach((name) => {
      this.cards.push(Card.createCard(game, game.world.random(game.world.card_schemes[name])));
    });
  }

  formData(isYou: boolean){
    return {

    }
  }

  showCard(card: Card) {
    card.show = true;
    games.getGame(0).updateGameStates();
  }
}
