import cards from './cards';
import Player from './Player';

class Game {
  private game_state = {
    apocalypse: cards.random(cards.apocalypses),
    bunker_modificators: [cards.random(cards.bunker_modificators)],
  };
  public players = {};
  public sockets = {};
  regPlayer(client: any) {
    this.players[client.id] = new Player();
    this.sockets[client.id] = client;
    this.updateGameStates();
  }
  unregPlayer(id: string) {
    delete this.players[id];
    delete this.sockets[id];
    this.updateGameStates();
  }
  getGameState(id: string) {
    let others = JSON.parse(JSON.stringify(this.players));
    delete others[id];
    for (let user_key in others) {
      let user = others[user_key];
      for (let type_of_cards in user.cards) {
        let cards_of_type = user.cards[type_of_cards];
        for (let card_id in cards_of_type) {
          let card = cards_of_type[card_id];
          if (!card.show)
            others[user_key].cards[type_of_cards].splice([card_id], 1);
        }
      }
    }

    return {
      game_state: this.game_state,
      you: this.players[id],
      others: others,
    };
  }

  public updateGameStates() {
    for (let id in this.sockets) {
      this.sockets[id].emit('game-state', this.getGameState(id));
    }
  }
}

const instance = new Game();

export default instance;
