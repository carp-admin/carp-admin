import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
  ) {}

  create(createAdminDto: CreateAdminDto) {
    return this.adminRepository.insert(createAdminDto);
  }

  findByUsername(username, password = false) {
    const select = ['admin.id', 'admin.username'];
    if (password) {
      select.push('admin.password');
    }
    return this.adminRepository
      .createQueryBuilder('admin')
      .where('admin.username =:username', { username })
      .select(select)
      .getOne();
  }

  findByEmail(email) {
    return this.adminRepository.findOneBy({ email });
  }

  findByMobile(mobile) {
    return this.adminRepository.findOneBy({ mobile });
  }

  findAll(
    current = 1,
    pageSize = 1,
    username = '',
    email = '',
    mobile = '',
    qq = '',
    wechat = '',
    departmentIds = [],
    startDate = '',
    endDate = '',
  ) {
    return this.adminRepository
      .createQueryBuilder('admin')
      .leftJoinAndSelect('admin.department', 'department')
      .offset((current - 1) * pageSize)
      .limit(pageSize)
      .orderBy('admin.id', 'DESC')
      .where(
        new Brackets((q) => {
          if (username) {
            q.where('username like :username', { username: `%${username}%` });
          }
        }),
      )
      .andWhere(
        new Brackets((q) => {
          if (email) {
            q.where('email like :email', { email: `%${email}%` });
          }
        }),
      )
      .andWhere(
        new Brackets((q) => {
          if (mobile) {
            q.where('mobile like :mobile', { mobile: `%${mobile}%` });
          }
        }),
      )
      .andWhere(
        new Brackets((q) => {
          if (qq) {
            q.where('qq like :qq', { qq: `%${qq}%` });
          }
        }),
      )
      .andWhere(
        new Brackets((q) => {
          if (wechat) {
            q.where('wechat like :wechat', { wechat: `%${wechat}%` });
          }
        }),
      )
      .andWhere(
        new Brackets((q) => {
          if (departmentIds.length > 0) {
            q.where('admin.departmentId in (:...departmentIds)', {
              departmentIds,
            });
          }
        }),
      )
      .andWhere(
        new Brackets((q) => {
          if (startDate && endDate) {
            q.where('createdAt between :startDate and :endDate', {
              startDate,
              endDate,
            });
          }
        }),
      )
      .getManyAndCount();
  }

  findOne(id: string) {
    return this.adminRepository.findOne({ where: { id } });
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.adminRepository.update(id, updateAdminDto);
  }

  remove(id: string) {
    return this.adminRepository.softDelete(id);
  }
}
