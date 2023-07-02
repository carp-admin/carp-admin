import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../../common.entity';
import { Company } from '../../company/entities/company.entity';

@Entity()
export class Admin extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    comment: '用户名',
  })
  username: string;

  @Column({
    unique: true,
    comment: '真实姓名',
    nullable: true,
  })
  name: string;

  @Column({
    comment: '密码',
  })
  password: string;

  @Column({
    unique: true,
    comment: '邮箱',
    nullable: true,
  })
  email: string;

  @Column({
    unique: true,
    comment: '手机号',
    nullable: true,
  })
  mobile: string;

  @ManyToOne(() => Company, (company) => company.adminList, {
    createForeignKeyConstraints: false,
  })
  company: Company;
}
