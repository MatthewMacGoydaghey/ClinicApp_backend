import { ApiProperty } from "@nestjs/swagger";
import { Positions } from "src/users/DTO/get-users-by-position.dto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Position {

  @ApiProperty({example: 1})
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({example: 'SURGEON'})
  @Column({enum: ['HEAD PHYSICIAN', 'OPERATOR', 'THERAPIST', 'CARDIOLOGIST', 'NEUROLOGIST', 'PARAMEDIC', 'PEDIATRICIAN', 'SURGEON', 'USER']})
  value: Positions

  @ApiProperty({example: 'Has standart doctor`s rights'})
  @Column()
  description: string
}