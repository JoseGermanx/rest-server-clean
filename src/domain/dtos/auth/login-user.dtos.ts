import { Validators } from "../../../config";


export class LoginUserDto {


    private constructor(
        public email: string,
        public password: string,
    ) { }

    static create(object: {
        [key: string]: any;
    }): [string?, LoginUserDto?] {

        const { email, password } = object
        if (!email) return ['email is required']
        if (!Validators.email.test(email)) return ['email is invalid']
        if (!password) return ['password is required']

        return [undefined, new LoginUserDto(email, password)]
    }
}