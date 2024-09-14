import { UserProfile } from "./user-profile";

export class UserResponse {
    userDTO: UserProfile
    jwt: string;
    constructor() {
        this.userDTO = new UserProfile()
        this.jwt = ''
    }
}