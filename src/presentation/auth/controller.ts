import { Request, Response, RequestHandler  } from 'express';
import { AuthRepository, CustomError, RegisterUser, RegisterUserDto, LoginUserDto } from "../../domain";
import { JwtAdapter } from '../../config';
import { UserModel } from '../../data/mongodb';
import { LoginUser } from '../../domain/use-cases/auth/login-user.use-case';


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