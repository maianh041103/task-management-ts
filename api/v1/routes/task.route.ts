import express, { Request, Response, Router } from 'express';
import * as controller from "../controller/task.controller";

const route: Router = express();

route.get("/", controller.index);

route.get("/detail/:id", controller.detail);

route.patch("/change-status/:id", controller.changeStatus);

export const taskRouter: Router = route;
