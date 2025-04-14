import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpException, HttpStatus, InternalServerErrorException, Param, ParseIntPipe, Post, Query, Req, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { registerdto } from "src/dto/register.dto";
import { DoctorService } from "./doctor.service";
import { registerDoctorParams } from "src/utils/types";
import { UserType } from "src/database/entities/enums";
import { ProfileDto } from "src/dto/profile.dto";
import { Request } from "express";
import { SearchQueryParamDto } from "src/dto/search-query.dto";
import { doctorAvailabilityDto } from "src/dto/doctoravailability.dto";

@Controller('doctor')
@UseInterceptors(ClassSerializerInterceptor)
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

    @Get('/search')
    searchDoctors(@Query(ValidationPipe) searchQuery: SearchQueryParamDto) {
        return this.doctorService.searchDoctor(searchQuery);
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
        return await this.doctorService.createProfile(id, profileDto);
    }

    @Delete('/soft-delete')
    deleteDoctorDetail(@Req() req: Request) {
        const authenticatedUser = req['user']
        let id = authenticatedUser?.id;
        return this.doctorService.deleteDoctor(id);
    }

    @Get('profile')
    async getProfile(@Req() req: Request) {
        const authenticatedUser = req['user'];
        let id = authenticatedUser?.id;
        return await this.doctorService.getProfile(id);
    }

    @Post('doctoravailability')
    async postDoctorAvailability(@Req() req : Request, @Body( new ValidationPipe() ) payload : doctorAvailabilityDto){

        const user = req['user'];
        const savedDetails = await this.doctorService.saveDoctorAvailabilityDetails(user.id, payload);

        return {
            success : true,
            message : "Doctor saved successfully",
            ...savedDetails
        }

    }

    @Get('doctoravailability')
    async getDoctorAvailability(){

    }


}