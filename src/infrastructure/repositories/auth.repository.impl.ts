import { AuthDatasource, AuthRepository, RegisterUserDto, UserEntity } from "../../domain";


export class AuthRepositoryImpl implements AuthRepository {

    constructor(
        private readonly authDatasource: AuthDatasource,
    ){}


    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
      return this.authDatasource.register(registerUserDto);
    }

    login(): Promise<UserEntity> {
      throw new Error("Method not implemented.");
    }

    getUsers(): Promise<UserEntity[]> {
      throw new Error("Method not implemented.");
    }



    
}