export function responsePaginate(collection: any, totalCount: number, page: number, limit: number) {
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
