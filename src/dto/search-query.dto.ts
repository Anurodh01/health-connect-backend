import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { speciality } from "src/database/entities/enums";

export class SearchQueryParamDto{
    @IsEnum(speciality)
    speciality: speciality;
    @IsOptional()
    @IsString()
    area?: string;
    @IsString()
    @IsOptional()
    pincode?: string;
    @IsString()
    @IsOptional()
    city?:string;
    @IsString()
    @IsOptional()
    state?: string;
    @IsString()
    @IsOptional()
    country?:string;
    @IsNumber()
    @IsOptional()
    page?: number;
    @IsNumber()
    @IsOptional()
    limit: number;
}