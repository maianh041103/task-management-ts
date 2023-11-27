interface ObjectPagination {
  currentPage: number,
  limit: number,
  skip?: number,
  totalPage?: number
}

export const pagination = (objectPagination: ObjectPagination, query, countRecords: number): ObjectPagination => {
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
}