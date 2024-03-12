import Game from '../Game';
import Card from '../cards/Card';
import CardSchemes from '../cards/schemes/CardSchemes';

export default class World {
  public card_schemes : CardSchemes;
  public person_nations: string[];

  public random(array: any[]): any {
    return array[Math.floor(Math.random() * array.length)];
  }

  public genRandPersonCard(game: Game): Card {
    let age = Math.floor(Math.random() * 80) + 14;
    let gender = Math.random() < 0.5 ? 'male' : 'female';
    let orientation = 'Натурал';
    const chances = {
      Гомосексуал: 0.05,
      Бисексуал: 0.05,
      Асексуал: 0.05,
      Зоофил: 0.05,
      Некрофил: 0.05,
      Педофил: 0.05,
    };
    let scope = Math.random();
    for (let key of Object.keys(chances)) {
      scope -= chances[key];
      if (scope <= 0) {
        orientation = key;
        break;
      }
    }
    return Card.createCard(game, CardSchemes.PersonCardScheme, false).setExtra({
      age: age,
      gender: gender,
      orientation: orientation,
      nationality: this.random(this.person_nations),
    });
  }
}