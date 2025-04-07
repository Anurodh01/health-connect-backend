import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class UserRepository extends Repository<UserEntity>{
    
    constructor(private dataSource : DataSource){
        super(UserEntity, dataSource.createEntityManager());
    }

    async createUser(userData : Partial <UserEntity>) : Promise<UserEntity>{

        const user = this.create(userData);

        return await this.save(user);
    }

    async findByEMail (email : string) : Promise<UserEntity | null> {
        return await this.findOne({where : {email}});
    }

    async setRefreshToken(userId: number, refreshToken : string) : Promise<void>{
        await this.update(userId, {refreshToken});
    }
    async clearRefreshToken(userId:number) : Promise<void>{
        await this.update(userId, {refreshToken : null});
    }

    

}