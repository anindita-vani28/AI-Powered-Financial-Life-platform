import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum AlertType {
  RENEWAL = 'renewal',
  DEADLINE = 'deadline',
  MISSING_DOC = 'missing_doc',
  OPPORTUNITY = 'opportunity',
  RISK = 'risk',
}

export enum AlertPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

@Entity('alerts')
@Index(['userId'])
@Index(['read'])
@Index(['priority'])
@Index(['createdAt'])
export class Alert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    type: 'enum',
    enum: AlertType,
  })
  type: AlertType;

  @Column()
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({
    type: 'enum',
    enum: AlertPriority,
    default: AlertPriority.MEDIUM,
  })
  priority: AlertPriority;

  @Column({ default: false })
  read: boolean;

  @Column({ nullable: true })
  actionUrl?: string;

  @Column({ nullable: true })
  relatedEntityId?: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: true })
  isActive: boolean;
}
