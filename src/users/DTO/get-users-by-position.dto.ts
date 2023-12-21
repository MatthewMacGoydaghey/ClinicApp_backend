import { IsEnum } from "@nestjs/class-validator"
import { ApiProperty } from "@nestjs/swagger"

export const doctors = ['HEAD PHYSICIAN', 'THERAPIST', 'CARDIOLOGIST', 'NEUROLOGIST', 'PARAMEDIC', 'PEDIATRICIAN', 'SURGEON']
export type Positions = 'HEAD PHYSICIAN' | 'OPERATOR' | 'THERAPIST' | 'CARDIOLOGIST' | 'NEUROLOGIST' | 'PARAMEDIC' | 'PEDIATRICIAN' | 'SURGEON' | 'USER' | 'DOCTORS'


export class GetUsersByPositionsDTO {
  @ApiProperty({example: 'THERAPIST'})
  @IsEnum(['HEAD PHYSICIAN', 'OPERATOR', 'THERAPIST', 'CARDIOLOGIST', 'NEUROLOGIST', 'PARAMEDIC', 'PEDIATRICIAN', 'SURGEON', 'USER'])
  position: Positions
}