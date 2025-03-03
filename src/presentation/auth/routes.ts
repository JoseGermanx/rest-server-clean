import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";



export class AuthRoutes {

    static get routes(): Router {
        const router = Router();

        const datasource = new AuthDatasourceImpl();
        const authRepository = new AuthRepositoryImpl(datasource);

        const controller = new AuthController(authRepository);

        router.post('/login', controller.loginUser);
        router.post('/register', controller.registerUser);
        router.post('/change-password', [AuthMiddleware.validateJWT], controller.changePassword);
        router.get('/', [AuthMiddleware.validateJWT], controller.getUsers );
        router.post('/lose-password', controller.losePassword);
        router.post('/redemption-token/', controller.redeemToken);
        return router;
    }
}