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
        router.post('/reset-password', (req, res) => {
         // apuntar al endpoint de auth para hacer redeem token
         const { email } = req.body;
         const { token } = req.query;

         res.redirect('/api/auth/redemption-token');


         
        });

        return router;
    }
}