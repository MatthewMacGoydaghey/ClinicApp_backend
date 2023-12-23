import { User } from "src/users/DTO/user-entity";
import { CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./message-entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity()
export class Room {
  @ApiProperty({example: 1})
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({example: [User]})
  @ManyToMany(() => User)
  @JoinTable()
  users: User[]

  @ApiProperty({example: [Message]})
  @ApiProperty()
  @OneToMany(() => Message, (message) => message.room)
  messages: Message[]

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date
}