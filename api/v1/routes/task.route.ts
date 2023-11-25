import express, { Request, Response, Router } from 'express';
import Task from '../model/task.model';
import * as controller from "../controller/task.controller";

const route: Router = express();

route.get("/", controller.index);

route.get("/detail/:id", controller.detail);

export const taskRouter: Router = route;
