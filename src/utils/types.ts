import { gender, UserType } from "src/database/entities/enums"
import { Location } from "src/dto/profile.dto"

export type registerUserParams = {

    name:string,
    email:string,
    phone:string,
    password:string
    userType:UserType.User

}

export type registerDoctorParams = {
    name:string,
    email:string,
    phone:string,
    password:string
    userType:UserType.Doctor
}

export type userProfileParams = {
    dateofbirth : Date
    gender : gender
    locality:string
    city:string
    state:string
    country:string
    location:Location
}