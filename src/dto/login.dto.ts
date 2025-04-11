import { IsNotEmpty, IsString } from "class-validator";

export class logindto{

    @IsNotEmpty()
    @IsString()
    email:string;

    @IsNotEmpty()
    @IsString()
    password:string;
}