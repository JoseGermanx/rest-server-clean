
// crear dto para gestionar la perdida de contraseña

import { Validators } from "../../../config";

export class PassLoseDto {

    private constructor(
        public email: string,
    ) { }

    static create(object: {
        [key: string]: any;
    }): [string?, PassLoseDto?] {

        const { email } = object
        if (!email) return ['email is required']
        if (!Validators.email.test(email)) return ['email is invalid']

        return [undefined, new PassLoseDto(email)]
    }

}