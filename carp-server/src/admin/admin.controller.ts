import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  Req,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiExtraModels,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { ApiMapResponse } from '../decorator/api.map.response';
import { ApiPaginatedResponse } from '../decorator/api.paginated.response';
import { error, pagination, success } from '../utils/response';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { OutAdminDto } from './dto/out-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import * as bcrypt from 'bcrypt';
import { Public } from '../decorator/public.decorator';
import configuration from '../config/configuration';
import { ApiPaginate } from '../decorator/api.paginate.descorator';

@ApiTags('admin')
@ApiBearerAuth()
@ApiExtraModels(LoginResponseDto, OutAdminDto, Admin)
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  @ApiOperation({
    summary: '登录',
    operationId: 'login',
  })
  @ApiMapResponse(LoginResponseDto)
  @Public()
  @Post('login')
  async login(@Body() loginAdminDto: LoginAdminDto) {
    const admin = await this.adminService.findByUsername(
      loginAdminDto.username,
      true,
    );
    if (!admin) {
      return error('用户名错误');
    }
    const isMatch = await bcrypt.compare(
      loginAdminDto.password,
      admin.password,
    );
    if (!isMatch) {
      return error('密码错误');
    }
    const token = this.jwtService.sign(
      {
        id: admin.id,
        username: admin.username,
      },
      {
        secret: configuration().jwt.secret,
        expiresIn: configuration().jwt.expiresIn,
      },
    );
    return success({
      status: 'ok',
      type: 'account',
      currentAuthority: 'admin',
      token,
    });
  }

  @ApiOperation({
    summary: '当前登录用户',
    operationId: 'currentUser',
  })
  @ApiMapResponse(Admin)
  @Get('currentUser')
  async currentUser(@Req() req) {
    const admin = await this.adminService.findOne(req.user.id);
    return success({
      name: 'Serati Ma',
      avatar:
        'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      email: 'antdesign@alipay.com',
      signature: '海纳百川，有容乃大',
      title: '交互专家',
      group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
      tags: [
        { key: '0', label: '很有想法的' },
        { key: '1', label: '专注设计' },
        { key: '2', label: '辣~' },
        { key: '3', label: '大长腿' },
        { key: '4', label: '川妹子' },
        { key: '5', label: '海纳百川' },
      ],
      notifyCount: 12,
      unreadCount: 11,
      country: 'China',
      access: 'admin',
      geographic: {
        province: { label: '浙江省', key: '330000' },
        city: { label: '杭州市', key: '330100' },
      },
      address: '西湖区工专路 77 号',
      phone: '0752-268888888',
      ...admin,
    });
  }

  @ApiOperation({
    summary: '退出',
    operationId: 'outLogin',
  })
  @Post('outLogin')
  @ApiMapResponse(OutAdminDto)
  outLogin() {
    return { data: {}, success: true };
  }

  @ApiOperation({
    summary: '新增',
    operationId: 'addAdmin',
  })
  @ApiMapResponse()
  @Post()
  async create(@Body() createAdminDto: CreateAdminDto) {
    const admin = await this.adminService.findByUsername(
      createAdminDto.username,
    );
    if (admin) {
      return error('用户已经存在');
    }
    const saltOrRounds = 10;
    createAdminDto.password = await bcrypt.hash(
      createAdminDto.password,
      saltOrRounds,
    );
    const res = await this.adminService.create(createAdminDto);
    if (res.identifiers.length > 0) {
      return success();
    }
    return error();
  }

  @ApiOperation({
    summary: '管理员列表',
    operationId: 'getAdminList',
  })
  @ApiPaginatedResponse(Admin)
  @ApiPaginate()
  @ApiQuery({
    name: 'username',
    description: '用户名',
    example: 'litecrm',
    required: false,
  })
  @ApiQuery({
    name: 'email',
    description: '邮箱',
    example: '1355081829@qq.com',
    required: false,
  })
  @ApiQuery({
    name: 'mobile',
    description: '手机号',
    example: '15701308875',
    required: false,
  })
  @ApiQuery({
    name: 'qq',
    description: 'qq',
    example: '15701308875',
    required: false,
  })
  @ApiQuery({
    name: 'wechat',
    description: '微信',
    example: '15701308875',
    required: false,
  })
  @Get()
  async findAll(
    @Query('current', new DefaultValuePipe(1), ParseIntPipe) current: number,
    @Query('pageSize', new DefaultValuePipe(15), ParseIntPipe) pageSize: number,
    @Query('username') username: string,
    @Query('email') email: string,
    @Query('mobile') mobile: string,
    @Query('qq') qq: string,
    @Query('wechat') wechat: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const [adminList, total] = await this.adminService.findAll(
      current,
      pageSize,
      username,
      email,
      mobile,
      qq,
      wechat,
      startDate,
      endDate,
    );
    return pagination(adminList, total, current, pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @ApiOperation({
    summary: '更新管理员',
    operationId: 'updateAdmin',
  })
  @ApiParam({
    name: 'id',
    description: '管理员id',
  })
  @ApiMapResponse()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    const admin = await this.adminService.findByUsername(
      updateAdminDto.username,
    );
    if (admin && admin.id !== id) {
      return error('用户名已经存在');
    }
    const admin2 = await this.adminService.findByEmail(updateAdminDto.email);
    if (admin2 && admin.id !== id) {
      return error('邮箱已经存在');
    }
    const admin3 = await this.adminService.findByEmail(updateAdminDto.mobile);
    if (admin3 && admin.id !== id) {
      return error('手机号已经存在');
    }
    if (updateAdminDto.password) {
      const saltOrRounds = 10;
      updateAdminDto.password = await bcrypt.hash(
        updateAdminDto.password,
        saltOrRounds,
      );
    }
    const { affected } = await this.adminService.update(+id, updateAdminDto);
    if (affected > 0) {
      return success();
    }
    return error('更新失败');
  }

  @ApiOperation({
    summary: '删除管理员',
    operationId: 'deleteAdmin',
  })
  @ApiParam({
    name: 'id',
    description: '管理员id',
  })
  @ApiMapResponse()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const admin = await this.adminService.findOne(id);
    if (!admin) {
      return error('管理员不存在');
    }
    const { affected } = await this.adminService.remove(id);
    if (affected > 0) {
      return success('删除成功');
    }
    return error('删除失败');
  }
}
