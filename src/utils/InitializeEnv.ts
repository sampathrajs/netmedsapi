import validateEnv from "./validateEnv";

if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-explicit-any
    const dotenv: any = require("dotenv");
    dotenv.config();
}
validateEnv();
