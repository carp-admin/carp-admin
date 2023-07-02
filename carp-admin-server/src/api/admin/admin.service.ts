import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  create(createAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
  }

  findAll(page = 1, pageSize = 16) {
    return this.adminRepository
      .createQueryBuilder()
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .getManyAndCount();
  }

  findOne(id: number) {
    return this.adminRepository.findOne({ where: { id } });
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return this.adminRepository.softDelete(id);
  }
}
