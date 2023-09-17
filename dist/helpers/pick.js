"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pick = void 0;
const pick = (query, searchArr) => {
    const modifiedQuery = {};
    for (const term of searchArr) {
        if (query.hasOwnProperty(term)) {
            modifiedQuery[term] = query[term];
        }
    }
    return modifiedQuery;
};
exports.pick = pick;
