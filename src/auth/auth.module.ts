import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { SECRET } from './DTO/constant';
import { UsersModule } from 'src/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './authGuard';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: SECRET || 'SECRETIDZE',
    signOptions: {
      expiresIn: '1h' 
    }
  }), UsersModule],
  controllers: [AuthController],
  providers: [AuthService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }]
})
export class AuthModule {}
