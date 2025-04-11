import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";
import { gender } from "src/database/entities/enums";

export class Location{

    @IsNotEmpty()
    @IsNumber()
    latitude: number;

    @IsNotEmpty()
    @IsNumber()
    longitude: number;
}

export class UserProfileDto{

    @IsNotEmpty()
    @IsDate()
    dateofbirth : Date

    @IsNotEmpty()
    @IsEnum(gender)
    gender : gender

    @IsNotEmpty()
    @IsString()
    locality : string

    @IsNotEmpty()
    @IsString()
    city : string

    @IsNotEmpty()
    @IsString()
    state : string

    @IsNotEmpty()
    @IsString()
    country : string

    @IsObject()
    @ValidateNested()
    @Type(()=> Location)
    location : Location


}