import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin/admin.service';
import { ApiMapResponse } from './decorator/api.map.response';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { success } from './utils/response';
import { Public } from './decorator/public.decorator';
import { DepartmentService } from './department/department.service';
import { Department } from './department/entities/department.entity';

@ApiTags('app')
@Public()
@Controller()
export class AppController {
  constructor(
    private readonly adminService: AdminService,
    private readonly departmentService: DepartmentService,
  ) {}

  @ApiOperation({
    summary: '初始化数据',
    operationId: 'initSystem',
  })
  @ApiMapResponse()
  @Get()
  async getHello() {
    await this.initAdmin();
    await this.initDepartment();
    return success();
  }
  async initAdmin() {
    const saltOrRounds = 10;
    const password = '1355081829@qq.com';
    const hash = await bcrypt.hash(password, saltOrRounds);
    for (let i = 0; i < 50; i++) {
      const admin = {
        username: faker.internet.userName(),
        mobile: faker.phone.number('157########'),
        email: faker.internet.email(),
        password: hash,
        qq: faker.datatype.number({ min: 1000000 }),
        wechat: faker.lorem.word(),
      };
      if (i === 0) {
        admin.username = 'carp-admin';
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await this.adminService.create(admin);
    }
  }
  async initDepartment() {
    const areas = ['华东分部', '华中分部', '华南分部'];
    for (const area of areas) {
      const a1 = new Department();
      a1.name = area;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await this.departmentService.save(a1);
      const departments = ['研发部', '市场部', '商务部', '财务部'];
      for (const department of departments) {
        const a2 = new Department();
        a2.name = department;
        a2.parent = a1;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await this.departmentService.save(a2);
      }
    }
  }
}
