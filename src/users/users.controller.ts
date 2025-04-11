import { Body, Controller, HttpException, HttpStatus, Param, ParseIntPipe, Post, Req, ValidationPipe } from "@nestjs/common";
import { registerdto } from "src/dto/register.dto";
import { UsersService } from "./users.service";
import { registerUserParams } from "src/utils/types";
import { UserType } from "src/database/entities/enums";
import { Request } from "express";
import { ReviewDto } from "src/dto/review.dto";

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
    @Post('/review/:doctorId')
    giveReviewForDoctor(@Req() req: Request, @Param('doctorId', ParseIntPipe) docterId: number, @Body(ValidationPipe) reviewdto: ReviewDto) {
        // const user = req['user'];
        return this.userService.createReview(docterId, reviewdto);
    }
}