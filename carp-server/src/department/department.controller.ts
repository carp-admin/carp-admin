import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import {
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ApiArrayResponse } from '../decorator/api.array.response';
import { Department } from './entities/department.entity';
import { error, success } from '../utils/response';
import { ApiMapResponse } from '../decorator/api.map.response';

@ApiTags('department')
@ApiExtraModels(Department)
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @ApiOperation({
    summary: '创建部门',
    operationId: 'createDepartment',
  })
  @ApiMapResponse()
  @Post()
  async create(@Body() createDepartmentDto: CreateDepartmentDto) {
    const parent = await this.departmentService.findOne(
      createDepartmentDto.parentId,
    );
    if (!parent) {
      return error('父级分类不存在');
    }
    createDepartmentDto.parent = parent;
    await this.departmentService.save(createDepartmentDto);
    return success();
  }

  @ApiOperation({
    summary: '获得部门树状结构',
    operationId: 'getDepartmentTree',
  })
  @ApiArrayResponse(Department)
  @Get('departmentTree')
  async findTree() {
    return success(await this.departmentService.findTree());
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(id);
  }

  @ApiOperation({
    summary: '更新部门',
    operationId: 'updateDepartment',
  })
  @ApiMapResponse()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    const department = await this.departmentService.findOne(id);
    if (!department) {
      return error('部门不存在');
    }
    const parent = await this.departmentService.findOne(
      updateDepartmentDto.parentId,
    );
    if (!parent) {
      return error('父级分类不存在');
    }
    updateDepartmentDto.parent = parent;
    updateDepartmentDto.id = id;
    return this.departmentService.save(updateDepartmentDto);
  }

  @ApiOperation({
    summary: '删除部门',
    operationId: 'deleteDepartment',
  })
  @ApiParam({
    name: 'id',
    description: '部门id',
  })
  @ApiMapResponse()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const department = await this.departmentService.findOne(id);
    if (!department) {
      return error('部门不存在');
    }
    const { affected } = await this.departmentService.remove(id);
    if (affected) {
      return success();
    } else {
      return error();
    }
  }
}
