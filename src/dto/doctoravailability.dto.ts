import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { weekdays } from "src/database/entities/enums";


export class doctorAvailabilityDto {

    @IsEnum(weekdays)
    @IsNotEmpty()
    dayOfWeek : weekdays

    @IsString()
    @IsNotEmpty()
    startTime : string;

    @IsString()
    @IsNotEmpty()
    endTime : string;

    @IsNumber()
    @IsNotEmpty()
    appointmentDurationInMinutes : number
}