import { BadRequestException, Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
import { DoctorService } from "src/doctors/doctor.service";


@Injectable()
export class DoctorAuthMiddleware implements NestMiddleware{

    constructor (private jwtService: JwtService, private doctorService : DoctorService){}

   async use(req : Request, res : Response, next : NextFunction){

    try{
        const token = req.cookies?.accessToken || req.headers['authorization']?.replace('Bearer ','');

        if(!token) throw new UnauthorizedException('No token provided');

        const payload = await this.jwtService.verifyAsync(token,{
            secret: process.env.ACCESS_TOKEN_SECRET
        })

        const user = this.doctorService.getDoctorDetail(payload.id);

        if(!user){
            throw new UnauthorizedException('User not found')
        }

        if(user && (await user).isLoggedOut){
            throw new BadRequestException("Invalid token");
        }

        req['user'] = user;
        next()


    }catch(error){
        throw new UnauthorizedException(error.message)
    }
   }
}