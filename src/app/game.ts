import cards from './cards';

class Game {
  game_state = {
    apocalypse: cards.random(cards.apocalypses),
    bunker_modificators: [cards.random(cards.bunker_modificators)],
  };
  public users = {};
  regNewUser(client: any) {
    this.users[client.id] = {
      person_gender: cards.random(cards.person_genders),
      person_age: Math.floor(Math.random() * 90 + 14),
      person_orientation: cards.random(cards.person_orientations),
      person_nation: cards.random(cards.person_nations),
      cards: {
        professions: [
          {
            card: cards.random(cards.professions),
            show: false,
          },
        ],
        hobbies: [
          {
            card: cards.random(cards.hobbies),
            show: false,
          },
        ],
        healths: [
          {
            card: cards.random(cards.healths),
            show: false,
          },
        ],
        backpacks: [
          {
            card: cards.random(cards.backpacks),
            show: false,
          },
        ],
        personal_facts: [
          {
            card: cards.random(cards.personal_facts),
            show: false,
          },
        ],
        facts: [
          {
            card: cards.random(cards.facts),
            show: false,
          },
        ],
        /*abilities: [
          {
            card: cards.random(cards.abilities),
            show: false,
          },
        ],*/
      },
    };
  }
  getGameState(key: any) {
    let others = { ...this.users };
    delete others[key];
    for(let user_key in others){
      let user = others[user_key]
      for(let type_of_cards in user.cards){
        let cards_of_type = user.cards[type_of_cards]
        for (let card_id in cards_of_type) {
          let card = cards_of_type[card_id];
          if (!card.show) delete others[user_key].cards[type_of_cards][card_id];
        }
      }
    };

    return {
      game_state: this.game_state,
      you: this.users[key],
      others: others,
    };
  }
}

const instance = new Game();

export default instance