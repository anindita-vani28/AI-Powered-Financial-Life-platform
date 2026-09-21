import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('health_scores')
@Index(['userId'])
@Index(['createdAt'])
export class HealthScore {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'int' })
  overallScore: number; // 0-100

  @Column({ type: 'jsonb' })
  breakdown: {
    insurance: { score: number; status: string; gaps?: string[] };
    tax: { score: number; status: string; missingDocs?: number };
    credit: { score: number; trend: 'up' | 'down' | 'stable'; recentChanges?: number };
    claims: { score: number; pending?: number; resolved?: number };
    documents: { score: number; totalCount: number; organized: number };
  };

  @Column({ type: 'jsonb', default: [] })
  opportunities: Array<{
    id: string;
    type: 'deduction' | 'coverage' | 'efficiency' | 'risk';
    title: string;
    description: string;
    impact: string;
    priority: 'high' | 'medium' | 'low';
    action?: string;
  }>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'int', default: 0 })
  previousScore?: number;
}
