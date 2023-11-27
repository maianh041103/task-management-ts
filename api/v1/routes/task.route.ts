import express, { Request, Response, Router } from 'express';
import * as controller from "../controller/task.controller";

const route: Router = express();

route.get("/", controller.index);

route.get("/detail/:id", controller.detail);

route.patch("/change-status/:id", controller.changeStatus);

route.patch("/change-multi", controller.changeMulti);

route.post("/create", controller.create);

route.patch("/edit/:id", controller.edit);

route.delete("/delete/:id", controller.deleteTask);

export const taskRouter: Router = route;
