import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/DTO/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './DTO/login.dto';
import { Public } from './DTO/constant';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {

  }

@ApiOperation({summary: 'Sends an authorization token on success'})
@ApiResponse({status: 200, type: ''})
  @Public()
  @Get()
  login(@Body() body: LoginUserDTO) {
 return this.AuthService.login(body)
  }


@ApiOperation({summary: 'Creates user and sends an authorization token on success'})
@ApiResponse({status: 200, type: ''})
  @Public()
  @Post()
  regUser(@Body() body: CreateUserDTO) {
 return this.AuthService.regUser(body)
  }
}
