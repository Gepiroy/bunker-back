import CardType from './CardType';

export default class CardScheme {
  public type: CardType;
  public title: string;
  public lore: string;
  public useAt: string;

  constructor(type: CardType, title: string, lore: string, useAt = 'default') {
    this.type = type;
    this.title = title;
    this.lore = lore;
    if (useAt == 'default') {
      if (type == CardType.Fact || type == CardType.Ability) {
        useAt = 'anyYourTurn';
      }
    }
    this.useAt = useAt;
  }
}
