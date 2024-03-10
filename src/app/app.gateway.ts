import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import game from './game'
import {Server} from 'socket.io'

@WebSocketGateway(81, { cors: true})
export class AppGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
  @WebSocketServer() io: Server;
  handleDisconnect(client: any) {
    console.log('somepony just disconnected.');
    delete game.users[client]
    console.log(
      'There are ' + Object.keys(game.users).length + ' players now.',
    );
  }
  afterInit(server: any) {
    console.log('initialized, alive.');
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log('payload: ' + payload);
    return 'Hello world!';
  }

  async handleConnection(client: any) {
    const { sockets } = this.io.sockets;
    console.log('Somepony (id='+client.id+') just connected. Everything: ')
    console.log(Object.keys(client))
    game.regNewUser(client);
    console.log(
      'There are ' + Object.keys(game.users).length + ' players now.',
    );
    console.log(
      'There are ' + sockets.size + ' sockets now.',
    );
    client.emit('game-state', game.getGameState(client.id))

  }
}
