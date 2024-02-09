export function responsePaginate(data: any, totalCount: number, page: number, limit: number) {
  const totalPages = Math.ceil(totalCount / limit);
  return {
    status: 200,
    message: 'Success',
    result: data,
    meta: {
      total: totalCount,
      totalPages: totalPages,
      totalCurrentPages: data.length,
      currentPage: page,
    },
  };
}
