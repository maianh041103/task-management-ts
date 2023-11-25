import express, { Express, Request, Response } from "express";

import dotenv from "dotenv";
import * as database from "./config/database"
import Task from "./model/task.model";


const port: number | string = process.env.PORT || 3000;
const app: Express = express();

//Nhúng env
dotenv.config();

//Nhúng database
database.connect();


app.get("/tasks", async (req: Request, res: Response): Promise<void> => {
  const tasks = await Task.find({
    deleted: false
  });
  res.json(tasks);
})

app.get("/tasks/detail/:id", async (req: Request, res: Response): Promise<void> => {
  const id: String = req.params.id;
  const task = await Task.findOne({
    deleted: false,
    _id: id
  })
  console.log(task);
  res.json(task);
});

app.listen(port, (): void => {
  console.log("App listen on " + port);
})

