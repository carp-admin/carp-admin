import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Department } from '../../department/entities/department.entity';

@Entity()
export class Admin {
  @ApiProperty({
    description: '用户id',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: '用户名',
  })
  @Column()
  username: string;

  @ApiProperty({
    description: '邮箱',
    required: false,
    default: '1355081829@qq.com',
  })
  @Column({ nullable: true })
  email: string;

  @ApiProperty({
    description: '手机号',
    required: false,
  })
  @Column({ nullable: true })
  mobile: string;

  @ApiProperty({
    description: '微信',
    required: false,
  })
  @Column({ nullable: true })
  wechat: string;

  @ApiProperty({
    description: 'QQ',
    required: false,
  })
  @Column({ nullable: true })
  qq: string;

  @ApiProperty({
    description: '头像',
    required: false,
  })
  @Column({ nullable: true })
  avatar: string;

  @ApiProperty({
    description: '密码',
    required: false,
  })
  @Column({ select: false })
  password: string;

  @ApiProperty({
    description: '备注',
    required: false,
  })
  @Column({ nullable: true })
  remark: string;

  @ApiProperty({
    description: '部门',
    required: false,
  })
  @ManyToOne(() => Department, (department) => department.adminList)
  department: Department;

  @ApiProperty({
    description: '创建时间',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: '更新时间',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: '删除时间',
    required: false,
  })
  @DeleteDateColumn()
  deletedAt: Date;
}
