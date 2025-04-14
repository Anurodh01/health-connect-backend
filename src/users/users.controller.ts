import { Body, Controller, Delete, Get, HttpException, HttpStatus, InternalServerErrorException, Post, Req, ValidationPipe } from "@nestjs/common";
import { registerdto } from "src/dto/register.dto";
import { UsersService } from "./users.service";
import { registerUserParams, userProfileParams } from "src/utils/types";
import { UserType } from "src/database/entities/enums";
import { UserProfileDto } from "src/dto/userprofile.dto";
import { Request } from "express";

@Controller('users')
export class UsersController{

    constructor(private userService : UsersService){}

    @Post('register')
    async registerUser(@Body(new ValidationPipe()) user : registerdto){

        try {
            const newUserData : registerUserParams = {
                name: user.name,
                email: user.email,
                phone: user.phone || "",
                password: user.password,
                userType: UserType.User
            }

            const savedUser =  await this.userService.registerUser(newUserData);

            if(!savedUser){
                throw new HttpException("Something went wrong while creating user.", HttpStatus.INTERNAL_SERVER_ERROR);
            }

            return {
                "success": true,
                "message": "User created successfully",
                ...savedUser
             }


        } catch (error) {
            
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
        
    }

    @Post('profile')
    async createUserProfile(@Body(new ValidationPipe()) profile : UserProfileDto, @Req() req : Request){

        try{
            console.log("controller reached");
            
            const user = req['user'];

            const data : userProfileParams = {
                dateofbirth: new Date(profile.dateofbirth),
                gender: profile.gender,
                locality: profile.locality,
                city: profile.city,
                state: profile.state,
                country: profile.country,
                pincode : profile.pincode,
                location: profile.location
            }
            
            
                data.dateofbirth = new Date(profile.dateofbirth);
            const savedUser = await this.userService.createProfile(user.id, data)

            return {
                success : true,
                message : "Profile created successfully",
                userDetails : {
                    ...savedUser
                }
            }
        }
        catch(error){
            throw new InternalServerErrorException(error.message)
        }
    }

    @Post('bookappointment')
    async bookAppointment(){

    }

    @Delete('cancelAppointment')
    async cancelAppointment(){
        
    }

    @Get('allappointments')
    async getAllAppointments(){

    }
}