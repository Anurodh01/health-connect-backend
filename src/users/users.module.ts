import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { DatabaseModule } from "src/database/database.module";
import { DoctorModule } from "src/doctors/doctors.module";

@Module({
    imports: [DatabaseModule, DoctorModule],
    controllers:[UsersController],
    providers:[UsersService],
    exports:[UsersService]
})
export class UsersModule{}