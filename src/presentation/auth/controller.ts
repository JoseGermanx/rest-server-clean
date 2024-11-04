import { Request, Response } from "express";


export class AuthController {
    constructor() {
    }
    
    registerUser = (req: Request, res: Response) => {
        res.json({ message: 'register' });
    }

    loginUser = (req: Request, res: Response) => {
        res.json({ message: 'login' });
    }


}