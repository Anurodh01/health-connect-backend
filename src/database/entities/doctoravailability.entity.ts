import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DoctorEntity } from "./doctor.entity";
import { weekdays } from "./enums";
import { json } from "stream/consumers";

export class BookedSlots {
    date : Date
    weekday : weekdays;
    startTime : string;
    endTime : string;
    userId : number;
}

@Entity({name : 'doctor_availability'})
export class DoctorAvailabilityEntity{

    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne(()=> DoctorEntity, (doctor) => doctor.availability )
    doctor : DoctorEntity

    @Column({
        type : "enum",
        enum : weekdays
    })
    dayOfWeek: weekdays

    @Column()
    startTime:string;

    @Column()
    endTime:string;

    @Column()
    appointmentDurationInMinutes: number;

    @Column({
        type : "json",
       

    })
    bookedSlots : BookedSlots[]

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
    
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}

