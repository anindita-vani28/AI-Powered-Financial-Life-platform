import { IsNumber, IsObject, IsArray, IsOptional, Min, Max } from 'class-validator';

export class CreateHealthScoreDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  overallScore: number;

  @IsObject()
  breakdown: {
    insurance: { score: number; status: string; gaps?: string[] };
    tax: { score: number; status: string; missingDocs?: number };
    credit: { score: number; trend: 'up' | 'down' | 'stable'; recentChanges?: number };
    claims: { score: number; pending?: number; resolved?: number };
    documents: { score: number; totalCount: number; organized: number };
  };

  @IsArray()
  @IsOptional()
  opportunities?: Array<any>;

  @IsOptional()
  @IsNumber()
  previousScore?: number;
}
