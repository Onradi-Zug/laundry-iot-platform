import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rule } from './rule.entity';

@Injectable()
export class RulesService {
  constructor(
    @InjectRepository(Rule)
    private readonly ruleRepository: Repository<Rule>,
  ) {}

  async create(data: any) {
    // мінімальна реалізація — збереження в БД, якщо є ентіті
    try {
      const entity = this.ruleRepository.create ? this.ruleRepository.create(data) : data;
      return this.ruleRepository.save ? await this.ruleRepository.save(entity) : { ok: true, data };
    } catch (err) {
      return { ok: false, error: (err as Error).message };
    }
  }

  async findOne(id: string) {
    if (this.ruleRepository.findOne) {
      return this.ruleRepository.findOne({ where: { id } as any });
    }
    return { id, message: 'not implemented' };
  }

  async findAll() {
    if (this.ruleRepository.find) {
      return this.ruleRepository.find();
    }
    return [];
  }
}
