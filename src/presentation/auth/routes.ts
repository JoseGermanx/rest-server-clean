import { Router } from "express";


export class AuthRoutes {

    static get routes(): Router {
        const router = Router();

        router.post('/login', (req, res) => {
            res.send('login');
        });
        router.post('/register', (req, res) => {
            res.send('register');
        });

        return router;
    }
}