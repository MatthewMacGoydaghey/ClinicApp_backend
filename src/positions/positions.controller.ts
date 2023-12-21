import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePostionDTO } from './DTO/create-position.dto';
import { RequiredPositions } from 'src/auth/DTO/constant';
import { PositionsGuard } from 'src/auth/positionsGuard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Position } from './DTO/position-entity';

@ApiTags('Positions')
@Controller('positions')
export class PositionsController {
  constructor(private readonly PositionsService: PositionsService) {}


@ApiOperation({summary: 'Sends all positions'})
@ApiResponse({status: 200, type: [Position]})
@RequiredPositions('HEAD PHYSICIAN')
@UseGuards(PositionsGuard)
@Get()
getPostitions() {
  return this.PositionsService.getPositions()
}

@ApiOperation({summary: 'Creates new position'})
@ApiResponse({status: 200, type: Position})
@RequiredPositions('HEAD PHYSICIAN')
@UseGuards(PositionsGuard)
@Post()
createPosition(@Body() body: CreatePostionDTO) {
return this.PositionsService.createPosition(body)
}
}
