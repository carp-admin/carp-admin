import { CommonEntity } from '../../common.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Admin } from '../../admin/entities/admin.entity';

@Entity()
export class Company extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    comment: '公司名称',
  })
  name: string;

  @OneToMany(() => Admin, (admin) => admin.company, {
    createForeignKeyConstraints: false,
  })
  adminList: Admin[];
}
