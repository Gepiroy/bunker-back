import CardScheme from './CardScheme';
import Game from '../Game';

class Card {
  private static cards: Card[] = []
  private static mid = 0;
  public id: number;
  scheme: CardScheme;
  show: boolean;
  private extra: any = null;

  private constructor(scheme: CardScheme, show: boolean = false) {
    this.scheme = scheme;
    this.show = show;
    this.id = Card.mid++;
    Card.cards.push(this);
  }

  public setExtra(extra: any): Card{
    this.extra = extra;
    return this;
  }

  public static createCard(game:Game, scheme:CardScheme, show: boolean = false): Card{
    let card = new Card(scheme, show)
    card.id = game.cards.length
    game.cards.push(card)
    return card
  }

  public static getCard(card_id: number): Card {
    return Card.cards[card_id];
  }
}

export default Card
