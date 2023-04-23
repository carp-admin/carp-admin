import { ApiQuery } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function ApiPaginate() {
  return applyDecorators(
    ApiQuery({
      required: false,
      name: 'current',
      description: '当前页码',
      example: 1,
    }),
    ApiQuery({
      required: false,
      name: 'pageSize',
      description: '每页数量',
      example: 15,
    }),
    ApiQuery({
      required: false,
      name: 'startDate',
      description: '开始时间:YYYY-MM-DD HH:mm:SS',
    }),
    ApiQuery({
      required: false,
      name: 'endDate',
      description: '结束时间:YYYY-MM-DD HH:mm:SS',
    }),
  );
}
