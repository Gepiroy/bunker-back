import CardScheme from "./CardScheme";

export default class Card {
  card: CardScheme; //temporary legacy support
  show: boolean = false;

  constructor(scheme: CardScheme){
    this.card = scheme;
  }
}