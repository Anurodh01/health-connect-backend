import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { DoctorEntity } from "../entities/doctor.entity";

@Injectable()
export class DoctorRepository extends Repository<DoctorEntity>{

    constructor(private dataSource: DataSource){
        super(DoctorEntity, dataSource.createEntityManager());
    }

    async createDoctor(doctorData : Partial<DoctorEntity>) : Promise<DoctorEntity> {

        console.log("Doctor Repository :: Create Doctor:: ", doctorData);
        

        const doctor = this.create(doctorData);
        doctor.isLoggedOut = true;
        return await this.save(doctor);
        
        
    }

    async findByEmail (email : string) : Promise <DoctorEntity | null>{
        return await this.findOne({where : {email}});
    }

    async setRefreshToken(userId: number, refreshToken : string) : Promise<void>{
        await this.update(userId, { isLoggedOut: false, refreshToken });
    }
    async clearRefreshToken(userId:number) : Promise<void>{
        await this.update(userId, {refreshToken : null});
    }
}