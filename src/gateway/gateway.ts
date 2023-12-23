import { OnModuleInit, Req, UseGuards } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "dgram";
import { Server } from 'socket.io'
import { CurrentUserRequest } from "src/appointments/appointments.service";
import { AuthWSGuard } from "src/auth/authGuard";
import { ChatService } from "src/chat/chat.service";
import { UsersService } from "src/users/users.service";


interface socketInfo extends Socket {
  id: string
}


interface socketNewMessage {
    "roomId": string,
    "message": string
} 

interface socketJoin {
"roomId": string
}

interface CurrentUserRequestWS extends CurrentUserRequest {
  unauthorized: boolean
}


@WebSocketGateway()
export class Gateway implements OnModuleInit {
  constructor(
    private readonly ChatService: ChatService,
    private readonly UsersService: UsersService) {

  }
@WebSocketServer()
server: Server

onModuleInit() {
  this.server.on('connection', (socket) => {
    console.log(`Client ${socket.id} connected`)
  })
}


  @UseGuards(AuthWSGuard)
  @SubscribeMessage('join')
  async handleJoin(@MessageBody() body: socketJoin, @ConnectedSocket() client: Socket, @Req() req: CurrentUserRequestWS) {
    if (req.unauthorized) {
      client.emit('error', "Unauthorized")
      return
    }
    const foundUser = await this.UsersService.findOne(req.user.userId)
    if (!body.roomId) {
      client.emit('error', `Incorrect request`)
    }
    const foundRoom = await this.ChatService.findOneRoom(body.roomId)
    if (!foundRoom) {
      client.emit('error', `Room with id ${body.roomId} not found`)
      return
    }
    const ifUserIsMember = await this.ChatService.verifyUser(foundUser.phoneNumber, body.roomId)
    if (!ifUserIsMember) {
      client.emit('error', `You are not a member of room with id ${body.roomId}`)
      return
    }
    this.server.socketsJoin(body.roomId)
    client.emit('newMessage', `You have joined room with id ${body.roomId}`)
    console.log(`Client joined room ${body.roomId}`)
  }



  @UseGuards(AuthWSGuard)
  @SubscribeMessage('newMessage')
  async handlenNewMessage(@MessageBody() body: socketNewMessage, @ConnectedSocket() client: socketInfo, @Req() req: CurrentUserRequestWS) {
    if (req.unauthorized) {
      client.emit('error', "Unauthorized")
      return
    }
    const foundUser = await this.UsersService.findOne(req.user.userId)
    const foundRoom = await this.ChatService.findOneRoom(body.roomId)
    if (!foundRoom) {
      client.emit('error', `Room with id ${body.roomId} not found`)
      return
    }
    const ifUserIsMember = await this.ChatService.verifyUser(foundUser.phoneNumber, body.roomId)
    if (!ifUserIsMember) {
      client.emit('error', `You are not a member of room with id ${body.roomId}`)
      return
    }
    const obj = {
      roomId: body.roomId,
      phoneNumber: foundUser.phoneNumber,
      message: body.message
    }
    const createdMessage = await this.ChatService.createMessage(obj)
    if (!createdMessage) {
      client.emit('error', `Can not sent message`)
      return
    }
    this.server.in(body.roomId).emit('newMessage', body.message)
    console.log(`Client ${client.id} sent new message in room ${body.roomId}`)
  }
}