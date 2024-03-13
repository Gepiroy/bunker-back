import Card from './cards/Card';
import CardType from './cards/CardType';
import GameStage from './game/stages/GameStage';
import StageTurns from './game/stages/StageTurns';
import StageVoting from './game/stages/StageVoting';
import StageWaiting from './game/stages/StageWaiting';
import Player from './Player';
import world from '@/app/worlds/worldDefault';

export default class Game {
  public world = world;
  public cards: Card[] = [];

  public game_state = {
    round: 0,
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
    facts: [] as Card[],
    demonstration: {
      type: null,
      by: null,
      extra: null,
    },
  };
  public game_stage: GameStage = new StageWaiting(this);
  public players = {};
  public sockets = {};
  regPlayer(client: any): Player {
    let player = new Player(this, client.id);
    this.players[client.id] = player;
    //let prompt = generatePersonImagePrompt(player);
    //sendToLLM(prompt);
    //console.log(prompt)
    this.sockets[client.id] = client;
    this.updateGameStates();
    return player;
  }
  unregPlayer(id: string) {
    delete this.players[id];
    delete this.sockets[id];
    if (this.game_state.demonstration.by == id)
      this.demonstrate(null, null, null);
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
      game_stage: this.game_stage,
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
  private static updates = 0;
  public updateGameStates() {
    console.log('updating whole game states #' + ++Game.updates);
    this.emitToEveryone('game-state', (id) => this.getGameState(id));
  }
  public demonstrate(by: string | null, type: string | null, extra: any) {
    let dem = this.game_state.demonstration;
    if (type == null) {
      if (dem.type == 'show-card' && this.game_stage instanceof StageTurns) {
        if (this.cards[dem.extra.card_id].scheme.type != CardType.Fact)
          (this.game_stage as StageTurns).nextPlayer();
      }
    }

    dem.type = type;
    dem.by = by;
    dem.extra = extra;

    if (type == 'show-card') {
      let card = this.cards[extra.card_id];
      extra.cardData = card;
      card.show = true;
      if (card.scheme.type == CardType.Fact) {
        //delete this.players[by].cards[this.players[by].cards.indexOf(card)]
        delete this.players[by].cards[card];
        this.game_state.facts.push(card);
      }
      this.updateGameStates();
    }

    console.log('current dem:', dem);

    this.emitToEveryone('demonstration', this.game_state.demonstration);
  }
  public changeName(player_id: string, new_name: string) {
    this.players[player_id].name = new_name;
    this.updateGameStates();
  }

  public startTheGame() {
    this.nextRound();
  }

  public setStage(stage: GameStage, endPrevious = false) {
    if (endPrevious) this.game_stage?.end();
    this.game_stage = stage;
    stage.start();
    this.updateGameStates();
  }

  public nextRound() {
    console.log('Round #' + ++this.game_state.round);
    this.setStage(new StageTurns(this));
  }

  public vote(voter_id: string, target_id: string) {
    if (this.game_stage instanceof StageVoting) {
      let stage = this.game_stage as StageVoting;
      stage.vote(voter_id, target_id);
      this.updateGameStates();
    }
  }
}
