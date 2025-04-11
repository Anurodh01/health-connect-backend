import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserRepository } from "src/database/repositories/user.repository";
import { registerUserParams, userProfileParams } from "src/utils/types";

@Injectable()
export class UsersService{

    constructor(private userRepository : UserRepository) {}

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


    }
        
    
}