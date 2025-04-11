import { Body, Controller, HttpException, HttpStatus, InternalServerErrorException, Post, Req, ValidationPipe } from "@nestjs/common";
import { registerdto } from "src/dto/register.dto";
import { UsersService } from "./users.service";
import { registerUserParams } from "src/utils/types";
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

            const user = req['user'];
            const savedUser = await this.userService.createProfile(user.id, profile)

            return {
                success : true,
                message : "Profile created successfully",
                userDetails : {
                    
                }
            }
        }
        catch(error){
            throw new InternalServerErrorException(error.message)
        }
    }
}