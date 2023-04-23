import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({
    description: '用户名',
  })
  @IsNotEmpty({ message: '用户名不可以为空' })
  username: string;

  @ApiProperty({
    description: '密码',
  })
  @IsNotEmpty({ message: '密码不可以为空' })
  password: string;

  @ApiProperty({
    description: '用户类型:account|mobile',
    default: 'account',
  })
  @IsNotEmpty({ message: '登录类型不可以为空' })
  type: 'account' | 'mobile';
}
