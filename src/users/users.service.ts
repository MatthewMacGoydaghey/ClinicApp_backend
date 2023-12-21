import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './DTO/create-user.dto';
import { UpdateUserDTO } from './DTO/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './DTO/user-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GrantPositionDTO } from 'src/users/DTO/grant-position.dto';
import { PositionsService } from 'src/positions/positions.service';
import { Doctors } from 'src/appointments/DTO/appointment-entity';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
    private PositionsService: PositionsService) {
  }


  async findAll(): Promise<User[]> {
      return this.UserRepository.find({relations: {
        positions: true
      }})
  }


  async findDoctors(doctor: Doctors): Promise<User[]> {
let users = await this.UserRepository.find({relations: {
  positions: true,
  patientAppointments: true
}})
let doctors: User[] = []
  for (let obj of users) {
   let result = obj.positions.find((obj) => obj.value === doctor)
   if (result) {
    doctors.push(obj)
   }
  }
  return doctors
}


  async findOne(id: number): Promise<User> {
let foundUser = await this.UserRepository.findOneBy({id: id})
if (!foundUser) {
  throw new NotFoundException({message: `User with id ${id} not found`})
} 
  return foundUser
  }


  async findOneWithRelations(id: number) {
    let foundUser = await this.UserRepository.findOne({where: {id: id}, relations: {
      positions: true,
      appointments: true,
      patientAppointments: true
    }})
if (!foundUser) {
  throw new NotFoundException({message: `User with id ${id} not found`})
} 
  return foundUser
  }

  
  async createOne(body: CreateUserDTO): Promise<User> {
    let {fullname, password, phoneNumber, email} = body
    let userExists = await this.findUserByPhoneNumber(phoneNumber)
    if (userExists) {
    throw new BadRequestException({message: `Phone number ${phoneNumber} already exists`})
    }
    let position = await this.PositionsService.getOnePosition('USER')
    let newUser = new User()
    newUser.fullname = fullname
    newUser.password = password
    newUser.phoneNumber = phoneNumber
    newUser.email = email
    console.log(newUser)
    newUser.positions = [position]
  return this.UserRepository.save(newUser)
  }


  async updateOne(id: number, body: UpdateUserDTO): Promise<User> {
    let {fullname, password, phoneNumber, email} = body
    let foundUser = await this.UserRepository.findOneBy({id: id})
    if (!foundUser) {
      throw new NotFoundException({message: `User with id ${id} not found`})
    }
    foundUser.fullname = fullname
    foundUser.password = password
    foundUser.phoneNumber = phoneNumber
    foundUser.email = email
return this.UserRepository.save(foundUser)
  }


  async deleteOne(id: number) {
let deletedUser = await this.UserRepository.delete(id)
if (deletedUser.affected === 0) {
  throw new NotFoundException({message: `User with id ${id} not found`})
}
return new HttpException(`User has been deleted successfully`, HttpStatus.NO_CONTENT)
  }


 async findUserByPhoneNumber(number: string): Promise<User> {
let foundUser = await this.UserRepository.findOne({where: {phoneNumber: number}, relations: {
  positions: true
}})
return foundUser
  }



  async grantPosition(body: GrantPositionDTO): Promise<User> {
 let foundUser = await this.UserRepository.findOne({where: {id: body.id}, relations: {
  positions: true
 }})
  if (!foundUser) {
    throw new NotFoundException({message: `User with id ${body.id} not found`})
  }
  let grantedPosition = await this.PositionsService.getOnePosition(body.position)
  for (let pos of foundUser.positions) {
    if (pos.value === body.position) {
      throw new BadRequestException({message: 'User already has this position'})
    }
  }
  foundUser.positions.push(grantedPosition)
  return this.UserRepository.save(foundUser)
  }
}
