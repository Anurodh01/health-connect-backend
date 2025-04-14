import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
import { UserType } from "./enums";
import { Profile } from "./profile.entity";
import { DoctorAvailabilityEntity } from "./doctoravailability.entity";

@Entity({name : 'doctors'})
export class DoctorEntity{

    @PrimaryGeneratedColumn({type : 'int'})
    id:number;

    @Column()
    name : string;

    @Column({unique : true})
    email : string;

    @Column({nullable : true})
    phone : string;

    @Column()
    password : string;

    @Column({nullable : true})
    refreshToken:string;

    @Column({
        type : 'enum',
        enum : UserType,
        default : UserType.Doctor
    })
    userType : UserType

    @OneToOne(() => Profile, (profile) => profile.doctor)
    profile: Profile;

    @OneToMany(()=> DoctorAvailabilityEntity, (availability) => availability.doctor)
    availability : DoctorAvailabilityEntity[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date;

    @Column()
    isLoggedOut: boolean;

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10);
    }


    

}