import CardScheme from './CardScheme';

export default class Card {
  private static cards = [];
  private static mid = 0;
  public id: number;
  scheme: CardScheme;
  show: boolean;

  constructor(scheme: CardScheme, show: boolean = false) {
    this.scheme = scheme;
    this.show = show;
    this.id = Card.mid++;
    Card.cards.push(this);
  }

  public static getCard(card_id: number): Card {
    return Card.cards[card_id];
  }
}
