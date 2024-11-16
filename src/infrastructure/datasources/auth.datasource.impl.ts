import { BcryptAdapter, JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { TokenResetModel } from "../../data/mongodb/models/token-reset.model";
import { AuthDatasource, CustomError, RegisterUserDto, LoginUserDto, UserEntity, PassLoseDto } from "../../domain";
import { PassChangeDto } from "../../domain/dtos/auth/password-change.dtos";
import { ResetTokenDto } from "../../domain/dtos/auth/reset-token.dtos";
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

    async changePassword(passwordChangeDto: PassChangeDto): Promise<void> {
        const { email, oldPassword, newPassword } = passwordChangeDto;

        try {

            const user = await UserModel.findOne({  email });

            if (!user) {
                throw CustomError.badRequest('User not found');
            }

            const isValidPassword = this.comparePassword(oldPassword, user.password!);

            if (!isValidPassword) {
                throw CustomError.badRequest('Invalid password');
            }

            user.password = this.hashPassword(newPassword);
            await user.save();

        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServer();
        }
    }

    async losePassword(passWordLoseDto: PassLoseDto): Promise<void> {
        const { email } = passWordLoseDto;

        try {

            const user = await UserModel.findOne({ email });

            if (!user) {
                throw CustomError.badRequest('User not found');
            }

            const idUser = user._id;

            const token = await JwtAdapter.generateToken({idUser}, '1h');

            const newResetToken = await TokenResetModel.create({
                token,
                idUser: user.id
            });

            await newResetToken.save();

            console.log("trasacción en model token ok : ",newResetToken);
            
            const url = `http://localhost:3000/reset-password?token=${token}`;

            // sent email with new password

        } catch (error) {

            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServer();
        }

    }

    async redemptionToken(resetTokenDto: ResetTokenDto): Promise<void> {
        const { token, password } = resetTokenDto;

        const validateToken: {idUser: string} | null = await JwtAdapter.validateToken(token);

        if (!validateToken) {
            throw CustomError.badRequest('Invalid token');
        }

        const userId = validateToken.idUser;

        try {

            const user = await UserModel.findById(userId)
            
            if (!user) {
                throw CustomError.badRequest('User not found');
            }

            user.password = this.hashPassword(password);
            await user.save();

        } catch (error) {
                
                if (error instanceof CustomError) {
                    console.log("error en redemptionToken CUstom: ", error);
                    throw error;
                }

                console.log("error en redemptionToken: ", error);
    
                throw CustomError.internalServer();
        }   

    }

}