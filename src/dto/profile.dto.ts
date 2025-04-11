import { Type } from "class-transformer";
import { IsArray, IsEnum, IsIn, IsNotEmpty, IsNumber, IsObject, isString, IsString, ValidateNested } from "class-validator";
import { degree, speciality, VerificationStatus } from "src/database/entities/enums";

export class Location {
    @IsNotEmpty()
    @IsNumber()
    latitude: number;

    @IsNotEmpty()
    @IsNumber()
    longitude: number;
}

export class ProfileDto{
    @IsEnum(speciality)
    speciality: speciality;

    @IsEnum(degree)
    degree: degree;

    @IsString()
    @IsNotEmpty()
    area: string

    @IsString()
    @IsNotEmpty()
    city: string

    @IsString()
    @IsNotEmpty()
    state: string

    @IsString()
    @IsNotEmpty()
    country: string

    @IsString()
    @IsNotEmpty()
    pincode: string;

    @IsObject()
    @ValidateNested()
    @Type(()=> Location)
    location: Location;

    @IsArray()
    @IsString({each: true})
    availability: string[];

    // @IsIn([VerificationStatus.AWAITING_VERIFICATION, VerificationStatus.VERIFIED])
    // verified: VerificationStatus;
}