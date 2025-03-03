import { envs } from "./config"
import { MongoDataBase } from "./data/mongodb"
import { AppRoutes } from "./presentation/routes"
import { Server } from "./presentation/server"


(()=> {
    main()

})()


async function main() {
    await MongoDataBase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })
  
    new Server({
        port : envs.PORT,
        routes: AppRoutes.routes,
        publicRoutes: AppRoutes.publicRoutes

    }).start()
}