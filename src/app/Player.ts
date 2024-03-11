import game from './game';
import cards from './cards';
import Card from './Card';
export default class Player {
  private id: string;
  public name: string;
  private static index = 0;

  cards = {};

  constructor(id: string) {
    this.id = id;
    this.name = 'Игрок ' + (++Player.index);
    this.fillCards();
  }

  fillCards() {
    this.cards['personality'] = [cards.genRandPersonCard()]
    let list = [
      'professions',
      'hobbies',
      'healths',
      'backpacks',
      'personal_facts',
      'facts',
    ];
    list.forEach((name) => {
      this.cards[name] = [new Card(cards.random(cards[name]))];
    });
  }

  showCard(card: Card) {
    card.show = true;
    game.updateGameStates();
  }
}
