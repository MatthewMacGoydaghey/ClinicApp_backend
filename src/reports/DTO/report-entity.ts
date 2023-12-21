import { User } from "src/users/DTO/user-entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Report {
@PrimaryGeneratedColumn()
id: number

@Column()
reportTitle: string

@Column()
medicalResearchData: string

@Column({nullable: true})
treatmentResults: string

@Column({nullable: true})
doctorsComment: string

@Column({nullable: true})
image: string

@ManyToOne(() => User)
@JoinColumn()
sender: User

@ManyToOne(() => User)
@JoinColumn()
recipient: User
}