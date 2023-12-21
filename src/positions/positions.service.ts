import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from './DTO/position-entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { Positions } from 'src/users/DTO/get-users-by-position.dto';
import { CreatePostionDTO } from './DTO/create-position.dto';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position) private PositionRepository: Repository<Position>) {}



  async getPositions(): Promise<Position[]> {
    return this.PositionRepository.find()
  }


  async createPosition(body: CreatePostionDTO): Promise<Position> {
 let alreadyExists = await this.PositionRepository.findOneBy({value: body.value})
 if (alreadyExists) {
  throw new BadRequestException({message: `Position ${body.value} already exists`})
 }
 let newPosition = new Position()
 newPosition.value = body.value
 newPosition.description = body.description
 return this.PositionRepository.save(newPosition)
  }


  async getOnePosition(position: Positions) {
let foundPosition = await this.PositionRepository.findOneBy({value: position})
if (!foundPosition) {
  throw new BadRequestException({message: `Position ${position} not found`})
}
return foundPosition
  }


}
