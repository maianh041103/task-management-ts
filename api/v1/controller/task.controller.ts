import { Request, Response } from "express";
import Task from "../model/task.model";
import { pagination } from "../../../helper/pagination.helper";
import { search } from "../../../helper/seacrch.helper";

//[GET] /api/v1/tasks
export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    interface Find {
      deleted: boolean,
      status?: string,
      title?: RegExp
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

    //Tìm kiếm
    if (req.query.keyword) {
      const regex = search(req.query).regex;
      find["title"] = regex;
    }
    //End tìm kiếm

    const tasks = await Task.find(find).sort(sort).limit(objectPagination.limit).skip(objectPagination.skip);
    res.json({
      count: countRecords,
      tasks: tasks
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Dữ liệu không hợp lệ"
    })
  }
}

//[GET] /api/v1/tasks/detail/:id
export const detail = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: String = req.params.id;
    const task = await Task.findOne({
      deleted: false,
      _id: id
    })
    res.json(task);
  } catch (error) {
    res.json({
      code: 400,
      message: "Không tìm thấy công việc"
    })
  }
}

//[PATCH] /api/v1/tasks/change-status/:id
export const changeStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const status: string = req.body.status;
    const StatusType: string[] = ["initial", "doing", "finish", "pending", "notFinish"];
    if (StatusType.includes(status)) {
      await Task.updateOne({
        _id: id,
      }, {
        status: status
      })

      res.json({
        code: 200,
        message: "Cập nhật trạng thái thành công"
      })
    }
    else {
      res.json({
        code: 400,
        message: "Trạng thái cập nhật không hợp lệ"
      })
    }

  } catch (error) {
    res.json({
      code: 400,
      message: "Không tìm thấy công việc"
    })
  }

}

//[PATCH] /api/v1/tasks/change-multi
export const changeMulti = async (req: Request, res: Response): Promise<void> => {
  try {
    const ids: string[] = req.body.ids;
    const key: string = req.body.key;
    const value: string = req.body.value;

    enum keyType {
      STATUS = "status",
      DELETE = "delete"
    };

    switch (key) {
      case keyType.STATUS:
        await Task.updateMany({
          _id: { $in: ids }
        }, {
          status: value
        });
        res.json({
          code: 200,
          message: "Cập nhật trạng thái công việc thành công"
        })
        break;
      case keyType.DELETE:
        await Task.updateMany({
          _id: { $in: ids }
        }, {
          deleted: true,
          deletedAt: Date.now()
        })
        res.json({
          code: 200,
          message: "Xóa nhiều công việc thành công"
        });
        break;
      default:
        res.json({
          code: 400,
          message: "Không tìm thấy tiêu chí cập nhật"
        });
        break;
    }

  } catch (error) {
    res.json({
      code: 400,
      message: "Thay đổi nhiều công việc thất bại"
    });
  }

}

//[POST] /api/v1/tasks/create
export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = new Task(req.body);
    await data.save();
    res.json({
      code: 200,
      message: "Thêm mới công việc thành công",
      task: data
    })
  } catch (error) {
    res.json({
      code: 400,
      message: "Thêm mới công việc thất bại"
    })
  }
}

//[PATCH] /api/v1/tasks/edit/:id
export const edit = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    await Task.updateOne({
      _id: id
    }, req.body);
    res.json({
      code: 200,
      message: "Chỉnh sửa công việc thành công"
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Chỉnh sửa công việc thất bại"
    })
  }
}

//[DELETE] /api/v1/tasks/delete/:id
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    await Task.updateOne({
      _id: id
    }, {
      deleted: true,
      deletedAt: Date.now()
    });
    res.json({
      code: 200,
      message: "Xóa công việc thành công"
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Xóa công việc thất bại"
    });
  }

}