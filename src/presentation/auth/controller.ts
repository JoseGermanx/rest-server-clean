import { Request, Response, RequestHandler  } from 'express';
import { AuthRepository, CustomError, RegisterUser, RegisterUserDto, LoginUserDto, PassLoseDto } from "../../domain";
import { JwtAdapter } from '../../config';
import { UserModel } from '../../data/mongodb';
import { LoginUser } from '../../domain/use-cases/auth/login-user.use-case';
import { PassChangeDto } from '../../domain/dtos/auth/password-change.dtos';
import { PasswordChange } from '../../domain/use-cases/auth/password-change.use-case';
import { PasswordLost } from '../../domain/use-cases/auth/password-lost.use-case';
import { ResetTokenDto } from '../../domain/dtos/auth/reset-token.dtos';
import { RedeemToken } from '../../domain/use-cases/auth/redeem-token-use-case';


export class AuthController {
    constructor(private readonly authRepository: AuthRepository) {
        
    }

    private handleError(error: Error, res: Response): void {
        if (error instanceof CustomError) {

            res.status(error.statusCode).json({ error: error.message });
            return;
        }
        
        res.status(500).json({ error: error.message });
    }
    
    registerUser: RequestHandler  = (req: Request, res: Response): void => {

        const [error, registerUserDto] = RegisterUserDto.create(req.body);

        if (error){
            res.status(400).json({ error });
            return;
        };

       new RegisterUser(this.authRepository)
       .execute(registerUserDto!)
       .then(data => res.json(data))
       .catch(error => this.handleError(error, res));

    }

    loginUser:RequestHandler  = (req: Request, res: Response): void => {

        const [error, loginUserDto] = LoginUserDto.create(req.body);

        if (error){
            res.status(400).json({ error });
            return;
        };

        new LoginUser(this.authRepository, JwtAdapter.generateToken)
        .execute(loginUserDto!)
        .then(data => res.json(data))
        .catch(error => this.handleError(error, res));
    }

    changePassword: RequestHandler = (req: Request, res: Response): void => {
        const [error, passwordChangeDto] = PassChangeDto.create(req.body);

        if (error){
            res.status(400).json({ error });
            return;
        };

        new PasswordChange(this.authRepository)
        .execute(passwordChangeDto!)
        .then(() => res.json({ message: 'Password changed' }))
        .catch(error => this.handleError(error, res));
    }

    losePassword: RequestHandler = (req: Request, res: Response): void => {
        const [ error, passWordLoseDto ] = PassLoseDto.create(req.body);

        if (error){
            res.status(400).json({ error });
            return;
        };

        new PasswordLost(this.authRepository)
        .execute(passWordLoseDto!)
        .then(() => res.json({ message: 'Redemption Token Created' }))
        .catch(error => this.handleError(error, res));

    }

    redeemToken: RequestHandler = (req: Request, res: Response): void => {

        const data = {
            token: req.query.token,
            password: req.body.password
        }
        const [ error, resetTokenDto ] = ResetTokenDto.create(data);

        if (error){
            res.status(400).json({ error });
            return;
        };

        new RedeemToken(this.authRepository)
        .execute(resetTokenDto!)
        .then(() => res.json({ message: 'Password changed' }))
        .catch(error => {
            this.handleError(error, res)
        });
    }

    getUsers: RequestHandler = async (req: Request, res: Response )  => {
    
       await UserModel.find()
          .then( users => {
            res.json({
              users,
            //   user: req.body.user
            token: req.body.payload
            }) 
          })
          .catch(()=> res.status(500).json({ error: 'Internal server error' }))
      }


}