import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";


export class AuthDatasourceImpl extends AuthDatasource {
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const { name, email, password } = registerUserDto;

        try {

            const user = await UserModel.findOne({
                email
            });

            if (user) {
                throw CustomError.badRequest('User already exists');
            }

            const newUser = await UserModel.create({
                name,
                email,
                password: BcryptAdapter.hash(password),
            });

            await newUser.save();

            return new UserEntity(
                newUser.id,
                name,
                email,
                newUser.password || ''
            )

        } catch (error) {

            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServer();

        }

    }


}