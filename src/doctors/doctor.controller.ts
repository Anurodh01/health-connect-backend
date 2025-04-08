import { Body, Controller, HttpException, HttpStatus, InternalServerErrorException, Post, ValidationPipe } from "@nestjs/common";
import { registerdto } from "src/dto/register.dto";
import { DoctorService } from "./doctor.service";
import { registerDoctorParams } from "src/utils/types";
import { UserType } from "src/database/entities/enums";
import { error } from "console";

@Controller('doctor')
export class DoctorController{

    constructor(private doctorService : DoctorService){}

    @Post('register')
    async registerDoctor(@Body( new ValidationPipe()) doctor: registerdto){

           try {
             const doctorData: registerDoctorParams = {
                 name: doctor.name,
                 email: doctor.email,
                 phone: doctor?.phone || "",
                 password: doctor.password,
                 userType: UserType.Doctor
             }

             const savedDoctor = await this.doctorService.registerDoctor(doctorData);

             if(!savedDoctor){
                throw new HttpException("Something went wrong while creating doctor.", HttpStatus.INTERNAL_SERVER_ERROR);
             }

             return {
                "success": true,
                "message": "User created successfully",
                ...savedDoctor
             }
           } catch (error) {
                throw new HttpException(error, HttpStatus.BAD_REQUEST);
           }
    }
}