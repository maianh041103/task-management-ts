import express, { Express } from "express";
import bodyParser from "body-parser";

import dotenv from "dotenv";
import * as database from "./config/database"

import routeAdmin from "./api/v1/routes/index.route";


const port: number | string = process.env.PORT || 3000;
const app: Express = express();

//Nhúng bodyParse application/json
app.use(bodyParser.json())

//Nhúng env
dotenv.config();

//Nhúng database
database.connect();

//Nhúng route
routeAdmin(app);

app.listen(port, (): void => {
  console.log("App listen on " + port);
})

