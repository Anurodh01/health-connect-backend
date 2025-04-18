import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { DoctorService } from "src/doctors/doctor.service";
import * as bcrypt from 'bcrypt';
import { DoctorRepository } from "src/database/repositories/doctor.repository";
import { registerDoctorParams } from "src/utils/types";
import { logindto } from "src/dto/login.dto";
import { UserRepository } from "src/database/repositories/user.repository";


@Injectable()
export class AuthService{

    constructor(private doctorRepository : DoctorRepository,
        private userRepository : UserRepository,
        private jwtService : JwtService
    ){}

    private async generateAccessToken(payload) : Promise<string>{
        const token = await this.jwtService.signAsync(
            payload,
            {
                secret : process.env.ACCESS_TOKEN_SECRET,
                expiresIn : '1d'
            }
        )

        return token;
    }

    private async generateRefreshToken(payload:number) : Promise<string>{
        const token = await this.jwtService.signAsync(
            {payload},
            {
                secret:process.env.REFRESH_TOKEN_SECRET,
                expiresIn: '7d'
            }

        )
        return token;
    }

    private async comparePassword(incomingpassword:string, savedPassword:string) : Promise<boolean> {
        console.log("Inside compare password", incomingpassword, savedPassword);
        
        return await bcrypt.compare(incomingpassword, savedPassword);
    }

    async loginUser(payload : logindto){

        try{
            const user = await this.userRepository.findByEMail(payload.email);

            if(!user) throw new UnauthorizedException('Invalid credentials');

            if(await this.comparePassword(payload.password, user.password)){

                const userData = {
                    id : user.id,
                    name : user.name,
                    email : user.email,
                    phone : user.phone,
                    userType : user.userType
                }

                const accessToken : string = await this.generateAccessToken(userData);

                const refreshToken : string = await this.generateRefreshToken(user.id);

                await this.userRepository.setRefreshToken(user.id, refreshToken);

                return {accessToken, refreshToken, userData}
            }else{
                throw new UnauthorizedException('Invalid credentials');
            }
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }

    async logoutUser(userId : number){

        try{
            await this.userRepository.clearRefreshToken(userId);
            return true;
        }catch (error){
            throw new InternalServerErrorException('Something went wrong')
        }
    }

    async logInDoctor(payload : logindto){

       try {
         const doctor = await this.doctorRepository.findByEmail(payload.email);
          
         if(!doctor) throw new UnauthorizedException('Invalid credentials');
 
         console.log("Auth service :: Login Doctor :: fetched doctor :: ", doctor);
 
         if(await this.comparePassword(payload.password, doctor.password)){
 
             const payload = {
                 id: doctor.id,
                 "name": doctor.name,
                 "email": doctor.email,
                 "phone": doctor.phone,
                 "userType": doctor.userType,
 
             }   
 
             const accessToken : string = await this.generateAccessToken(payload);
             console.log(accessToken)
             const refreshToken : string = await this.generateRefreshToken(doctor.id);
 
             await this.doctorRepository.setRefreshToken(doctor.id, refreshToken);

             return {accessToken, refreshToken, userDetails : payload}
         }else{
            throw new UnauthorizedException('Invalid credentials');
        }
 
 
       } catch (error) {
            throw new UnauthorizedException(error.message);
       }

    }

    async logOutDoctor(userId : number){

        try {
            
            await this.doctorRepository.clearRefreshToken(userId);
            return true;
        } catch (error) {
            throw new InternalServerErrorException('Something Went wrong')
        }

    }
}