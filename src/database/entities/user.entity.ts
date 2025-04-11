import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
import { UserType } from "./enums";
import { UserProfileEntity } from "./userprofile.entity";

@Entity({name : 'users'})
export class UserEntity{

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
        default : UserType.User
    })
    userType : UserType

    @OneToOne(()=> UserProfileEntity)
    @JoinColumn()
    profile : UserProfileEntity

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10);
    }


    // `name`, `email`, `phone`, `password`, userType 

}