import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  save(createDepartmentDto: CreateDepartmentDto) {
    return this.departmentRepository.save(createDepartmentDto);
  }

  async findTree() {
    return this.departmentRepository.manager
      .getTreeRepository(Department)
      .findTrees();
  }
  findOne(id: string) {
    return this.departmentRepository.findOne({ where: { id } });
  }

  remove(id: string) {
    return this.departmentRepository.softDelete(id);
  }
}
