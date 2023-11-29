import { Request, Response } from "express";
import User from "../model/user.model";
import md5 from "md5";
import * as generate from "../../../helper/generate.hepler";

//[POST] /api/v1/users/register
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;

    const emailExist = await User.findOne({
      email: data.email,
      deleted: false
    });

    if (!emailExist) {
      const info = {
        fullName: data.fullName,
        email: data.email,
        password: md5(data.password),
        token: generate.generateRandomString(30)
      };

      const newUser = new User(info);
      await newUser.save();

      res.json({
        code: 200,
        message: "Đăng kí tài khoản thành công",
        token: newUser.token
      })
    } else {
      res.json({
        code: 400,
        message: "Địa chỉ email đã tồn tại"
      })
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "Thêm mới tài khoản thất bại"
    });
  }
}

//[POST] /api/v1/users/login
export const login = async (req: Request, res: Response): Promise<void> => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  const emailExist = await User.findOne({
    email: email
  });
  if (!emailExist) {
    res.json({
      code: 400,
      message: "Email không tồn tại"
    });
    return;
  }
  const user = await User.findOne({
    email: email,
    password: md5(password)
  });
  if (!user) {
    res.json({
      code: 400,
      message: "Mật khẩu không chính xác"
    });
    return;
  }
  res.json({
    code: 200,
    message: "Đăng nhập thành công"
  })
}

//[GET] /api/v1/users/detail
export const detail = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req["infoUser"];
    res.json({
      code: 200,
      user: user
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Không tìm thấy tài khoản muốn tìm"
    })
  }

}