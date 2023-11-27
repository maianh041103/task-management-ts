import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";

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

//Nhúng cors
// var corsOptions = {
//   origin: 'http://example.com',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
// app.use(cors(corsOptions));

app.use(cors());

app.listen(port, (): void => {
  console.log("App listen on " + port);
})

