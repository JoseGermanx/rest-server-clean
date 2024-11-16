


import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";
import { ResetTokenDto } from "../../dtos/auth/reset-token.dtos";

interface RedeemTokenUseCase {
    execute(resetTokenDto: ResetTokenDto): Promise<void>;

}

export class RedeemToken implements RedeemTokenUseCase {
    
        constructor(private readonly authRepository: AuthRepository) { }
    
        async execute(resetTokenDto: ResetTokenDto): Promise<void> {
    
            try {
                await this.authRepository.redemptionToken(resetTokenDto)
            } catch (error) {
                throw new CustomError(500, "Internal server error");
    
            }

        }
    }