import { Body, Controller, Get, HttpException, HttpStatus, InternalServerErrorException, Param, ParseIntPipe, Post, Req, ValidationPipe } from "@nestjs/common";
import { registerdto } from "src/dto/register.dto";
import { DoctorService } from "./doctor.service";
import { registerDoctorParams } from "src/utils/types";
import { UserType } from "src/database/entities/enums";
import { ProfileDto } from "src/dto/profile.dto";
import { Request } from "express";
import { instanceToPlain } from "class-transformer";

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
    @Get('detail')
    getDoctorDetail(@Req() req: Request) {
        const authenticatedUser = req['user']
        let id = authenticatedUser?.id;
        return this.doctorService.getDoctorDetail(id);
    }
    @Post('profile')
    async createProfile(@Req() req: Request, @Body(new ValidationPipe()) profileDto: ProfileDto) {
        const authenticatedUser = req['user']
        let id = authenticatedUser?.id;
        return instanceToPlain(await this.doctorService.createProfile(id, profileDto));
    }

    @Get('profile')
    async getProfile(@Req() req: Request) {
        const authenticatedUser = req['user'];
        let id = authenticatedUser?.id;
        return this.doctorService.getProfile(id);
    }
}