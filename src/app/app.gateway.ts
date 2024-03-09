import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';

@WebSocketGateway(81)
export class AppGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
  handleDisconnect(client: any) {
    console.log('somepony just disconnected');
  }
  afterInit(server: any) {
    console.log('initialized, alive.');
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log("payload: "+payload);
    console.log(client)
    client.emit('aaa','bbb')
    return 'Hello world!';
  }

  async handleConnection() {
    console.log('somepony just connected');
  }
}
