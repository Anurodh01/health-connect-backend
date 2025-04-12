import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { DoctorEntity } from "src/database/entities/doctor.entity";
import { Profile } from "src/database/entities/profile.entity";
import { DoctorRepository } from "src/database/repositories/doctor.repository";
import { ProfileRepository } from "src/database/repositories/profile.repository";
import { ProfileDto } from "src/dto/profile.dto";
import { SearchQueryParamDto } from "src/dto/search-query.dto";
import { registerDoctorParams } from "src/utils/types";
import { Like } from "typeorm";

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
        const doctor = await this.doctorRepository.findOne({ where: { id }, relations: { profile: { reviews: true } } });
        if (!doctor) {
            throw new NotFoundException('Doctor Details Not Found!');
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
        const profile: Profile = await this.profileRepository.createProfile(doctor, profiledto);
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

    async deleteDoctor(id: number) {
        const doctor = await this.doctorRepository.findOne({ where: { id: id }, relations: ['profile'] });
        if (doctor.profile) {
            await this.profileRepository.softDelete(doctor.profile.id);
        }
        const deletedDoctor = await this.doctorRepository.softDelete(id);
        return { id: id, "deleted": deletedDoctor.affected ? true : false }
    }

    async searchDoctor(searchQuery: SearchQueryParamDto) {
        let { area, pincode, speciality, city, state, country, page = 0, limit = 5 } = searchQuery;
        const profileConditions = {}
        if (area) profileConditions['area'] = Like(`%${area}%`);
        if (pincode) profileConditions['pincode'] = pincode;
        if (speciality) profileConditions['speciality'] = speciality;
        if (city) profileConditions['city'] = Like(`%${city}%`);
        if (state) profileConditions['state'] = Like(`%${state}%`);
        if (country) profileConditions['country'] = Like(`%${country}%`);
        const result = await this.doctorRepository.find({
            where: {
                profile: profileConditions
            },
            relations: ['profile'],
            skip: page * limit,
            take: limit
        });
        return result;
    }
}