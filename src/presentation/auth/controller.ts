import { Request, Response, RequestHandler  } from "express";
import { RegisterUserDto } from "../../domain";


export class AuthController {
    constructor() {
    }
    
    registerUser: RequestHandler  = (req: Request, res: Response): void => {

        const [error, registerUserDto] = RegisterUserDto.create(req.body);

        if (error){
            res.status(400).json({ error });
            return;
        };

        res.json(registerUserDto);
    }

    loginUser:RequestHandler  = (req: Request, res: Response) => {
        res.json({ message: 'login' });
    }


}