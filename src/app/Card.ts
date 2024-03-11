import CardScheme from './CardScheme';
import game from './game';

export default class Card {
  private static mid = 0;
  public id: number;
  scheme: CardScheme;
  show: boolean;
  private extra: any = null;

  constructor(scheme: CardScheme, show: boolean = false) {
    this.scheme = scheme;
    this.show = show;
    this.id = Card.mid++;
    game.cards.push(this);
  }

  public setExtra(extra: any): Card{
    this.extra = extra;
    return this;
  }

  public static getCard(card_id: number): Card {
    return game.cards[card_id];
  }
}
