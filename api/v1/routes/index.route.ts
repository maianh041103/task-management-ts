import { Express } from "express";
import { taskRouter } from "./task.route";
import { userRoute } from "./user.route";

const routeAdmin = (app: Express): void => {
  const version: string = "/api/v1";
  app.use(version + '/tasks', taskRouter);
  app.use(version + '/users', userRoute);
}

export default routeAdmin;