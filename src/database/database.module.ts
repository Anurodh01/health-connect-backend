import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./repositories/user.repository";
import { DoctorRepository } from "./repositories/doctor.repository";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ProfileRepository } from "./repositories/profile.repository";
import { UserEntity } from "./entities/user.entity";
import { DoctorEntity } from "./entities/doctor.entity";
import { Review } from "./entities/review.entity";
import { Profile } from "./entities/profile.entity";


@Module({
    imports: [
        TypeOrmModule.forRootAsync({
           
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get<string>('database.host'),
                port: configService.get<number>('database.port'),
                username: configService.get<string>('database.username'),
                password: configService.get<string>('database.password'),
                database: configService.get('database.name'),
                synchronize: false,
                entities: [UserEntity, DoctorEntity, Review, Profile]
            }),
            inject: [ConfigService]
        }),
        
    ],
    providers: [UserRepository, DoctorRepository, ProfileRepository],
    exports: [UserRepository, DoctorRepository, ProfileRepository]
   
})
export class DatabaseModule{}