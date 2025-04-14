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
import { UserProfileEntity } from "./entities/userprofile.entity";
import { MedicalHistoryEntity } from "./entities/medicalhistory.entity";
import { UserProfileRepository } from "./repositories/userprofile.repository";
import { ReviewRepository } from "./repositories/review.repository";
import { DoctorAvailabilityRepository } from "./repositories/doctoravailability.repository";
import { DoctorAvailabilityEntity } from "./entities/doctoravailability.entity";
import { appointmentEntity } from "./entities/appointment.entity";


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
                entities: [UserEntity, DoctorEntity, Review, Profile, UserProfileEntity, MedicalHistoryEntity, DoctorAvailabilityEntity, appointmentEntity]
            }),
            inject: [ConfigService]
        }),
        
    ],
    providers: [UserRepository, DoctorRepository, ProfileRepository,UserProfileRepository, DoctorAvailabilityRepository, ReviewRepository],
    exports: [UserRepository, DoctorRepository, ProfileRepository,UserProfileRepository,DoctorAvailabilityRepository, ReviewRepository]
   
})
export class DatabaseModule{}