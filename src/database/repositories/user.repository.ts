import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { UserProfileEntity } from "../entities/userprofile.entity";

@Injectable()
export class UserRepository extends Repository<UserEntity>{
    
    constructor(private dataSource : DataSource){
        super(UserEntity, dataSource.createEntityManager());
    }

    async createUser(userData : Partial <UserEntity>) : Promise<UserEntity>{

        const user = this.create(userData);

        return await this.save(user);
    }

    async updateProfile(id:number, profile : UserProfileEntity){
        const user = await this.findOne({where : {id}});

        if(!user){
            throw new HttpException("User not found. Cannot create profile.", HttpStatus.UNAUTHORIZED)
        }

        user.profile = profile;
        return await this.save(user);
    }

    async findByEMail (email : string) : Promise<UserEntity | null> {
        return await this.findOne({where : {email}});
    }

    async findById(id : number) : Promise<UserEntity | null>{
        return await this.findById(id);
    }

    async setRefreshToken(userId: number, refreshToken : string) : Promise<void>{
        await this.update(userId, {refreshToken});
    }
    async clearRefreshToken(userId:number) : Promise<void>{
        await this.update(userId, {refreshToken : null});
    }

    

}