import { Request, Response, NextFunction } from "express"
import User from "../model/user.model";

export const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = await User.findOne({
      token: token
    }).select("-password");
    if (!user) {
      res.json({
        code: 400,
        message: "Bạn không có quyền truy cập trang này"
      });
      return;
    }
    req["infoUser"] = user;
    next();
  } else {
    res.json({
      code: 400,
      message: "Bạn không có quyền truy cập trang này"
    });
    return;
  }

}