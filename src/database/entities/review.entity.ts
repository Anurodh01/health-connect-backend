import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";
import { UserEntity } from "./user.entity";

@Entity({name: 'reviews'})
export class Review{
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @ManyToOne(()=> Profile, (profile)=> profile.reviews)
    profile: Profile;

    @ManyToOne(()=> UserEntity)
    user: UserEntity;

    @Column()
    rating: number;

    @Column()
    comment: string;

    @CreateDateColumn()
    timestamp:Date;
}