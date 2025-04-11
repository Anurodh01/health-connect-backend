import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DoctorRepository } from "src/database/repositories/doctor.repository";
import { ReviewRepository } from "src/database/repositories/review.repository";
import { UserRepository } from "src/database/repositories/user.repository";
import { DoctorService } from "src/doctors/doctor.service";
import { ReviewDto } from "src/dto/review.dto";
import { registerUserParams } from "src/utils/types";

@Injectable()
export class UsersService{

    constructor(private userRepository: UserRepository, private doctorService: DoctorService, private reviewRepository: ReviewRepository) { }

    async registerUser(user : registerUserParams){

        try {

            const savedUser = await this.userRepository.createUser(user);

            return {
                id : savedUser.id,
                name : savedUser.name,
                email : savedUser.email,
                phone : savedUser.phone,
                userType : savedUser.userType
            }


        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
    async createReview(docterId: number, reviewDto: ReviewDto) {
        const user = await this.userRepository.findOneBy({ id: reviewDto.id });
        const doctor = await this.doctorService.getDoctorDetail(docterId);
        const review = await this.reviewRepository.createReview(user, doctor, reviewDto);
        return review;
    }
    
}