import express from "express";
import { connect as MongooseConnect } from "mongoose";
import AppInterface from "./Interfaces/App.Interface";
import ControllerInterface from "./Interfaces/Controller.Interface";
import cors from "cors";

class App {
    public app: express.Application;
    public port: number;
    private dbReconnectRetries: number = 0;
    private maxDbConnectRetries: number = 10;
    public constructor({ controllers, port }: AppInterface) {
        this.app = express();
        this.port = port || parseInt(process.env.PORT);
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.connectToTheDatabase();
    }

    private connectToTheDatabase(): void {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH, MONGO_DB_NAME, LOCAL_DB } = process.env;
        const connectionString =
            LOCAL_DB.toLowerCase() === "true"
                ? `mongodb://localhost:27017/${MONGO_DB_NAME}`
                : `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}${MONGO_DB_NAME}?retryWrites=true`;

        MongooseConnect(connectionString, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })
            .then((): void => {
                console.log("Connected to DB Successfully...");
            })
            .catch((reason): void => {
                console.log(reason);
                if (this.dbReconnectRetries < this.maxDbConnectRetries) {
                    console.log(
                        "DB Connection unsuccessful.... retrying connection, retry number: ",
                        this.dbReconnectRetries + 1,
                    );
                    this.connectToTheDatabase();
                    this.dbReconnectRetries += 1;
                } else {
                    console.log("Max retries done.... Process exiting");
                    process.exit(1);
                }
            });
    }

    private initializeMiddlewares(): void {
        //all the middlewares
        this.app.use(cors());
        this.app.use(express.json());
    }

    private initializeControllers(controllers: ControllerInterface[]): void {
        controllers.forEach((controller: ControllerInterface): void => {
            this.app.use(controller.path, controller.router);
        });
    }

    public listen(): void {
        this.app.listen(this.port, (): void => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;
