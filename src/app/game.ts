import Card from './cards/Card';
import CardType from './cards/CardType';
import GameStage from './game/stages/GameStage';
import StageTurns from './game/stages/StageTurns';
import StageVoting from './game/stages/StageVoting';
import StageWaiting from './game/stages/StageWaiting';
import Player from './Player';
import world from '@/app/worlds/worldDefault';

const settingsDev = {
  fastShow: true,
};

const settingsPlay = {
  fastShow: false,
};

export default class Game {
  public static readonly settings = settingsPlay;

  public world = world;
  public cards: Card[] = [];

  public started = false;


  public game_state = {
    admin: null as Player,
    round: 0,
    apocalypse: null as Card,
    bunker_modificators: [] as Card[],
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
    if (this.game_state.admin == null) this.game_state.admin = player;
    //let prompt = generatePersonImagePrompt(player);
    //sendToLLM(prompt);
    //console.log(prompt)
    this.sockets[client.id] = client;
    this.updateGameStates();
    return player;
  }
  setRandomAdmin() {
    console.log('searching for new admin...');
    for (let key in this.players) {
      if (this.players[key].currentSocketId) {
        this.game_state.admin = this.players[key];
        console.log('new admin: ', this.game_state.admin);
        return;
      }
    }
  }
  unregPlayer(id: string) {
    if (!this.started) delete this.players[id];
    delete this.sockets[id];
    if (this.game_state.admin.id == id) {
      this.game_state.admin = null;
      this.setRandomAdmin();
    }
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

  public setAndShowApocalypse() {
    this.game_state.apocalypse = Card.createCard(
      this,
      world.random(world.card_schemes.apocalypses),
      true,
    );
    this.demonstrate(this.getAdmin().id, 'show-card', {
      card_id: this.game_state.apocalypse.id,
    });
  }

  public getAdmin(): Player {
    return this.game_state.admin;
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
  public updateGameStage() {
    this.emitToEveryone('game-stage', (id) => this.game_stage);
  }
  public demonstrate(by: string | null, type: string | null, extra: any) {
    let dem = this.game_state.demonstration;
    if (type == null) {
      if (dem.type == 'show-card') {
        if (this.game_stage instanceof StageTurns) {
          if (
            dem.by != 'server' &&
            this.cards[dem.extra.card_id].scheme.type != CardType.Fact
          )
            (this.game_stage as StageTurns).nextPlayer();
        }
        if (this.game_stage instanceof StageWaiting) this.nextRound();
      }
    }

    dem.type = type;
    dem.by = by;
    dem.extra = extra;

    if (type == 'show-card') {
      let card = this.cards[extra.card_id];
      if (by!='server'&&card.scheme.useAt != 'anyYourTurn') {
        if (
          this.game_state.round == 1 &&
          card.scheme.type != CardType.Personality
        )
          return;
        if (
          this.game_state.round == 2 &&
          card.scheme.type != CardType.Profession
        )
          return;
      }
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

    this.emitToEveryone('demonstration', dem);
  }
  public changeName(player_id: string, new_name: string) {
    this.players[player_id].name = new_name;
    this.updateGameStates();
  }

  public startTheGame() {
    this.started = true;
    this.setAndShowApocalypse();
    (Object.values(this.players) as Player[]).forEach((player) =>
      player.fillCards(),
    );
  }

  public setStage(stage: GameStage, endPrevious = false) {
    if (endPrevious) this.game_stage?.end();
    this.game_stage = stage;
    stage.start();
    this.updateGameStates();
  }

  public nextRound() {
    console.log('Round #' + ++this.game_state.round);
    let card: Card = Card.createCard(
      this,
      world.pickOne(world.card_schemes.bunker_modificators),
    );
    this.game_state.bunker_modificators.push(card);
    setTimeout(() => {
      this.demonstrate('server', 'show-card', { card_id: card.id });
      setTimeout(
        () => {
          this.demonstrate(null, null, null);
        },
        Game.settings.fastShow ? 500 : 5000,
      );
    }, 100);
    this.setStage(new StageTurns(this));
  }

  public vote(voter_id: string, target_id: string) {
    if (this.game_stage instanceof StageVoting) {
      this.game_stage.vote(voter_id, target_id);
    }
  }
}
