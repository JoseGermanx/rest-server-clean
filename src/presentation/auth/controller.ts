import { Request, Response, RequestHandler  } from 'express';
import { AuthRepository, RegisterUserDto } from "../../domain";


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
            .then((user) => {
                res.status(201).json(user);
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    loginUser:RequestHandler  = (req: Request, res: Response) => {
        res.json({ message: 'login' });
    }


}