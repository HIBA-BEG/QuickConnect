import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OfferAnswerDto } from './dto/offer-answer.dto';
import { IceCandidateDto } from './dto/ice-candidate.dto';

@WebSocketGateway(
    3000, {
  cors: {
    origin: '*',
  },
}
)
export class VideoCallGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect( client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('offer')
  handleOffer(@MessageBody() data: any,@ConnectedSocket() client: Socket) {
    console.log(`Offer received in room ${data}`);
    console.log(data);
    client.to(data.roomId).emit('offer', data);
  }

  @SubscribeMessage('answer')
  handleAnswer(@MessageBody() data: OfferAnswerDto,@ConnectedSocket() client: Socket) {
    client.to(data.roomId).emit('answer', data.sdp);
  }

  @SubscribeMessage('ice-candidate')
  handleIceCandidate(@MessageBody() data: IceCandidateDto,@ConnectedSocket() client: Socket) {
    client.to(data.roomId).emit('ice-candidate', data.candidate);
  }

  @SubscribeMessage('join')
  handleJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() roomId: string) {    
    console.log(`Client ${client.id} joined room ${roomId}`);
    client.join(roomId);
    client.to(roomId).emit('user-joined', client.id);
  }
}
