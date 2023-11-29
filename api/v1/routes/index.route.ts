import { Express } from "express";
import { taskRouter } from "./task.route";
import { userRoute } from "./user.route";
import * as authMiddleware from "../middlerware/auth.middlerware";

const routeAdmin = (app: Express): void => {
  const version: string = "/api/v1";
  app.use(version + '/tasks', authMiddleware.auth, taskRouter);
  app.use(version + '/users', userRoute);
}

export default routeAdmin;