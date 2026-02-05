export interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  date: Date;
  category: string;
  description?: string;
}

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense'
}
