

export class ResetTokenDto {
    private constructor(
        public token: string,
        public password: string,
    ) { }

    static create(object: {
        [key: string]: any;
    }): [string?, ResetTokenDto?] {

        const { token, password } = object
        if (!token) return ['token is required']
        if (!password) return ['password is required']
        if (password.length < 6) return ['password must be at least 6 characters']

        return [undefined, new ResetTokenDto(token, password)]
    }
}