import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/DTO/user-entity';
import { AuthModule } from './auth/auth.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { Appointment } from './appointments/DTO/appointment-entity';
import { PositionsModule } from './positions/positions.module';
import { Position } from './positions/DTO/position-entity';
import { ReportsModule } from './reports/reports.module';
import { Report } from './reports/DTO/report-entity';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GatewayModule } from './gateway/gateway.module';
import { ChatModule } from './chat/chat.module';
import * as path from 'path'
import { Room } from './chat/DTO/room-entity';
import { Message } from './chat/DTO/message-entity';

@Module({
  imports: [UsersModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  }),
  ServeStaticModule.forRoot({
    rootPath: path.resolve(__dirname, 'static')
  }),
   TypeOrmModule.forRoot({
    type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Appointment, Position, Report, Message, Room],
      synchronize: true
  }), AuthModule, AppointmentsModule, PositionsModule, ReportsModule, ChatModule, FilesModule, GatewayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
