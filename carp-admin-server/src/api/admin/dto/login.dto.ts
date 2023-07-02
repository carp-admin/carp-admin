import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
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
}
