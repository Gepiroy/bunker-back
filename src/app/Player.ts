import game from './game';
import cards from './cards'
import Card from './Card';
export default class Player {

  person_gender = cards.random(cards.person_genders)
  person_age = Math.floor(Math.random() * 90 + 14)
  person_orientation = cards.random(cards.person_orientations)
  person_nation = cards.random(cards.person_nations)
  cards = {}

  constructor() {
    this.fillCards()
  }

  fillCards(){
    let list = ['professions', 'hobbies', 'healths', 'backpacks', 'personal_facts', 'facts']
    list.forEach(name => {
      this.cards[name] = [new Card(
        cards.random(cards[name])
      )]
    });
  }

  showCard(card: Card){
    card.show = true
  }

}
