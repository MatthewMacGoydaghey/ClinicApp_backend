import { IsNumber, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsNull } from "typeorm";



export class CreateReportDTO {
  @ApiProperty({example: 'Therapist observation results'})
  @IsString()
  reportTitle: string

  @ApiProperty()
  @IsString()
  medicalResearchData: string

  @ApiProperty()
  @IsString()
  treatmentResults: string

  @ApiProperty()
  @IsString()
  doctorsComment: string

  @ApiProperty()
  @IsString()
  recipientId: string
}