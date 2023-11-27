interface Search {
  keyword: string,
  regex?: RegExp
};

export const search = (query): Search => {
  let search: Search = {
    keyword: ""
  }
  if (query.keyword) {
    search.regex = new RegExp(query.keyword, "i");
  }
  return search;
}