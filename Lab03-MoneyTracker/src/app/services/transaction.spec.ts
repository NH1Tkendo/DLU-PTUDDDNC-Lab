import { TestBed } from '@angular/core/testing';
import { TransactionService } from './transaction.service';
import { TransactionType } from '../models/transaction.model';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all transactions', () => {
    const transactions = service.getAllTransactions();
    expect(transactions.length).toBeGreaterThan(0);
  });

  it('should calculate total income correctly', () => {
    const totalIncome = service.getTotalIncome();
    expect(totalIncome).toBeGreaterThan(0);
  });

  it('should calculate total expense correctly', () => {
    const totalExpense = service.getTotalExpense();
    expect(totalExpense).toBeGreaterThan(0);
  });

  it('should calculate balance correctly', () => {
    const balance = service.getBalance();
    const totalIncome = service.getTotalIncome();
    const totalExpense = service.getTotalExpense();
    expect(balance).toBe(totalIncome - totalExpense);
  });

  it('should filter transactions by type', () => {
    const incomeTransactions = service.filterByType(TransactionType.INCOME);
    incomeTransactions.forEach(t => {
      expect(t.type).toBe(TransactionType.INCOME);
    });
  });

  it('should add new transaction', () => {
    const initialLength = service.getAllTransactions().length;
    service.addTransaction({
      title: 'Test Transaction',
      amount: 1000,
      type: TransactionType.INCOME,
      date: new Date(),
      category: 'Test'
    });
    expect(service.getAllTransactions().length).toBe(initialLength + 1);
  });

  it('should delete transaction', () => {
    const transactions = service.getAllTransactions();
    if (transactions.length > 0) {
      const firstId = transactions[0].id;
      const initialLength = transactions.length;
      service.deleteTransaction(firstId);
      expect(service.getAllTransactions().length).toBe(initialLength - 1);
    }
  });
});
