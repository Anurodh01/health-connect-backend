import { DataSource, Repository } from "typeorm";
import { BookedSlots, DoctorAvailabilityEntity } from "../entities/doctoravailability.entity";
import { Injectable } from "@nestjs/common";
import { DoctorEntity } from "../entities/doctor.entity";


@Injectable()
export class DoctorAvailabilityRepository extends Repository<DoctorAvailabilityEntity>{

    constructor(datasource : DataSource){
        super(DoctorAvailabilityEntity , datasource.createEntityManager())
    }

    async createAvailability(doctor : DoctorEntity, data : Partial<DoctorAvailabilityEntity> ){
        const newRecord = this.create(data);
        newRecord.doctor = doctor;
        const bookedSlots : BookedSlots[] = new Array<BookedSlots>
        newRecord.bookedSlots =bookedSlots
        return await this.save(newRecord);
    }

}