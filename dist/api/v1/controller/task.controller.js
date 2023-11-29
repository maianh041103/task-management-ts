"use strict";
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
exports.deleteTask = exports.edit = exports.create = exports.changeMulti = exports.changeStatus = exports.detail = exports.index = void 0;
const task_model_1 = __importDefault(require("../model/task.model"));
const pagination_helper_1 = require("../../../helper/pagination.helper");
const seacrch_helper_1 = require("../../../helper/seacrch.helper");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const find = {
            deleted: false
        };
        const status = req.query.status;
        if (status) {
            find.status = status.toString();
        }
        let sort = {};
        const sortKey = req.query.sortKey;
        const sortValue = req.query.sortValue;
        if (sortKey && sortValue) {
            sort[sortKey.toString()] = sortValue.toString();
        }
        const countRecords = yield task_model_1.default.countDocuments(find);
        let objectPagination = {
            currentPage: 1,
            limit: 2
        };
        objectPagination = (0, pagination_helper_1.pagination)(objectPagination, req.query, countRecords);
        if (req.query.keyword) {
            const regex = (0, seacrch_helper_1.search)(req.query).regex;
            find["title"] = regex;
        }
        const tasks = yield task_model_1.default.find(find).sort(sort).limit(objectPagination.limit).skip(objectPagination.skip);
        res.json({
            count: countRecords,
            tasks: tasks
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Dữ liệu không hợp lệ"
        });
    }
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const task = yield task_model_1.default.findOne({
            deleted: false,
            _id: id
        });
        res.json(task);
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Không tìm thấy công việc"
        });
    }
});
exports.detail = detail;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const status = req.body.status;
        const StatusType = ["initial", "doing", "finish", "pending", "notFinish"];
        if (StatusType.includes(status)) {
            yield task_model_1.default.updateOne({
                _id: id,
            }, {
                status: status
            });
            res.json({
                code: 200,
                message: "Cập nhật trạng thái thành công"
            });
        }
        else {
            res.json({
                code: 400,
                message: "Trạng thái cập nhật không hợp lệ"
            });
        }
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Không tìm thấy công việc"
        });
    }
});
exports.changeStatus = changeStatus;
const changeMulti = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = req.body.ids;
        const key = req.body.key;
        const value = req.body.value;
        let keyType;
        (function (keyType) {
            keyType["STATUS"] = "status";
            keyType["DELETE"] = "delete";
        })(keyType || (keyType = {}));
        ;
        switch (key) {
            case keyType.STATUS:
                yield task_model_1.default.updateMany({
                    _id: { $in: ids }
                }, {
                    status: value
                });
                res.json({
                    code: 200,
                    message: "Cập nhật trạng thái công việc thành công"
                });
                break;
            case keyType.DELETE:
                yield task_model_1.default.updateMany({
                    _id: { $in: ids }
                }, {
                    deleted: true,
                    deletedAt: Date.now()
                });
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
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Thay đổi nhiều công việc thất bại"
        });
    }
});
exports.changeMulti = changeMulti;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = new task_model_1.default(req.body);
        yield data.save();
        res.json({
            code: 200,
            message: "Thêm mới công việc thành công",
            task: data
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Thêm mới công việc thất bại"
        });
    }
});
exports.create = create;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield task_model_1.default.updateOne({
            _id: id
        }, req.body);
        res.json({
            code: 200,
            message: "Chỉnh sửa công việc thành công"
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Chỉnh sửa công việc thất bại"
        });
    }
});
exports.edit = edit;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield task_model_1.default.updateOne({
            _id: id
        }, {
            deleted: true,
            deletedAt: Date.now()
        });
        res.json({
            code: 200,
            message: "Xóa công việc thành công"
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Xóa công việc thất bại"
        });
    }
});
exports.deleteTask = deleteTask;
