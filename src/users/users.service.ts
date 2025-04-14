import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserRepository } from "src/database/repositories/user.repository";
import { UserProfileRepository } from "src/database/repositories/userprofile.repository";
import { registerUserParams, userProfileParams } from "src/utils/types";

@Injectable()
export class UsersService{

    constructor(private userRepository : UserRepository, private userProfileRepository : UserProfileRepository) {}

    async registerUser(user : registerUserParams){

        try {

            const savedUser = await this.userRepository.createUser(user);

            return {
                id : savedUser.id,
                name : savedUser.name,
                email : savedUser.email,
                phone : savedUser.phone,
                userType : savedUser.userType
            }


        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }



    async createProfile(id:number, profile : userProfileParams){

        const user = await this.userRepository.findById(id);
        if(!user){
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
        }

        
        console.log("User service :: Create Profile :: ",user);
        

        const savedProfile = await this.userProfileRepository.createUserProfile(user, profile);

        user.profile = savedProfile;

        return await this.userRepository.save(user);

    }

    async getUserProfile(id:number){
        const user = await this.userRepository.findById(id);

        return user;

    }
        
    
}