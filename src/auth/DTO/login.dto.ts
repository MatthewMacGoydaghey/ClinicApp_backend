import { IsPhoneNumber, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class LoginUserDTO {
@ApiProperty({example: '+79241860628'})
@IsPhoneNumber('RU', {message: 'Phone number must start with +7924'})
phoneNumber: string

@ApiProperty({example: 'zhora1234'})
@IsString()
password: string
}