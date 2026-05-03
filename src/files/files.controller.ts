import { Controller, Post, UploadedFile, UseInterceptors, Body, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { Response } from 'express';
import * as multer from 'multer';
import * as path from 'path';

@Controller('files')
export class FilesController {
  constructor(private readonly files: FilesService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: './uploads',
        filename: (_, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, unique + path.extname(file.originalname));
        }
      })
    })
  )
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { tenantId?: string; userId?: string }
  ) {
    return this.files.saveFile(file, body);
  }

  @Get(':id')
  async download(@Param('id') id: string, @Res() res: Response) {
    const file = await this.files.getFile(id);
    if (!file) return res.status(404).send('Not found');

    const filePath = this.files.getFilePath(file.filename);
    return res.download(filePath, file.originalName);
  }
}
