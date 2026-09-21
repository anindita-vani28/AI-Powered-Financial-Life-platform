import { Controller, Delete, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './documents.service';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  getDocuments(@Query('type') type?: string) {
    return this.documentsService.getDocuments(type);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadDocument(@UploadedFile() file?: any) {
    void file;
    return this.documentsService.uploadDocument();
  }

  @Delete(':id')
  deleteDocument(@Param('id') documentId: string) {
    return this.documentsService.deleteDocument(documentId);
  }

  @Post(':id/extract')
  extractDocumentText(@Param('id') documentId: string) {
    return this.documentsService.extractDocumentText(documentId);
  }
}
