

// TODO: Implement passwordLost use-case

import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";
import { PassLoseDto } from "../../dtos/auth/password-lose.dtos";

interface PasswordLostUseCase {
    execute(passWordLoseDto: PassLoseDto): Promise<void>;
}

export class PasswordLost implements PasswordLostUseCase {

    constructor(private readonly authRepository: AuthRepository) { }

    async execute(passWordLoseDto: PassLoseDto): Promise<void> {

        try {
            // crear redentiom token en la base de datos
            await this.authRepository.losePassword(passWordLoseDto)
        } catch (error) {
            throw new CustomError(500, "Internal server error");

        }
    }
}