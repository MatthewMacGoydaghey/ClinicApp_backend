import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { LoginUserDTO } from './DTO/login.dto';
import { CreateUserDTO } from 'src/users/DTO/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private UsersService: UsersService
    ) {

  }



  async login(body: LoginUserDTO): Promise<string> {
const {password, phoneNumber} = body
let foundUser = await this.validateUser(phoneNumber, password)
if (foundUser) {
  const payload = {
    userId: foundUser.id,
    positions: foundUser.positions
  }
  return this.generateToken(payload)
}
  }


  async regUser(body: CreateUserDTO): Promise<string> {
    let userExists = await this.UsersService.findUserByPhoneNumber(body.phoneNumber)
    if (userExists) {
      throw new BadRequestException({message: `User with ${body.phoneNumber} phone number already exists`})
    }
    body.password = await bcrypt.hash(body.password, 5)
let createdUser = await this.UsersService.createOne(body)
const payload = {
  userId: createdUser.id,
  positions: createdUser.positions
}
return this.generateToken(payload)
  }


  private async validateUser(phoneNumber: string, password: string) {
    const foundUser = await this.UsersService.findUserByPhoneNumber(phoneNumber)
if (!foundUser) {
  throw new BadRequestException({message: `User with ${phoneNumber} phone number does not exists`})
}
const validPwd = await bcrypt.compare(password, foundUser.password)
    if (validPwd) {
   return foundUser
    } else {
      throw new ForbiddenException({message: 'Invalid password'})
    }
  }

  
  private generateToken(payload: object) {
    return this.jwtService.sign(payload)
  }
}
