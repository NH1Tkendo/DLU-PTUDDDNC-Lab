import { Injectable } from '@angular/core';
import { Transaction, TransactionType } from '../models/transaction.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactions: Transaction[] = [
    {
      id: 1,
      title: 'Lương tháng 1',
      amount: 15000000,
      type: TransactionType.INCOME,
      date: new Date('2024-01-05'),
      category: 'Lương',
      description: 'Lương tháng 1/2024'
    },
    {
      id: 2,
      title: 'Tiền điện',
      amount: 500000,
      type: TransactionType.EXPENSE,
      date: new Date('2024-01-10'),
      category: 'Hóa đơn',
      description: 'Tiền điện tháng 1'
    },
    {
      id: 3,
      title: 'Mua sắm',
      amount: 1200000,
      type: TransactionType.EXPENSE,
      date: new Date('2024-01-15'),
      category: 'Mua sắm',
      description: 'Quần áo, giày dép'
    },
    {
      id: 4,
      title: 'Thưởng dự án',
      amount: 5000000,
      type: TransactionType.INCOME,
      date: new Date('2024-01-20'),
      category: 'Thưởng',
      description: 'Thưởng hoàn thành dự án A'
    },
    {
      id: 5,
      title: 'Ăn uống',
      amount: 800000,
      type: TransactionType.EXPENSE,
      date: new Date('2024-01-25'),
      category: 'Ăn uống',
      description: 'Chi phí ăn uống trong tháng'
    },
    {
      id: 6,
      title: 'Tiền nhà',
      amount: 3000000,
      type: TransactionType.EXPENSE,
      date: new Date('2024-01-28'),
      category: 'Hóa đơn',
      description: 'Tiền thuê nhà tháng 1'
    }
  ];

  private transactionsSubject = new BehaviorSubject<Transaction[]>(this.transactions);
  public transactions$ = this.transactionsSubject.asObservable();

  constructor() { }

  // Lấy tất cả giao dịch
  getAllTransactions(): Transaction[] {
    return [...this.transactions];
  }

  // Lấy giao dịch theo ID
  getTransactionById(id: number): Transaction | undefined {
    return this.transactions.find(t => t.id === id);
  }

  // Thêm giao dịch mới
  addTransaction(transaction: Omit<Transaction, 'id'>): void {
    const newId = this.transactions.length > 0 
      ? Math.max(...this.transactions.map(t => t.id)) + 1 
      : 1;
    
    const newTransaction: Transaction = {
      ...transaction,
      id: newId
    };

    this.transactions.push(newTransaction);
    this.transactionsSubject.next([...this.transactions]);
  }

  // Cập nhật giao dịch
  updateTransaction(id: number, transaction: Partial<Transaction>): void {
    const index = this.transactions.findIndex(t => t.id === id);
    if (index !== -1) {
      this.transactions[index] = { ...this.transactions[index], ...transaction };
      this.transactionsSubject.next([...this.transactions]);
    }
  }

  // Xóa giao dịch
  deleteTransaction(id: number): void {
    this.transactions = this.transactions.filter(t => t.id !== id);
    this.transactionsSubject.next([...this.transactions]);
  }

  // Lấy các giao dịch thu
  getIncomeTransactions(): Transaction[] {
    return this.transactions.filter(t => t.type === TransactionType.INCOME);
  }

  // Lấy các giao dịch chi
  getExpenseTransactions(): Transaction[] {
    return this.transactions.filter(t => t.type === TransactionType.EXPENSE);
  }

  // Tính tổng thu
  getTotalIncome(): number {
    return this.getIncomeTransactions().reduce((sum, t) => sum + t.amount, 0);
  }

  // Tính tổng chi
  getTotalExpense(): number {
    return this.getExpenseTransactions().reduce((sum, t) => sum + t.amount, 0);
  }

  // Tính số dư
  getBalance(): number {
    return this.getTotalIncome() - this.getTotalExpense();
  }

  // Lọc giao dịch theo loại
  filterByType(type: 'income' | 'expense' | 'all'): Transaction[] {
    if (type === 'all') {
      return this.getAllTransactions();
    }
    return this.transactions.filter(t => t.type === type);
  }

  // Sắp xếp giao dịch theo ngày
  sortByDate(ascending: boolean = false): Transaction[] {
    return [...this.transactions].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return ascending ? dateA - dateB : dateB - dateA;
    });
  }
}
