import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/DTO/user-entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Report {
@ApiProperty({example: 1, description: 'Primary key'})
@PrimaryGeneratedColumn()
id: number

@ApiProperty({example: 'Cardiologic observations results', description: 'Title of the report'})
@Column()
reportTitle: string

@ApiProperty()
@Column()
medicalResearchData: string

@ApiProperty()
@Column({nullable: true})
treatmentResults: string

@ApiProperty()
@Column({nullable: true})
doctorsComment: string

@ApiProperty()
@Column({nullable: true})
image: string

@ApiProperty()
@ManyToOne(() => User)
@JoinColumn()
sender: User

@ApiProperty()
@ManyToOne(() => User)
@JoinColumn()
recipient: User
}