import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './file.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly repo: Repository<FileEntity>
  ) {}

  async saveFile(file: Express.Multer.File, meta: any) {
    const entity = this.repo.create({
      originalName: file.originalname,
      filename: file.filename,
      mimeType: file.mimetype,
      size: file.size,
      tenant: meta.tenantId ? ({ id: meta.tenantId } as any) : null,
      user: meta.userId ? ({ id: meta.userId } as any) : null
    });

    return this.repo.save(entity);
  }

  async getFile(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  getFilePath(filename: string) {
    return path.join(process.cwd(), 'uploads', filename);
  }

  deleteFile(filename: string) {
    const filePath = this.getFilePath(filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
}
