
import express, { Router } from 'express'

interface Options {
    port?: number;
    routes: Router;
    publicRoutes: Router;
}


export class Server {
    public readonly app = express()
    private readonly port: number;
    private readonly routes: Router;
    private readonly publicRoutes: Router;

    constructor(options: Options) {

        const { port = 8080 , routes, publicRoutes} = options;
        this.port = port
        this.routes = routes
        this.publicRoutes = publicRoutes

    }

    async start() {

        // middlewares
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))


        this.app.use(this.routes)
        this.app.use(this.publicRoutes)
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`)
        })
    }

}