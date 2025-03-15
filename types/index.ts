export interface Transaction {
  id: string;
  type: 'mal' | 'fitrah';
  amount: number;
  date: string;
  userId: string;
}

export interface DonorDistribution {
  region: string;
  count: number;
}

export interface ZakatCalculation {
  type: 'mal' | 'fitrah';
  amount: number;
  nisab?: number;
  isEligible?: boolean;
}

export interface Doa {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  templateBackground?: string;
  ameenCount: number;
  isAmeen: boolean;
  templateId?: string;
}

export interface Article {
  id: string;
  imageUrl: string;
  category: string;
  title: string;
  publishedAt: string;
}

export interface User {
  id: string;
  name: string;
  photoUrl: string;
}

export interface Quote {
  text: string;
  author: string;
}
