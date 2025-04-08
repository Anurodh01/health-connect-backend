import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";
import { DoctorRepository } from "src/database/repositories/doctor.repository";
import { registerDoctorParams } from "src/utils/types";

@Injectable()
export class DoctorService {

    constructor(private doctorRepository: DoctorRepository) {

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
}