import { Express } from "express";
import { taskRouter } from "./task.route";

const routeAdmin = (app: Express): void => {
  const version: string = "/api/v1";
  app.use(version + '/tasks', taskRouter);
}

export default routeAdmin;