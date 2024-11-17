
import express, { Router } from 'express'
import cors from 'cors'

interface Options {
    port?: number;
    routes: Router;
    publicRoutes: Router;
}


export class Server {
    public readonly app = express()
    public readonly cors = cors()
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
        this.app.use(this.cors)
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))


        this.app.use(this.routes)
        this.app.use(this.publicRoutes)
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`)
        })
    }

}