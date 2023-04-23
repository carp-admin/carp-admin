import { ApiProperty } from '@nestjs/swagger';
export class OutAdminDto {
  @ApiProperty({
    description: '状态',
  })
  success: boolean;
}
