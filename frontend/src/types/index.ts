export interface User {
  id: string;
  email: string;
  name: string;
  role: 'consumer' | 'professional';
  createdAt: Date;
}

export interface Family {
  id: string;
  name: string;
  ownerId: string;
  members: FamilyMember[];
}

export interface FamilyMember {
  id: string;
  familyId: string;
  userId: string;
  role: 'owner' | 'member';
  name?: string;
  email?: string;
}

export interface Document {
  id: string;
  userId: string;
  fileName: string;
  fileUrl: string;
  extractedText?: string;
  type: 'insurance' | 'tax' | 'claim' | 'credit' | 'other';
  category?: string;
  uploadedAt: Date;
}

export interface FinancialHealthScore {
  id: string;
  userId: string;
  overallScore: number;
  breakdown: ScoreBreakdown;
  opportunities: Opportunity[];
  updatedAt: Date;
}

export interface ScoreBreakdown {
  insurance: {
    score: number;
    status: string;
    gaps?: string[];
  };
  tax: {
    score: number;
    status: string;
    missingDocs?: number;
  };
  credit: {
    score: number;
    trend: 'up' | 'down' | 'stable';
    recentChanges?: number;
  };
  claims: {
    score: number;
    pending?: number;
    resolved?: number;
  };
  documents: {
    score: number;
    totalCount: number;
    organized: number;
  };
}

export interface Opportunity {
  id: string;
  type: 'deduction' | 'coverage' | 'efficiency' | 'risk';
  title: string;
  description: string;
  impact: string;
  priority: 'high' | 'medium' | 'low';
  action?: string;
}

export interface Alert {
  id: string;
  userId: string;
  type: 'renewal' | 'deadline' | 'missing_doc' | 'opportunity' | 'risk';
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

export interface InsurancePolicy {
  id: string;
  userId: string;
  provider: string;
  type: 'auto' | 'home' | 'health' | 'life' | 'disability' | 'umbrella';
  policyNumber: string;
  coverage: string;
  premium: number;
  renewalDate: Date;
  status: 'active' | 'expired' | 'pending_renewal';
}

export interface Claim {
  id: string;
  userId: string;
  claimNumber: string;
  type: string;
  status: 'submitted' | 'pending' | 'approved' | 'denied' | 'paid';
  amount: number;
  dateSubmitted: Date;
  lastUpdate: Date;
}

export interface CreditInfo {
  id: string;
  userId: string;
  score: number;
  previousScore?: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: Date;
}

export interface TaxInfo {
  id: string;
  userId: string;
  year: number;
  status: 'not_filed' | 'filed' | 'amended';
  filingDate?: Date;
  refundAmount?: number;
  taxOwed?: number;
}
