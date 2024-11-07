
// use case for registering a user

import { JwtAdapter } from "../../../config";
import { RegisterUserDto } from "../../dtos/auth/register-user.dtos";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

interface UserToken {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    }
}

type SignToken = ( payload: Object, duration?: string ) => Promise<string|null>;

interface RegisterUserUseCase {

    execute( registerUserDto: RegisterUserDto ): Promise<UserToken>;

}

export class RegisterUser implements RegisterUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken,

    ) {}

    async execute( registerUserDto: RegisterUserDto ): Promise<UserToken> {

        // crear usuario en la base de datos
        const user = await this.authRepository.register(registerUserDto)

        // token
        const token = await this.signToken({ id: user.id }, "2h");
        if (!token) throw new CustomError(500, "Internal server error");


        return {
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }

    }

}