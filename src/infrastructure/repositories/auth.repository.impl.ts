import { AuthDatasource, AuthRepository, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { PassChangeDto } from "../../domain/dtos/auth/password-change.dtos";
import { ResetTokenDto } from "../../domain/dtos/auth/reset-token.dtos";


export class AuthRepositoryImpl implements AuthRepository {

    constructor(
        private readonly authDatasource: AuthDatasource,
    ){}


    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
      return this.authDatasource.register(registerUserDto);
    }

    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
      return this.authDatasource.login(loginUserDto);

    }

    changePassword(passwordChangeDto: PassChangeDto): Promise<void> {
      return this.authDatasource.changePassword(passwordChangeDto);
    }

    losePassword(passWordLoseDto: PassChangeDto): Promise<void> {
      return this.authDatasource.losePassword(passWordLoseDto);
    }

    redemptionToken(resetTokenDto: ResetTokenDto): Promise<void> {
      return this.authDatasource.redemptionToken(resetTokenDto);
    }

    getUsers(): Promise<UserEntity[]> {
      throw new Error("Method not implemented.");
    }



    
}