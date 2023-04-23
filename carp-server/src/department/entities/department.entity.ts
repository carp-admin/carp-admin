import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Relation,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';

@Entity()
@Tree('materialized-path')
export class Department {
  @ApiProperty({ description: '唯一id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: '部门名称' })
  @Column({ comment: '部门名称' })
  name: string;

  @ApiProperty({ description: '部门状态：1可用；0禁用' })
  @Column({ comment: '状态', default: 1 })
  status: boolean;

  @ApiProperty({ description: '备注信息' })
  @Column({ comment: '备注', nullable: true })
  remark: string;

  @ApiProperty({
    description: '父级分类',
    type: () => IntersectionType(Department),
  })
  @TreeParent()
  parent: Relation<Department>;

  @ApiProperty({
    description: '子分类',
    type: () => IntersectionType(Department),
    isArray: true,
  })
  @TreeChildren()
  children: Relation<Department[]>;

  @Column({ nullable: true })
  parentId: string;

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
