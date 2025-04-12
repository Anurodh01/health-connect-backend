import { DataSource, Repository } from "typeorm";
import { Review } from "../entities/review.entity";
import { Injectable } from "@nestjs/common";
import { DoctorEntity } from "../entities/doctor.entity";
import { ReviewDto } from "src/dto/review.dto";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class ReviewRepository extends Repository<Review>{
    constructor(datasource: DataSource){
        super(Review, datasource.createEntityManager());
    }

    createReview(user: UserEntity, doctor: DoctorEntity, reviewDto: ReviewDto){
        const review = this.create(reviewDto);
        review.profile = doctor.profile;
        review.user = user;
        return this.save(review);
    }
}