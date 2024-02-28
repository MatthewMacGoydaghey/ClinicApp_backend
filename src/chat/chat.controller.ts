import { Body, Controller, Get, HttpException, Param, Post, Req } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateRoomDTO } from './DTO/create-room.dto';
import { CurrentUserRequest } from 'src/appointments/appointments.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(
    private readonly ChatService: ChatService
  ) {}


@ApiOperation({summary: 'Finds all rooms'})
@ApiResponse({status: 200, type: HttpException})
  @Get()
  findAll() {
    return this.ChatService.findRooms()
  }

  @ApiOperation({summary: 'Finds all messages'})
@ApiResponse({status: 200, type: HttpException})
  @Get('/messages')
  findAllMessages(@Req() req: CurrentUserRequest) {
   return this.ChatService.findAllMessages(req)
  }


@ApiOperation({summary: 'Finds all messages in specified room'})
@ApiResponse({status: 200, type: HttpException})
  @Get('/messages/room/:id')
  findRoomMessages(@Param('id') id: string) {
  return this.ChatService.findRoomMessages(id)
  }


@ApiOperation({summary: 'Creates room'})
@ApiResponse({status: 200, type: HttpException})
  @Post()
  createChat(@Body() body: CreateRoomDTO, @Req() req: CurrentUserRequest) {
   return this.ChatService.createRoom(body, req)
  }
}
