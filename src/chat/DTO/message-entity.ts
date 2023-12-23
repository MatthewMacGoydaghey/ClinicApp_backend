import { User } from "src/users/DTO/user-entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./room-entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity()
export class Message {
  @ApiProperty({example: 1})
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column()
  text: string

  @ApiProperty({example: User})
  @ManyToOne(() => User)
  @JoinColumn()
  user: User

  @ApiProperty({example: Room})
  @ManyToOne(() => Room)
  @JoinColumn()
  room: Room

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date
}