import { IsDate, IsDateString, IsNotEmpty } from "class-validator"

export class GetDoctorAvailabilityDto{

    @IsNotEmpty()
    @IsDateString()
    startDate : Date

    @IsNotEmpty()
    @IsDateString()
    endDate : Date
}