"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = void 0;
const pagination = (objectPagination, query, countRecords) => {
    const page = query.page;
    const limit = query.limit;
    if (page) {
        objectPagination.currentPage = parseInt(page);
    }
    if (limit) {
        objectPagination.limit = parseInt(limit);
    }
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limit;
    objectPagination.totalPage = Math.ceil(countRecords / objectPagination.limit);
    return objectPagination;
};
exports.pagination = pagination;
