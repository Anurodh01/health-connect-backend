import { UserType } from "src/database/entities/enums"

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