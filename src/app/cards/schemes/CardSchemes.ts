import CardScheme from '@/app/cards/CardScheme';
import CardType from '@/app/cards/CardType';

export default class CardSchemes {
  public static PersonCardScheme = new CardScheme(CardType.Personality, '', '');
  public apocalypses: CardScheme[];
  public professions: CardScheme[];
  public hobbies: CardScheme[];
  public healths: CardScheme[];
  public backpacks: CardScheme[];
  public personal_facts: CardScheme[];
  public facts: CardScheme[];
  public bunker_modificators: CardScheme[];
}
