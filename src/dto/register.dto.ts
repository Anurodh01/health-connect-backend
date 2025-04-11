import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class registerdto {

    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string

    @IsString()
    @IsOptional()
    phone?:string

    @IsNotEmpty()
    @IsString()
    password:string



}