import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, Length, ValidateIf } from 'class-validator';
import { CreateAdminDto } from './create-admin.dto';

export class UpdateAdminDto extends CreateAdminDto {
  @ApiProperty({
    description: '密码',
    example: '123456',
    minLength: 6,
    required: false,
  })
  @ValidateIf((v) => {
    if (v.password === undefined || v.password === '') {
      return false;
    }
    if (v.password.length < 6 || v.password.length > 32) {
      return true;
    }
  })
  @Length(6, 32, { message: '密码长度必须在6-32个字符之间' })
  password: string;
}
