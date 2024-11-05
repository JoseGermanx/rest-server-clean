import { RegisterUserDto } from "../dtos/auth/register-user.dtos";
import { UserEntity } from "../entities/user.entity";


export abstract class AuthRepository {

    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>

}