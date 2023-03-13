import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "123456",
    database: "love",
    synchronize: true,
    logging: false,
    entities: ["dist/src/model/*.js"]

})