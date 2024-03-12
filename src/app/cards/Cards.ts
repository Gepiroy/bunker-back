import Card from './Card';

export default class Cards {
  private cards: Card[] = [];

  public getTheCards() {
    return this.cards;
  }
  public getCardsAsIds(): number[] {
    let ret = [];
    for (let card of this.cards) {
      ret.push(card.id);
    }
    return ret;
  }
  public push(card: Card) {
    this.cards.push(card);
  }
}
