import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
import { UserEntity } from "./entities/user.entity";
import { Profile } from "./entities/profile.entity";
import { DoctorEntity } from "./entities/doctor.entity";
import { Review } from "./entities/review.entity";
import { UserProfileEntity } from "./entities/userprofile.entity";
import { MedicalHistoryEntity } from "./entities/medicalhistory.entity";
import { DoctorAvailabilityEntity } from "./entities/doctoravailability.entity";
dotenv.config();

export const MySQLDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  entities: [UserEntity, Profile, DoctorEntity, Review, UserProfileEntity, MedicalHistoryEntity, DoctorAvailabilityEntity],
    synchronize: false,
  migrations: ['src/migrations/**/*{.ts,.js}'],
  });
