import cards from './cards';

export class Game {
  game_state = {
    apocalypse: cards.random(cards.apocalypses),
    bunker_modificators: [cards.random(cards.bunker_modificators)],
  };
  users = [];
  regNewUser(id: any) {
    this.users[id] = {
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
  getGameState(id: any) {
    let others = { ...this.users };
    delete others[id];
    others.forEach((user) => {
      user.cards.forEach((cards_of_type) => {
        for (let card_id in cards_of_type) {
          let card = cards_of_type[card_id];
          if (!card.show) delete others[user].cards[cards_of_type][card_id];
        }
      });
    });

    return {
      game_state: this.game_state,
      you: this.users[id],
      others: others,
    };
  }
}
