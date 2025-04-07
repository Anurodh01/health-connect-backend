import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { DoctorEntity } from "./entities/doctor.entity";
import { UserRepository } from "./repositories/user.repository";
import { DoctorRepository } from "./repositories/doctor.repository";


@Module({
    imports:[ TypeOrmModule.forRoot({
        type : 'mysql',
        host : process.env.DB_HOST || 'localhost',
        port : +process.env.DB_PORT || 3306,
        username : process.env.DB_USER || 'root',
        password : process.env.DB_PASS || 'root',
        database : process.env.DB_NAME || 'healthconnectDB',
        entities : [ UserEntity, DoctorEntity],
        synchronize : false
    })],
    providers:[UserRepository, DoctorRepository],
    exports: [UserRepository, DoctorRepository]
   
})
export class DatabaseModule{}