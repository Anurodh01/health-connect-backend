import { IsNotEmpty, IsString } from "class-validator";

export class registerdto {

    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsString()
    email:string

    @IsString()
    phone:string

    @IsNotEmpty()
    @IsString()
    password:string



}