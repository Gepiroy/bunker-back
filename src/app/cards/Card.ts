import CardScheme from './CardScheme';
import Game from '../Game';

class Card {
  public id: number;
  public scheme: CardScheme;
  public show: boolean;
  public extra: any = null;

  private constructor(scheme: CardScheme, show: boolean = false) {
    this.scheme = scheme;
    this.show = show;
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
}

export default Card
