import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
import { UserType } from "./enums";

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

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10);
    }


    

}