import {
    cleanEnv,
    str,
    port,
    //  num
} from "envalid";

function validateEnv(): void {
    const { LOCAL_DB } = process.env;
    if (LOCAL_DB.toLowerCase() !== "true") {
        cleanEnv(process.env, {
            MONGO_PASSWORD: str(),
            MONGO_PATH: str(),
            MONGO_USER: str(),
        });
    }
    cleanEnv(process.env, {
        MONGO_DB_NAME: str(),
        PORT: port(),
        // TOKEN_SECRET: str(),
        // TOKEN_VALIDITY: str(),
        // REFRESH_TOKEN_SECRET: str(),
        // REFRESH_TOKEN_VALIDITY: str(),
        // HASHING_SALT: num(),
    });
}

export default validateEnv;
