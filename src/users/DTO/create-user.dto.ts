import { IsEmail, IsPhoneNumber, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Unique } from "typeorm";


export class CreateUserDTO {
  @ApiProperty({example: 'Zhora Balaganov'})
  @IsString({message: 'Name must be a string, consists of firstname and surname'})
  fullname: string
  
  @ApiProperty({example: '5829Zhor!'})
  @IsString()
  password: string

  @ApiProperty({example: '+79241952085', description: 'Validates Russian region code only'})
  @IsPhoneNumber('RU', {message: 'Phone number must start with +7'})
  phoneNumber: string

  @ApiProperty({example: 'Zhora@gmail.com', description: 'Can be null'})
  @IsEmail()
  email: string
}