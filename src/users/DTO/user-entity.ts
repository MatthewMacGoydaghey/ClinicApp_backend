import { ApiProperty } from "@nestjs/swagger";
import { Appointment } from "src/appointments/DTO/appointment-entity";
import { Position } from "src/positions/DTO/position-entity";
import { Report } from "src/reports/DTO/report-entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
@ApiProperty({example: 1, description: 'Primary key'})
@PrimaryGeneratedColumn()
id: number

@ApiProperty({example: 'Zhora Balaganov'})
@Column()
fullname: string

@ApiProperty({example: '5829Zhor!'})
@Column()
password: string

@ApiProperty({example: '+79241952085', description: 'Validates Russian region code only'})
@Column({unique: true})
phoneNumber: string

@ApiProperty({example: 'Zhora@gmail.com', description: 'Can be null'})
@Column({
  nullable: true
})
email: string

@ApiProperty()
@ManyToMany(() => Position)
@JoinTable()
positions: Position[]
  
@ApiProperty()
@OneToMany(() => Appointment, (appointment) => appointment.patient)
appointments: Appointment[]

@ApiProperty()
@OneToMany(() => Appointment, (appointment) => appointment.doctor)
patientAppointments: Appointment[]


@ApiProperty()
@OneToMany(() => Report, (report) => report.sender)
sentReports: Report[]

@ApiProperty()
@OneToMany(() => Report, (report) => report.recipient)
receivedReports: Report[]
}
function JoinColumn(): (target: User, propertyKey: "doctorsAppointments") => void {
  throw new Error("Function not implemented.");
}
