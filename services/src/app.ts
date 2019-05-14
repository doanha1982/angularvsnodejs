import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { Routes } from "./routes/bookRoutes";

class App {
    //declare variable
    public app: express.Application;
    private routesEngine: Routes = new Routes();
    private dbName: String = "bookstore";
    private server: String = "localhost";
    //declare constructor
    constructor() {
        this.app = express();
        this.routesEngine.routes(this.app);
        this.config();
        this.setupDatabase();
    }

    private config(): void {
        //support json data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private setupDatabase(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(`mongodb://${this.server}/${this.dbName}`, { useNewUrlParser: true });
    }
}
export default new App().app;