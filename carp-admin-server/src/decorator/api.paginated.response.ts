import { Type, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';
export class PaginatedDto {
  @ApiProperty({
    description: '提示',
  })
  message: string;
  @ApiProperty({
    description: '类型',
  })
  type: string;
  @ApiProperty({
    description: '状态码',
  })
  code: number;
}

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        title: `PaginatedResponseOf${model.name}`,
        allOf: [
          { $ref: getSchemaPath(PaginatedDto) },
          {
            allOf: [
              {
                properties: {
                  result: {
                    type: 'array',
                    description: '数据',
                    items: {
                      allOf: [{ $ref: getSchemaPath(model) }],
                      properties: {
                        createdAt: {
                          type: 'string',
                          description: '创建时间',
                        },
                        updatedAt: {
                          type: 'string',
                          description: '修改时间',
                        },
                        deletedAt: {
                          type: 'string',
                          description: '修改时间',
                        },
                      },
                    },
                  },
                  total: {
                    type: 'number',
                    description: '总数',
                  },
                  totalPage: {
                    type: 'number',
                    description: '总页码',
                  },
                  current: {
                    type: 'number',
                    description: '当前页码',
                  },
                  pageSize: {
                    type: 'number',
                    description: '每页数量',
                  },
                },
              },
            ],
          },
        ],
      },
    }),
  );
};
