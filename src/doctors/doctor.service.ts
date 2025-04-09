import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { DoctorEntity } from "src/database/entities/doctor.entity";
import { DoctorRepository } from "src/database/repositories/doctor.repository";
import { ProfileRepository } from "src/database/repositories/profile.repository";
import { ProfileDto } from "src/dto/profile.dto";
import { registerDoctorParams } from "src/utils/types";

@Injectable()
export class DoctorService {

    constructor(private doctorRepository: DoctorRepository, private profileRepository: ProfileRepository) {

    }

    async registerDoctor(doctor: registerDoctorParams) {
        try {
            console.log("Doctor Service :: Register Doctor :: ", doctor);

            const savedDoctor = await this.doctorRepository.createDoctor(doctor);

            return {
                id: savedDoctor.id,
                "name": savedDoctor.name,
                "email": savedDoctor.email,
                "phone": savedDoctor.phone,
                "userType": savedDoctor.userType,
            }

            

        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }

    }

    async getDoctorDetail(id: number) {
        const doctor = await this.doctorRepository.findOne({ where: { id }, relations: ['profile'] });
        if (!doctor) {
            throw new NotFoundException('No Details Found!');
        }
        return doctor;
    }

    async createProfile(id: number, profiledto: ProfileDto) {
        const doctor: DoctorEntity = await this.doctorRepository.findOne({ where: { id: id }, relations: ['profile'] });
        if (!doctor) {
            throw new HttpException('Doctor Not found with id ' + id, HttpStatus.NOT_FOUND);
        }
        if (doctor.profile) {
            return doctor.profile;
        }
        const profile = await this.profileRepository.createProfile(doctor, profiledto);
        doctor.profile = profile;
        await this.doctorRepository.save(doctor);
        return profile;
    }

    async getProfile(id: number) {
        const doctor = await this.doctorRepository.findOne({
            where: {
                id: id
            },
            relations: ['profile']
        });
        if (!doctor.profile) {
            throw new NotFoundException('No Profile Found');
        }
        return doctor.profile;
    }


}