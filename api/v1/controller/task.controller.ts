import { Request, Response } from "express";
import Task from "../model/task.model";

//[GET] /api/v1/tasks
export const index = async (req: Request, res: Response): Promise<void> => {
  const tasks = await Task.find({
    deleted: false
  });
  res.json(tasks);
}

//[GET] /api/v1/tasks/detail/:id
export const detail = async (req: Request, res: Response): Promise<void> => {
  const id: String = req.params.id;
  const task = await Task.findOne({
    deleted: false,
    _id: id
  })
  res.json(task);
}