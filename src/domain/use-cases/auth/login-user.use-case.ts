// use case for login a user

import { LoginUserDto } from "../../dtos/auth/login-user.dtos";
import { UserEntity } from "../../entities/user.entity";
import { AuthRepository } from "../../repositories/auth.repository";
import { CustomError } from "../../errors/custom.error";

interface UserToken {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    }
}

type SignToken = ( payload: Object, duration?: string ) => Promise<string|null>;

interface LoginUserUseCase {

    execute( loginUserDto: LoginUserDto ): Promise<UserToken>;

}

export class LoginUser implements LoginUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken,
    ) {}

    async execute( loginUserDto: LoginUserDto ): Promise<UserToken> {

        // buscar usuario en la base de datos
        const user = await this.authRepository.login(loginUserDto)
        if (!user) throw new CustomError(404, "User not found");

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

