import { Body, Controller, Post, Req, Res, ValidationPipe } from "@nestjs/common";
import { Response } from "express";
import { logindto } from "src/dto/login.dto";
import { AuthService } from "./auth.service";
import { UserType } from "src/database/entities/enums";

@Controller('auth')
export class AuthController{

    constructor(private authService : AuthService){}

    @Post('user/login')
    async loginNormalUser( @Body( new ValidationPipe() ) loginPayload : logindto, @Res() res : Response ){
        try{
            const {accessToken, refreshToken, userData} = await this.authService.loginUser(loginPayload);

            res.cookie(
                'accessToken',
                accessToken,
                {
                    httpOnly: true,
                    secure: true,
                    sameSite : 'strict',
                    maxAge: 1 * 24 * 60 * 60 * 1000
                }
            )

            res.cookie(
                'refreshToken',
                refreshToken,
                {
                    httpOnly: true,
                    secure: true,
                    sameSite : 'strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                }
            )

            res.status(201).json({
                success : true,
                message : "Login Successul",
                accessToken,
                refreshToken,
                ...userData
            })
        }
        catch(error){
            return res.status(error.status || 500).json({
                error : error.message
            })
        }
    }

    @Post('user/logout')
    async logout( @Req() req: Request, @Res() res: Response ){

        try{
            const user = req['user'];
            if(!user || user.userType !== UserType.User){
                return res.status(401).json({
                    message : 'Unauthorized'
                })
            } 

            const logOutUser = await this.authService.logoutUser(user.id)

            if(logOutUser){
                res.clearCookie(
                    'accessToken',
                    {
                        httpOnly : true,
                        secure : true,
                        sameSite : 'strict'
                    }
                )

                res.clearCookie(
                    'refreshToken',
                    {
                        httpOnly : true,
                        secure : true,
                        sameSite : 'strict'
                    }
                )

                return res.status(200).
                json({
                    success : true,
                    message : "Logged out successfully"
                })
            }
        } catch (error){
            return res.status(500).json({
                message : 'Something went wrong during logout',
            error : error.error.message            })
        }
    }

    @Post('doctor/login')
    async loginDoctor( @Body( new ValidationPipe() ) loginPayload : logindto, @Res() res : Response ){

        try {
            const {accessToken, refreshToken, userDetails} = await this.authService.logInDoctor(loginPayload);

            res.cookie(
                'accessToken',
                accessToken,
                {
                    httpOnly: true,
                    secure: true,
                    sameSite : 'strict',
                    maxAge: 1 * 24 * 60 * 60 * 1000
                }
            )

            res.cookie(
                'refreshToken',
                refreshToken,
                {
                    httpOnly: true,
                    secure: true,
                    sameSite : 'strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                }
            )

            res.status(201).json({
                success: true,
                message: "Login Successful",
                
                accessToken,
                refreshToken,
                ...userDetails,
            })
            
            
        } catch (error) {
            return res.status(error.status || 500).json({error : error.message});
        }


    }

    @Post('doctor/logout')
    async logoutDoctor( @Req() req: Request, @Res() res : Response  ){
        try {

            
            const user = req['user']
            if(!user || user.userType !== UserType.Doctor){
                return res.status(401).json({ message: 'Unauthorized' })
            }


            console.log("Auth Controller");
            
            const logoutUser = await this.authService.logOutDoctor(user.id);

            if(logoutUser){
                res.clearCookie(
                    'accessToken',
                    {
                        httpOnly: true,
                        secure: true,
                        sameSite: "strict"
                    }
                )
                res.clearCookie(
                    'refreshToken',
                    {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'strict'
                    }
                )

                return res.status(200).json({
                    success : true,
                    message: "Logged out successfully" })
            }

            
        } catch (error) {
            return res
                .status(500)
                .json({ message: 'Something went wrong during logout', error: error.message });
        }
    }

}