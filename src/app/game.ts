import Card from './cards/Card';
import Player from './Player';
import world from '@/app/worlds/worldDefault';

export default class Game {
  public world = world;
  public cards: Card[] = [];
  private game_state = {
    apocalypse: Card.createCard(
      this,
      world.random(world.card_schemes.apocalypses),
      true,
    ),
    bunker_modificators: [
      Card.createCard(
        this,
        world.random(world.card_schemes.bunker_modificators),
        true,
      ),
    ],
    demonstration: {
      type: null,
      by: null,
      extra: null,
    },
  };
  public players = {};
  public sockets = {};
  regPlayer(client: any) {
    this.players[client.id] = new Player(client.id);
    this.sockets[client.id] = client;
    this.updateGameStates();
  }
  unregPlayer(id: string) {
    delete this.players[id];
    delete this.sockets[id];
    this.updateGameStates();
  }
  getGameState(player_id: string) {
    let others = JSON.parse(JSON.stringify(this.players));
    for (let other_player_id in others) {
      let other_player = others[other_player_id];
      for (let type_of_cards in other_player.cards) {
        let cards_of_type = other_player.cards[type_of_cards];
        for (let card_id in cards_of_type) {
          let card = cards_of_type[card_id];
          if (!card.show)
            others[other_player_id].cards[type_of_cards].splice([card_id], 1);
        }
      }
    }

    return {
      game_state: this.game_state,
      you: this.players[player_id],
      others: others,
    };
  }

  public emitToEveryone(message: string, content: any | ((id: string) => any)) {
    for (let id in this.sockets) {
      this.sockets[id].emit(
        message,
        typeof content === 'function' ? content(id) : content,
      );
    }
  }

  public updateGameStates() {
    this.emitToEveryone('game-state', (id) => this.getGameState(id));
  }
  public demonstrate(by: string | null, type: string | null, extra: any) {
    this.game_state.demonstration.type = type;
    this.game_state.demonstration.by = by;
    this.game_state.demonstration.extra = extra;
    console.log(this.game_state.demonstration);
    this.emitToEveryone('demonstration', this.game_state.demonstration);
  }
  public showCard(by: string, card_id: number) {
    let card = Card.getCard(card_id);
    card.show = true;
    this.updateGameStates();
    this.emitToEveryone('card-shown', { by: by, cardData: card });
  }
  public endShowCard() {
    this.emitToEveryone('card-show-ended', '');
  }
  public changeName(player_id: string, new_name: string) {
    this.players[player_id].name = new_name;
    this.updateGameStates();
  }
}
