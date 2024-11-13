

// TODO: Por hacer caso de uso para resetear la contraseña de un usuario

// use case for change a user password


import { PassChangeDto } from "../../dtos/auth/password-change.dtos";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

interface PasswordChangeUseCase {

    execute(passwordChangeDto: PassChangeDto): Promise<void>;
}

export class PasswordChange implements PasswordChangeUseCase {

    constructor(private readonly authRepository: AuthRepository) { }

    async execute(passwordChangeDto: PassChangeDto): Promise<void> {

        try {
            // cambiar contraseña en la base de datos
            await this.authRepository.changePassword(passwordChangeDto)
        } catch (error) {
            throw new CustomError(500, "Internal server error");

        }
    }
}


