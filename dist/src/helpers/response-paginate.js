"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responsePaginate = void 0;
function responsePaginate(collection, totalCount, page, limit) {
    const totalPages = Math.ceil(totalCount / limit);
    return {
        status: 200,
        message: 'Success',
        records: collection,
        meta: {
            total: totalCount,
            totalPages: totalPages,
            totalCurrentPages: collection.length,
            currentPage: page,
        },
    };
}
exports.responsePaginate = responsePaginate;
//# sourceMappingURL=response-paginate.js.map