import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(RealtimeGateway.name);

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('authenticate')
  handleAuthenticate(client: Socket, payload: { token: string }) {
    const token = payload?.token;
    if (!token) {
      client.emit('auth_error', { message: 'No token provided' });
      return;
    }

    // Безпечний дефолт секрету для локальної розробки
    const jwtSecret = process.env.JWT_SECRET || 'dev_secret';

    try {
      // Явно вказуємо тип результату як any, щоб уникнути помилок типізації
      const payloadVerified: any = jwt.verify(token, jwtSecret as jwt.Secret);
      client.data.user = payloadVerified;
      client.emit('authenticated', { ok: true });
    } catch (err) {
      this.logger.warn('JWT verification failed: ' + (err as Error).message);
      client.emit('auth_error', { message: 'Invalid token' });
    }
  }
}
