import { ApiProperty } from '@nestjs/swagger';
// currentAuthority: 'admin';
// status: 'ok';
// type: 'account';
export class LoginResponseDto {
  @ApiProperty({
    description: '用户token',
  })
  token: string;

  @ApiProperty({
    description: 'currentAuthority',
  })
  currentAuthority: string;

  @ApiProperty({
    description: '状态',
  })
  status: string;

  @ApiProperty({
    description: '用户类型',
    enum: ['account', 'mobile'],
    default: 'account',
  })
  type: 'account' | 'mobile';
}
