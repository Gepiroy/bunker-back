import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import game from './game'

@WebSocketGateway(81, { cors: true})
export class AppGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
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
    console.log('Somepony just connected.')
    game.regNewUser(client)
    console.log(
      'There are ' + Object.keys(game.users).length + ' players now.',
    );
    client.emit('game-state', game.getGameState(client))
  }
}
