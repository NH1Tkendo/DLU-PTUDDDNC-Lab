
import { TestBed } from '@angular/core/testing';
import { TransactionService } from './transaction.service';

describe('AutoGrading', () => {
  let service: TransactionService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionService);
    if ((service as any).transactions) (service as any).transactions = [];
  });

  it('CHECK_ADD_LIFO', () => {
    service.addTransaction('A', 10, 'income');
    service.addTransaction('B', 20, 'expense');
    const list = service.getTransactions();
    expect(list[0].name).toBe('B'); // Mới nhất lên đầu
  });

  it('CHECK_DELETE', () => {
    (service as any).transactions = [{id:1, name:'X', amount:0, type:'income'}, {id:2, name:'Y', amount:0, type:'expense'}];
    service.deleteTransaction(1);
    expect(service.getTransactions().find(t => t.id === 1)).toBeUndefined();
    expect(service.getTransactions().length).toBe(1);
  });

  it('CHECK_BALANCE', () => {
    expect(service.getBalance()).toBe(0);
    service.addTransaction('In', 100, 'income');
    service.addTransaction('Out', 30, 'expense');
    expect(service.getBalance()).toBe(70);
  });
});
