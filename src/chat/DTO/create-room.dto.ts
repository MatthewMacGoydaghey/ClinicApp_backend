import { IsArray, IsPhoneNumber, IsString, isPhoneNumber, isString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";




export class CreateRoomDTO {
  @ApiProperty({example: '+79241860824'})
  @IsPhoneNumber()
  interlocutor: string
}