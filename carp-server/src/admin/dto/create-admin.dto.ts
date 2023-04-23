import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, Length } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    description: '用户名',
    example: 'carp-admin',
    minLength: 2,
    maxLength: 12,
  })
  @Length(2, 32, { message: '用户名必须在2-32个字符之间' })
  username: string;

  @ApiProperty({
    description: '密码',
    example: '1355081829@qq.com',
    minLength: 6,
  })
  @Length(6, 32, { message: '密码长度必须在6-32个字符之间' })
  password: string;

  @ApiProperty({
    description: '邮箱',
    example: '1355081829@qq.com',
  })
  @IsEmail({}, { message: '邮箱格式不合法' })
  email: string;

  @ApiProperty({
    description: '手机号',
    example: '15701308875',
  })
  @IsMobilePhone('zh-CN', null, { message: '手机号格式错误' })
  mobile: string;

  @ApiProperty({
    description: '备注',
    example: 'carp-admin开源中台解决方案',
  })
  @IsMobilePhone('zh-CN', null, { message: '手机号格式错误' })
  remark: string;
}
