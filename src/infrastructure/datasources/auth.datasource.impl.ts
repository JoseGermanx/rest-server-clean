import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDto, LoginUserDto, UserEntity } from "../../domain";
import { UserMapper } from "../mappers/user-mapper";


type HashFuntion = (password: string) => string;
type CompareFunction = (password: string, hash: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {

    constructor(
        private readonly hashPassword: HashFuntion = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare
    ) { }



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
                password: this.hashPassword(password)
            });

            await newUser.save();

            return UserMapper.useEntityFromObject(newUser);

        } catch (error) {

            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServer();

        }

    }


    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const { email, password } = loginUserDto;

        try {

            const user = await UserModel.findOne({
                email
            });

            if (!user) {
                throw CustomError.badRequest('User not found');
            }

            const isValidPassword = this.comparePassword(password, user.password!);

            if (!isValidPassword) {
                throw CustomError.badRequest('Invalid password');
            }

            return UserMapper.useEntityFromObject(user);


            
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServer();
            
        }


    }

}