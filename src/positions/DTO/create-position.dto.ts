import { IsEnum, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Positions } from "src/users/DTO/get-users-by-position.dto";


export class CreatePostionDTO {
  @ApiProperty({example: 'SURGEON'})
  @IsEnum(['HEAD PHYSICIAN', 'OPERATOR', 'THERAPIST', 'CARDIOLOGIST', 'NEUROLOGIST', 'PARAMEDIC', 'PEDIATRICIAN', 'SURGEON', 'USER'])
  value: Positions

  @ApiProperty({example: 'Has standart doctor`s rights'})
  @IsString()
  description: string
}