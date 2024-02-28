import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './DTO/room-entity';
import { ChatController } from './chat.controller';
import { UsersModule } from 'src/users/users.module';
import { Message } from './DTO/message-entity';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Message]), UsersModule, RedisModule],
  providers: [ChatService],
  exports: [ChatService],
  controllers: [ChatController]
})
export class ChatModule {}
