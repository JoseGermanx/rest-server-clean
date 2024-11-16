import { LoginUserDto } from "../dtos/auth/login-user.dtos";
import { PassChangeDto } from "../dtos/auth/password-change.dtos";
import { PassLoseDto } from "../dtos/auth/password-lose.dtos";
import { RegisterUserDto } from "../dtos/auth/register-user.dtos";
import { ResetTokenDto } from "../dtos/auth/reset-token.dtos";
import { UserEntity } from "../entities/user.entity";


export abstract class AuthDatasource {

    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>

    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>

    abstract changePassword(passwordChangeDto: PassChangeDto): Promise<void>

    abstract losePassword(passWordLoseDto: PassLoseDto): Promise<void>

    abstract redemptionToken(resetTokenDto: ResetTokenDto): Promise<void>

}