import { IsNumber, IsString } from "@nestjs/class-validator";
import { IsNull } from "typeorm";



export class CreateReportDTO {
  @IsString()
  reportTitle: string

  @IsString()
  medicalResearchData: string

  @IsString()
  treatmentResults: string

  @IsString()
  doctorsComment: string

  @IsString()
  recipientId: string
}