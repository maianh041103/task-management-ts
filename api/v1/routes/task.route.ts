import express, { Request, Response, Router } from 'express';
import Task from '../../../model/task.model';

const route: Router = express();

route.get("/", async (req: Request, res: Response): Promise<void> => {
  const tasks = await Task.find({
    deleted: false
  });
  res.json(tasks);
})

route.get("/detail/:id", async (req: Request, res: Response): Promise<void> => {
  const id: String = req.params.id;
  const task = await Task.findOne({
    deleted: false,
    _id: id
  })
  console.log(task);
  res.json(task);
});

export const taskRouter: Router = route;
