import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DoctorEntity } from "src/database/entities/doctor.entity";
import { UserEntity } from "src/database/entities/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { DatabaseModule } from "src/database/database.module";


@Module({
    imports:[
        TypeOrmModule.forFeature([UserEntity, DoctorEntity]),
        JwtModule.register({
            global:true
        }),
        DatabaseModule
    ],
    controllers : [AuthController],
    providers : [AuthService]
})
export class AuthModule{}