import CardType from "./CardType";

export default class CardScheme {
  public type: CardType;
  public title: string;
  public lore: string;

  constructor(type:CardType, title: string, lore: string) {
    this.type = type;
    this.title = title;
    this.lore = lore;
  }
}
