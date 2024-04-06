export declare function responsePaginate(collection: any, totalCount: number, page: number, limit: number): {
    status: number;
    message: string;
    records: any;
    meta: {
        total: number;
        totalPages: number;
        totalCurrentPages: any;
        currentPage: number;
    };
};
