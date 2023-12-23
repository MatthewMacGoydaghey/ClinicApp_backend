import { Module } from '@nestjs/common';
import { Gateway } from './gateway';
import { ChatModule } from 'src/chat/chat.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [ChatModule, UsersModule],
  providers: [Gateway]
})
export class GatewayModule {}
