import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import games from './games'
import players from './players'
import {Server} from 'socket.io'

@WebSocketGateway(81, { cors: true })
export class AppGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
  @WebSocketServer() io: Server;

  

  afterInit(server: any) {
    console.log('initialized, alive.');
  }

  @SubscribeMessage('demonstration')
  handleDemonstration(client: any, payload: any) {
    console.log('demonstration payload:', payload);
    if (!payload) {
      games.getGame(0).demonstrate(null, null, null);
      return;
    }
    let type = payload.type;
    delete payload.type;
    games.getGame(0).demonstrate(client.id, type, payload);
  }

  @SubscribeMessage('nickChanged')
  handleNickChanged(client: any, payload: any) {
    console.log('nickChanged payload:', payload);
    games.getGame(0).changeName(client.id, payload.new_name);
  }

  @SubscribeMessage('start-game')
  handleStartGame(client: any, payload: any) {
    games.getGame(0).startTheGame();
  }

  @SubscribeMessage('vote')
  handleVote(client: any, payload: any) {
    let player = players.getPlayer(client)
    player.getGame().vote(player.id, payload.id)
  }

  async handleConnection(client: any) {
    const { sockets } = this.io.sockets;
    console.log('Somepony (socket id=' + client.id + ') just connected.');
    players.regPlayer(client, games.getGame(0).regPlayer(client))
    console.log(
      'There are ' +
        Object.keys(games.getGame(0).players).length +
        ' players now.',
    );
  }
  async handleDisconnect(client: any) {
    console.log('somepony just disconnected.');
    players.unregPlayer(client);
    console.log(
      'There are ' +
        Object.keys(games.getGame(0).players).length +
        ' players now.',
    );
  }
}
