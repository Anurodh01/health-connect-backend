import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DoctorEntity } from "./doctor.entity";
import { UserEntity } from "./user.entity";

@Entity()
export class appointmentEntity {

    @PrimaryGeneratedColumn({ type: 'int' })
    id: number

    @ManyToOne(() => DoctorEntity)
    doctor: DoctorEntity

    @ManyToOne(() => UserEntity)
    user: UserEntity

    @Column()
    date: Date;

    @Column()
    startTime: string;

    @Column()
    endTime: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

}