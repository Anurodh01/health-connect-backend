import { Body, Controller, InternalServerErrorException, Post, ValidationPipe } from "@nestjs/common";
import { registerdto } from "src/dto/register.dto";
import { DoctorService } from "./doctor.service";
import { registerDoctorParams } from "src/utils/types";
import { UserType } from "src/database/entities/enums";

@Controller('doctor')
export class DoctorController{

    constructor(private doctorService : DoctorService){}

    @Post('register')
    async registerDoctor(@Body( new ValidationPipe()) doctor: registerdto){

            const doctorData: registerDoctorParams = {
                name: doctor.name,
                email: doctor.email,
                phone: doctor?.phone || "",
                password: doctor.password,
                userType: UserType.Doctor
            }
        return await this.doctorService.registerDoctor(doctorData);
    }
}