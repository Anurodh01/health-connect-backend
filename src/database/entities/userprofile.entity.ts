import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { gender } from "./enums";
import { MedicalHistoryEntity } from "./medicalhistory.entity";

class Location {
    latitude: number;
    longitude: number;
}



@Entity({ name: "user_profile" })
export class UserProfileEntity {

    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({
        type : "date"
    })
    dateofbirth : Date

    @Column({
        type : 'enum',
        enum : gender
    })
    gender : gender

    get address() {
        return `${this.area}, ${this.city}, ${this.state}, ${this.country}, ${this.pincode}`
    }

    @Column({
        type: 'longtext',
        nullable: true
    })
    area: string

    @Column({
        type: 'text'
    })
    city: string

    @Column({
        type: 'text'
    })
    state: string

    @Column({
        type: 'text'
    })
    country: string

    @Column({
        type : 'int'
    })
    pincode: number;

    @Column({
        type: 'simple-json'
    })
    location: Location;

    

    @OneToMany( ()=> MedicalHistoryEntity, (medicalhistory) => medicalhistory.user )
    medicalHistory : MedicalHistoryEntity[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;



}