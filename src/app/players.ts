import { Socket } from 'node:dgram';
import Player from './Player';

class Players {
  private players = {};

  public getPlayer(socket: any): Player {
    return this.players[this.toId(socket)];
  }

  private toId(socket: any): string {
    return typeof socket === 'string' ? socket : socket.id;
  }

  public regPlayer(socket: any, player: Player) {
    this.players[this.toId(socket)] = player;
  }

  public unregPlayer(socket: any) {
    let id = this.toId(socket)
    this.getPlayer(id).getGame().unregPlayer(id);
    delete this.players[this.toId(id)];
  }
}

function createInstance(): Players {
  return new Players();
}

const instance = createInstance();

export default instance;
