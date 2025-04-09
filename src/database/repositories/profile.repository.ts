import { DataSource, Repository } from "typeorm";
import { Profile } from "../entities/profile.entity";
import { ProfileDto } from "src/dto/profile.dto";
import { Injectable } from "@nestjs/common";
import { DoctorEntity } from "../entities/doctor.entity";
import { DoctorRepository } from "./doctor.repository";

@Injectable()
export class ProfileRepository extends Repository<Profile>{
    constructor(datasource: DataSource){
        super(Profile, datasource.createEntityManager());
    }
    async createProfile(doctor: DoctorEntity ,profile: Partial<Profile>){
        const createdProfile = this.create(profile);
        createdProfile.doctor = doctor;
        console.log(createdProfile);
        return this.save(createdProfile);
    }
}