import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class ReviewDto{
    @IsNumber()
    @Min(0)
    @Max(10)
    @IsNotEmpty()
    rating: number;
    @IsString()
    @IsNotEmpty()
    comment: string;
    @IsNumber()
    id: number;
}