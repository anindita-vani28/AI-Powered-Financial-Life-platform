import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Body,
  Req,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { DocumentType } from './entities/document.entity';

@ApiTags('documents')
@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly jwtService: JwtService,
  ) {}

  private getUserIdFromRequest(req: Request): string {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Missing authorization header');
    }

    const token = authHeader.replace(/^Bearer\s+/i, '');
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || 'dev-secret',
      });
      return payload.sub;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all documents for user' })
  async getDocuments(@Req() req: Request, @Query('type') type?: DocumentType) {
    const userId = this.getUserIdFromRequest(req);
    return this.documentsService.findAll(userId, type);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get document by ID' })
  async getDocument(@Req() req: Request, @Param('id') documentId: string) {
    const userId = this.getUserIdFromRequest(req);
    return this.documentsService.findById(documentId, userId);
  }

  @Post()
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create/upload document' })
  async uploadDocument(
    @Req() req: Request,
    @Body() createDocumentDto: CreateDocumentDto,
  ) {
    const userId = this.getUserIdFromRequest(req);
    return this.documentsService.create(userId, createDocumentDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete document' })
  async deleteDocument(@Req() req: Request, @Param('id') documentId: string) {
    const userId = this.getUserIdFromRequest(req);
    await this.documentsService.delete(documentId, userId);
    return { message: 'Document deleted successfully' };
  }

  @Post(':id/extract')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Extract text from document' })
  async extractDocumentText(@Req() req: Request, @Param('id') documentId: string) {
    const userId = this.getUserIdFromRequest(req);
    const text = await this.documentsService.extractText(documentId, userId);
    return { text };
  }
}
