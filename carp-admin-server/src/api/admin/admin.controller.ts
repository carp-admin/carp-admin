import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import {
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Admin } from './entities/admin.entity';
import { ApiPaginatedResponse } from '../../decorator/api.paginated.response';
import { ApiPaginate } from '../../decorator/api.paginate.descorator';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import configuration from '../../config/configuration';
import { JwtService } from '@nestjs/jwt';
import { error, pagination, success } from '../../utils/response';

@ApiTags('admin')
@ApiExtraModels(Admin)
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @ApiOperation({
    summary: '登录',
    operationId: 'login',
  })
  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    const token = this.jwtService.sign(
      {
        id: '1',
        username: loginDto.username,
      },
      {
        secret: configuration().jwt.secret,
        expiresIn: configuration().jwt.expiresIn,
      },
    );
    const result = {
      roles: [
        {
          roleName: 'Super Admin',
          value: 'super',
        },
      ],
      userId: '1',
      username: 'carp-admin',
      token,
      realName: '最爱白菜吖',
      desc: 'manager',
    };
    return success(result);
  }

  @ApiOperation({
    summary: '退出',
    operationId: 'logout',
  })
  @Post('/logout')
  logout() {
    return { code: 0, message: 'Token has been destroyed', type: 'success' };
  }

  @ApiOperation({
    summary: '获得当前登录用户信息',
    operationId: 'login',
  })
  @Get('/getUserInfo')
  getUserInfo() {
    const result = {
      userId: '1',
      username: 'carp-admin',
      realName: 'Carp Admin',
      avatar: '',
      desc: 'manager',
      password: '123456',
      token: 'fakeToken1',
      homePath: '/dashboard/analysis',
      roles: [
        {
          roleName: 'Super Admin',
          value: 'super',
        },
      ],
    };
    return success(result);
  }

  @ApiOperation({
    summary: '管理员列表',
    operationId: 'getAdminList',
  })
  @ApiPaginatedResponse(Admin)
  @ApiPaginate()
  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('pageSize', new DefaultValuePipe(16)) pageSize: number,
  ) {
    const [list, total] = await this.adminService.findAll(page, pageSize);
    return pagination(list, total, page, pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({
    summary: '删除管理员',
    operationId: 'deleteAdmin',
  })
  @ApiParam({
    name: 'id',
    description: '管理员id',
  })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    if (id === 1) {
      return error('超级管理员不可以被删除');
    }
    const admin = await this.adminService.findOne(id);
    if (admin === null) {
      return error('管理员已经删除');
    }
    const { affected } = await this.adminService.remove(+id);
    if (affected > 0) {
      return success();
    }
    return error();
  }
}
