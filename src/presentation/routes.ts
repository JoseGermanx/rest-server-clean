import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { FrontRoutes } from "./public/routes";


export  class AppRoutes {

    static get routes(): Router {
        const router = Router();

      router.use('/api/auth', AuthRoutes.routes );
        return router;
    }

    static get publicRoutes(): Router {
        const router = Router();
        router.use('/website', FrontRoutes.routes);
        return router;
    }

    
}