import { Request, Response } from "express";
import Task from "../model/task.model";
import { pagination } from "../../../helper/pagination.helper";

//[GET] /api/v1/tasks
export const index = async (req: Request, res: Response): Promise<void> => {
  interface Find {
    deleted: boolean,
    status?: string
  }
  const find: Find = {
    deleted: false
  }

  //Bộ lọc
  const status = req.query.status;
  if (status) {
    find.status = status.toString();
  }
  //End bộ lọc

  //Sắp xếp
  let sort = {};
  const sortKey = req.query.sortKey;
  const sortValue = req.query.sortValue;
  if (sortKey && sortValue) {
    sort[sortKey.toString()] = sortValue.toString();
  }
  //End sắp xếp

  //Phân trang
  const countRecords = await Task.countDocuments(find);

  interface ObjectPagination {
    currentPage: number,
    limit: number,
    skip?: number,
    totalPage?: number
  }

  let objectPagination: ObjectPagination = {
    currentPage: 1,
    limit: 2
  }

  objectPagination = pagination(objectPagination, req.query, countRecords);
  //End phân trang

  const tasks = await Task.find(find).sort(sort).limit(objectPagination.limit).skip(objectPagination.skip);
  res.json({
    count: countRecords,
    tasks: tasks
  });
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