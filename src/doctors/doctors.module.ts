import { Module } from "@nestjs/common";
import { DoctorController } from "./doctor.controller";
import { DoctorService } from "./doctor.service";
import { DatabaseModule } from "src/database/database.module";


@Module({
    imports: [DatabaseModule],
    controllers:[DoctorController],
    providers:[DoctorService]
})
export class DoctorModule{

}