import { Router } from "express";


export class FrontRoutes {
    static get routes(): Router {
        const router = Router();
        router.get('/', (req, res) => {
            res.send('Home Page')
        });
        router.get('/login', (req, res) => {
            res.send('Login Page')
        });
        return router;
    }
}