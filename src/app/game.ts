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
    let player = new Player(client.id);
    this.players[client.id] = player;
    //let prompt = generatePersonImagePrompt(player);
    //sendToLLM(prompt);
    //console.log(prompt)
    this.sockets[client.id] = client;
    this.updateGameStates();
  }
  unregPlayer(id: string) {
    delete this.players[id];
    delete this.sockets[id];
    if(this.game_state.demonstration.by == id)this.demonstrate(null, null, null, true);
    this.updateGameStates();
  }
  getGameState(your_id: string) {
    let others = {};
    for (let player_id in this.players) {
      let player = this.players[player_id] as Player;
      others[player_id] = player.formData(false);
    }

    return {
      game_state: this.game_state,
      you: this.players[your_id].formData(true),
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
  public demonstrate(by: string | null, type: string | null, extra: any, silent:boolean = false) {
    this.game_state.demonstration.type = type;
    this.game_state.demonstration.by = by;

    if (type == 'show-card') {
      extra.cardData = this.cards[extra.card_id];
    }

    this.game_state.demonstration.extra = extra;

    console.log(this.game_state.demonstration);

    if(!silent)this.emitToEveryone('demonstration', this.game_state.demonstration);
  }
  public showCard(by: string, card_id: number) {
    let card = this.cards[card_id];
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
