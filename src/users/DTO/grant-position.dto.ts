import { IsEnum, IsNumber, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Positions } from "src/users/DTO/get-users-by-position.dto";


export class GrantPositionDTO {
  
  @ApiProperty({example: 1})
  @IsNumber()
  id: number
  
  @ApiProperty({example: 'THERAPIST'})
  @IsEnum(['HEAD PHYSICIAN', 'OPERATOR', 'THERAPIST', 'CARDIOLOGIST', 'NEUROLOGIST', 'PARAMEDIC', 'PEDIATRICIAN', 'SURGEON', 'USER'])
  position: Positions
}