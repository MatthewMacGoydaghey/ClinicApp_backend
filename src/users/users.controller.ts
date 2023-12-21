import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './DTO/create-user.dto';
import { UpdateUserDTO } from './DTO/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './DTO/user-entity';
import { GrantPositionDTO } from 'src/users/DTO/grant-position.dto';
import { PositionsGuard } from 'src/auth/positionsGuard';
import { RequiredPositions } from 'src/auth/DTO/constant';
import { Doctors } from 'src/appointments/DTO/appointment-entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {

  }

@ApiOperation({summary: 'Finds all users and all users with specified position'})
@ApiResponse({status: 200, type: [User]})
@RequiredPositions('HEAD PHYSICIAN')
@UseGuards(PositionsGuard)
  @Get()
  findAll() {
return this.UsersService.findAll()
  }

  @ApiOperation({summary: 'Finds all users and all doctors with relations by specifeid position'})
  @ApiResponse({status: 200, type: [User]})
  @RequiredPositions('OPERATOR', 'HEAD PHYSICIAN')
  @UseGuards(PositionsGuard)
  @Get('/doctors/:doctor')
  findDoctors(@Param('doctor') doctor: Doctors) {
  return this.UsersService.findDoctors(doctor)
  }

  @ApiOperation({summary: 'Finds one user by id'})
  @ApiResponse({status: 200, type: User})
  @RequiredPositions('HEAD PHYSICIAN')
  @UseGuards(PositionsGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
return this.UsersService.findOne(id)
  }

  @ApiOperation({summary: 'Creates user'})
  @ApiResponse({status: 200, type: User})
  @RequiredPositions('HEAD PHYSICIAN')
  @UseGuards(PositionsGuard)
  @Post()
  createUser(@Body() body: CreateUserDTO) {
return this.UsersService.createOne(body)
  }

  @ApiOperation({summary: 'Updates user by id'})
  @ApiResponse({status: 200, type: User})
  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDTO) {
return this.UsersService.updateOne(id, body)
  }

  @ApiOperation({summary: 'Deletes user by id'})
  @ApiResponse({status: 204})
  @RequiredPositions('HEAD PHYSICIAN')
  @UseGuards(PositionsGuard)
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
return this.UsersService.deleteOne(id)
  }


@ApiOperation({summary: 'Grants new position to specified user'})
@ApiResponse({status: 200, type: User})
@RequiredPositions('HEAD PHYSICIAN')
@UseGuards(PositionsGuard)
@Post('/positions')
grantPosition(@Body() body: GrantPositionDTO) {
return this.UsersService.grantPosition(body)
}

}
