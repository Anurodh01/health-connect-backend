import { BadRequestException, Injectable, NestMiddleware, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
import { DoctorEntity } from "src/database/entities/doctor.entity";
import { UserType } from "src/database/entities/enums";
import { DoctorService } from "src/doctors/doctor.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware{

    constructor(private jwtService: JwtService, private doctorService: DoctorService) { }

    async use(req: Request, res : Response, next : NextFunction){

        try {

            const token = req.cookies?.accessToken || req.headers['authorization']?.replace('Bearer  ', '');

            if(!token) throw new UnauthorizedException('No token provided');

            console.log("TOken verified");
            

            const payload = await this.jwtService.verifyAsync(
                token, 
                { secret: process.env.ACCESS_TOKEN_SECRET },

            )

            console.log("Auth middleware payload extracted from user: ", payload);


            if(payload.userType === UserType.Doctor){
                const user: DoctorEntity = await this.doctorService.getDoctorDetail(payload.id);
            if (!user) {
                throw new NotFoundException("User doesn't exist!");
            }
            if (user && user.isLoggedOut) {
                throw new BadRequestException("Invalid Token");
            }
            req['user'] = user;
            next();
            }

            req['user'] = payload;
            next()
            
            
            
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }
}