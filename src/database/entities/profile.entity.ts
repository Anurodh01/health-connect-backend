import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { degree, speciality, VerificationStatus } from "./enums";
import { Review } from "./review.entity";
import { DoctorEntity } from "./doctor.entity";
import { Transform } from "class-transformer";
class Location{
        latitude: number;
        longitude: number;
}

@Entity({ name: 'doctor_profiles' })
export class Profile{
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @Column({
        type: 'enum',
        enum: speciality,
        default: speciality.PHYSICIAN
    })
    speciality: speciality;

    @Column({
        type: 'enum',
        enum: degree,
        default: degree.other
    })
    degree: degree;

    @Column({
        type: 'text'
    })
    clinicAddress: string;

    @Column({
        type: 'simple-json'
    })
    location: Location;

    @Column({type: 'simple-array'})
    availability: string[];

    @OneToOne(() => DoctorEntity, (doctor) => doctor.profile, { onDelete: 'CASCADE' })
    @Transform(({ value }) => value.id)
    @JoinColumn()
    doctor: DoctorEntity;

    @OneToMany(()=> Review, (review)=> review.profile)
    reviews: Review[];

    @Column({
        type: 'enum',
        enum: VerificationStatus,
        default: VerificationStatus.AWAITING_VERIFICATION
    })
    verified: VerificationStatus;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Date;
}