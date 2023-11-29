"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detail = exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
const md5_1 = __importDefault(require("md5"));
const generate = __importStar(require("../../../helper/generate.hepler"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const emailExist = yield user_model_1.default.findOne({
            email: data.email,
            deleted: false
        });
        if (!emailExist) {
            const info = {
                fullName: data.fullName,
                email: data.email,
                password: (0, md5_1.default)(data.password),
                token: generate.generateRandomString(30)
            };
            const newUser = new user_model_1.default(info);
            yield newUser.save();
            res.json({
                code: 200,
                message: "Đăng kí tài khoản thành công",
                token: newUser.token
            });
        }
        else {
            res.json({
                code: 400,
                message: "Địa chỉ email đã tồn tại"
            });
        }
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Thêm mới tài khoản thất bại"
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const emailExist = yield user_model_1.default.findOne({
        email: email
    });
    if (!emailExist) {
        res.json({
            code: 400,
            message: "Email không tồn tại"
        });
        return;
    }
    const user = yield user_model_1.default.findOne({
        email: email,
        password: (0, md5_1.default)(password)
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
    });
});
exports.login = login;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req["infoUser"];
        res.json({
            code: 200,
            user: user
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Không tìm thấy tài khoản muốn tìm"
        });
    }
});
exports.detail = detail;
