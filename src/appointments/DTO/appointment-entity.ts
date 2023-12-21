import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/DTO/user-entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


export type Doctors = 'THERAPIST' | 'CARDIOLOGIST' | 'NEUROLOGIST' | 'PEDIATRICIAN' | 'SURGEON'
@Entity()
export class Appointment {
  @ApiProperty({example: 1})
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({example: 'THERAPIST'})
  @Column({enum: ['THERAPIST', 'CARDIOLOGIST', 'NEUROLOGIST', 'PEDIATRICIAN', 'SURGEON']})
  requestedDoctor: Doctors

  @ApiProperty({example: 'wanna help docta'})
  @Column('text')
  patientComment: string

  @ApiProperty()
  @Column('date', {nullable: true})
  date: string

  @ManyToOne(() => User)
  @JoinColumn()
  doctor: User

  @ManyToOne(() => User)
  @JoinColumn()
  patient: User
}