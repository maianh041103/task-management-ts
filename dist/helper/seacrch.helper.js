"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
;
const search = (query) => {
    let search = {
        keyword: ""
    };
    if (query.keyword) {
        search.regex = new RegExp(query.keyword, "i");
    }
    return search;
};
exports.search = search;
