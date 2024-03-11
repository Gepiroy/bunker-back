import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import game from './game'
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
    console.log('demonstration payload: ' + payload);
    if(!payload){
      game.demonstrate(null, null, null);
      return;
    }
    let type = payload.type;
    delete payload.type;
    game.demonstrate(client.id, type, payload);
  }

  @SubscribeMessage('nickChanged')
  handleNickChanged(client: any, payload: any) {
    console.log('nickChanged payload: ' + payload);
    game.changeName(client.id, payload.new_name);
  }

  async handleConnection(client: any) {
    const { sockets } = this.io.sockets;
    console.log('Somepony (id=' + client.id + ') just connected.');
    game.regPlayer(client);
    console.log(
      'There are ' + Object.keys(game.players).length + ' players now.',
    );
  }
  async handleDisconnect(client: any) {
    console.log('somepony just disconnected.');
    game.unregPlayer(client.id);
    console.log(
      'There are ' + Object.keys(game.players).length + ' players now.',
    );
  }
}
