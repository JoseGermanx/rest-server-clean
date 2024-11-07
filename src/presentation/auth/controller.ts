import { Request, Response, RequestHandler  } from 'express';
import { AuthRepository, RegisterUserDto } from "../../domain";
import { JwtAdapter } from '../../config';
import { UserModel } from '../../data/mongodb';


export class AuthController {
    constructor(private readonly authRepository: AuthRepository) {
        
    }
    
    registerUser: RequestHandler  = (req: Request, res: Response): void => {

        const [error, registerUserDto] = RegisterUserDto.create(req.body);

        if (error){
            res.status(400).json({ error });
            return;
        };

        this.authRepository.register(registerUserDto!)
            .then(async (user) => {
                res.status(201).json({
                    
                    user,
                    token: await JwtAdapter.generateToken({ id: user.id }),
                
                });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    loginUser:RequestHandler  = (req: Request, res: Response) => {
        res.json({ message: 'login' });
    }

    getUsers: RequestHandler = async (req: Request, res: Response )  => {
    
       await  UserModel.find()
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