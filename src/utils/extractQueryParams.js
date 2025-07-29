//'[search=jose ],[page=2]'
export function extractQueryParams(query) {
  return query
    .substr(1)
    .split("&")
    .reduce((queryParam, param) => {
      const [key, value] = param.split("=");

      queryParam[key] = value;

      return queryParam;
    }, {});
}
