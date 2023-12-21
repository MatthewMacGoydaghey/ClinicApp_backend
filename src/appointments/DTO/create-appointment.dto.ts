import { IsEnum, IsString } from "@nestjs/class-validator";
import { Doctors } from "./appointment-entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAppointmentDTO {
  @ApiProperty({example: 'THERAPIST'})
  @IsEnum(['THERAPIST', 'CARDIOLOGIST', 'NEUROLOGIST', 'PEDIATRICIAN', 'SURGEON'])
  requstedDoctor: Doctors

  @ApiProperty({example: 'wanna help docta'})
  @IsString()
  patientComment: string
}