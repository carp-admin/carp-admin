import { ApiProperty } from '@nestjs/swagger';
import { Department } from '../entities/department.entity';
import { Allow, IsNotEmpty } from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty()
  @ApiProperty({ description: '部门名称' })
  name: string;

  @Allow()
  @ApiProperty({ description: '部门状态：true可用；false禁用', example: true })
  status: boolean;

  @Allow()
  @ApiProperty({ description: '备注信息' })
  remark: string;

  @Allow()
  @ApiProperty({ description: '父级分类id' })
  parentId: string;

  parent: Department;
}