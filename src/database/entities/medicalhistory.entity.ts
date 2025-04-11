import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DoctorEntity } from "./doctor.entity";
import { UserEntity } from "./user.entity";
import { UserProfileEntity } from "./userprofile.entity";


@Entity({name : 'user_medical_history'})
export class MedicalHistoryEntity{

    @PrimaryGeneratedColumn({type : 'int'})
    id : number

    @OneToOne(()=> DoctorEntity)
    @JoinColumn()
    doctor : DoctorEntity

    @Column({type : 'text'})
    disease_name : string

    @Column({type : 'date'})
    diagnosis_date : Date

    @Column({
        type : 'longtext',
        nullable : true
    })
    notes : string; 

    @ManyToOne(()=> UserProfileEntity, (user)=> user.medicalHistory)
    user : UserProfileEntity

    @CreateDateColumn({ type: 'timestamp' })
        createdAt: Date;
    
        @UpdateDateColumn({ type: 'timestamp' })
        updatedAt: Date;


}