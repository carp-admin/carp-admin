export const success = (
  result = {},
  message = 'ok',
  type = 'success',
  code = 0,
) => {
  return {
    code,
    message,
    result,
    type,
  };
};
export const error = (
  message = 'ok',
  result = null,
  type = 'error',
  code = -1,
) => {
  return {
    code,
    message,
    result,
    type,
  };
};

export function pagination<T>(
  items: T[],
  total: number,
  page = 1,
  pageSize = 15,
) {
  return success({
    items,
    total,
    pageSize,
    totalPage: Math.ceil(total / pageSize),
    page,
  });
}
