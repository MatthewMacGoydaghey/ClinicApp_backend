import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './DTO/user-entity';
import { PositionsModule } from 'src/positions/positions.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PositionsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
