import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./repositories/user.repository";
import { DoctorRepository } from "./repositories/doctor.repository";
import { ConfigModule, ConfigService } from "@nestjs/config";


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
                entities: ["dist/database/**/*.entity.js"],
            }),
            inject: [ConfigService]
        })
    ],
    providers:[UserRepository, DoctorRepository],
    exports: [UserRepository, DoctorRepository]
   
})
export class DatabaseModule{}