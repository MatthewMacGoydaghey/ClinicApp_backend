import { IsDate, IsNumber, IsObject, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class AttachAppointmentDTO {
  @ApiProperty({example: 1})
  @IsNumber()
  appointmentId: number

  @ApiProperty({example: 6})
  @IsNumber()
  doctorId: number

  @ApiProperty()
  @IsString()
  appointmentDate: string
}