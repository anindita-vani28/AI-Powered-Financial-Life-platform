import { IsString, IsEnum, IsOptional } from 'class-validator';
import { DocumentType } from '../entities/document.entity';

export class CreateDocumentDto {
  @IsString()
  fileName: string;

  @IsString()
  fileUrl: string;

  @IsEnum(DocumentType)
  type: DocumentType;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  fileSize?: number;

  @IsOptional()
  mimeType?: string;
}
