import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './DTO/room-entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateRoomDTO } from './DTO/create-room.dto';
import { CurrentUserRequest } from 'src/appointments/appointments.service';
import { Message } from './DTO/message-entity';
import { CreateMessageDTO } from './DTO/create-message-dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Room) private ChatRepository: Repository<Room>,
    @InjectRepository(Message) private MessagesRepository: Repository<Message>,
    private readonly UsersService: UsersService
  ) {}


  async findRooms(): Promise<Room[]> {
    return this.ChatRepository.find({relations: {
      users: true,
      messages: true
    }})
  }


  async findAllMessages(): Promise<Message[]> {
    return this.MessagesRepository.find()
  }


  async findRoomMessages(roomId: string): Promise<Message[]|false> {
    const foundRoom = await this.findOneRoom(roomId)
    if (!foundRoom) {
      return false
     }
const messages = await this.MessagesRepository.find({where: {room: {id: parseInt(roomId)}}, relations: {
  user: true
}})
return messages
  }


  async createMessage(body: CreateMessageDTO): Promise<boolean> {
 const foundUser = await this.UsersService.findUserByPhoneNumber(body.phoneNumber)
 if (foundUser === null) {
  return false
 }
 const foundRoom = await this.findOneRoom(body.roomId)
 if (!foundRoom) {
  return false
 }
 const newMessage = new Message()
 newMessage.room = foundRoom
 newMessage.user = foundUser
 newMessage.text = body.message
 this.MessagesRepository.save(newMessage)
 return true
  }



 async findOneRoom(roomId: string): Promise<Room|false> {
const foundRoom = await this.ChatRepository.findOne({where: {id: parseInt(roomId)}, relations: {
  users: true
}})
if (!foundRoom) {
  return false
}
return foundRoom
}


 async createRoom(body: CreateRoomDTO, req: CurrentUserRequest): Promise<Room> {
  const foundUser = await this.UsersService.findOne(req.user.userId)
  const foundUserSecond = await this.UsersService.findUserByPhoneNumber(body.interlocutor)
  const newRoom = new Room()
  newRoom.users = [foundUser, foundUserSecond]
 return await this.ChatRepository.save(newRoom)
 }


 async verifyUser(phoneNumber: string, roomId: string): Promise<boolean> {
 const foundUser = await this.UsersService.findUserByPhoneNumber(phoneNumber)
 if (foundUser === null) {
  return false
 }
 const foundRoom = await this.findOneRoom(roomId) as Room
 if (foundRoom.users.some((value) => value.id === foundUser.id)) {
  return true
 } else {
  return false
 }
 }
 

}
