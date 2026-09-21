import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document, DocumentType } from './entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentsRepository: Repository<Document>,
  ) {}

  async create(userId: string, createDocumentDto: CreateDocumentDto): Promise<Document> {
    const document = this.documentsRepository.create({
      ...createDocumentDto,
      userId,
    });
    return await this.documentsRepository.save(document);
  }

  async findAll(userId: string, type?: DocumentType) {
    const query = this.documentsRepository.createQueryBuilder('document')
      .where('document.userId = :userId', { userId })
      .andWhere('document.isActive = :isActive', { isActive: true });

    if (type) {
      query.andWhere('document.type = :type', { type });
    }

    return await query.orderBy('document.createdAt', 'DESC').getMany();
  }

  async findById(documentId: string, userId: string): Promise<Document> {
    const document = await this.documentsRepository.findOne({
      where: { id: documentId, userId, isActive: true },
    });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async delete(documentId: string, userId: string): Promise<void> {
    const document = await this.findById(documentId, userId);
    await this.documentsRepository.update(document.id, { isActive: false });
  }

  async extractText(documentId: string, userId: string): Promise<string> {
    const document = await this.findById(documentId, userId);
    if (!document.extractedText) {
      return 'No text extracted. Document processing pending.';
    }
    return document.extractedText;
  }

  async updateExtractedText(documentId: string, extractedText: string): Promise<Document> {
    const document = await this.documentsRepository.findOne({
      where: { id: documentId },
    });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    document.extractedText = extractedText;
    return await this.documentsRepository.save(document);
  }

  async getDocumentCount(userId: string): Promise<number> {
    return await this.documentsRepository.count({
      where: { userId, isActive: true },
    });
  }
}
