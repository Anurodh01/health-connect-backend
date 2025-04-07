import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware{

    constructor(private jwtService : JwtService){}

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
            

            req['user'] = payload;
            next();
            
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }
}