import { ApiProperty } from "@nestjs/swagger"



export class CreateMessageDTO {
  @ApiProperty({example: '1'})
  roomId: string

  @ApiProperty({example: '+79241860627'})
  phoneNumber: string
  
  @ApiProperty({example: 'Hi there babe'})
  message: string
}