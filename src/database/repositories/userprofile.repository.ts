import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UserProfileEntity } from "../entities/userprofile.entity";
import { UserEntity } from "../entities/user.entity";


@Injectable()
export class UserProfileRepository extends Repository<UserProfileEntity>{

    constructor(datasource : DataSource){
        super(UserProfileEntity, datasource.createEntityManager());
    }

    async createUserProfile( user : UserEntity,  profileData : Partial <UserProfileEntity>){
            const newProfile = this.create(profileData);
            
            const profile = await this.save(newProfile);

            return profile;

    }
}