import CardScheme from './CardScheme';
import CardType from './CardType';
import Card from './Card';

import cards_settings from '@/app/cards/default/index'

const PersonCardScheme = new CardScheme(CardType.Personality, '', '');

const cards = {
  random(array: any[]): any {
    return array[Math.floor(Math.random() * array.length)];
  },
  genRandPersonCard(): Card {
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
    console.log('orientation scope: '+scope)
    for (let key of Object.keys(chances)) {
      scope -= chances[key];
      console.log('after -'+chances[key]+' from '+key+', orientation scope: ' + scope);
      if (scope <= 0) {
        orientation = key;
        console.log("setted orientation to "+key)
        break;
      }
    }
    return new Card(PersonCardScheme, false).setExtra({
      age: age,
      gender: gender,
      orientation: orientation,
      nationality: this.random(this.person_nations),
    });
  },
  ...cards_settings
};

export default cards;
