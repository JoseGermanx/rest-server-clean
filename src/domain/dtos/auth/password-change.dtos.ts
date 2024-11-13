
import { Validators } from "../../../config";

export class PassChangeDto {

    private constructor(
        public email: string,
        public oldPassword: string,
        public newPassword: string,
    ) { }

    static create(object: {
        [key: string]: any;
    }): [string?, PassChangeDto?] {

        const { email, oldPassword, newPassword } = object
        if (!email) return ['email is required']
        if (!Validators.email.test(email)) return ['email is invalid']
        if (!oldPassword) return ['old password is required']
        if (oldPassword.length < 6) return ['old password must be at least 6 characters']
        if (!newPassword) return ['new password is required']
        if (newPassword.length < 6) return ['new password must be at least 6 characters']

        return [undefined, new PassChangeDto(email, oldPassword, newPassword)]
    }

}