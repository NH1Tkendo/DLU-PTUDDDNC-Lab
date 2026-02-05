import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { TransactionService } from '../services/transaction.service';
import { By } from '@angular/platform-browser';
import { Component, Input } from '@angular/core';

// 1. Mock Component con (để tránh lỗi nếu sinh viên chưa kịp viết logic cho con)
@Component({
  selector: 'app-transaction-item',
  template: '<div class="mock-item">{{transaction?.amount}}</div>',
  standalone: false
})
class MockTransactionItemComponent {
  @Input() transaction: any;
}

// 2. Mock Service (Giả lập dữ liệu)
class MockTransactionService {
  private data = [
    { id: 1, name: 'Cafe', amount: 50000, type: 'expense', date: '2024-01-01' },
    {
      id: 2,
      name: 'Salary',
      amount: 10000000,
      type: 'income',
      date: '2024-01-05',
    },
  ];

  getTransactions() {
    return this.data;
  }

  deleteTransaction(id: number) {
    // Logic giả để spy bắt được
  }

  getBalance() {
    return 9950000;
  }
}

describe('HomePage UI & Functionality', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let service: TransactionService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage, MockTransactionItemComponent], // Khai báo cả Mock con
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: TransactionService, useClass: MockTransactionService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    service = TestBed.inject(TransactionService);
    fixture.detectChanges(); // Trigger ngOnInit
  }));

  // --- TEST 1: KIỂM TRA NG-INIT & RENDER DỮ LIỆU ---
  it('UI_DATA: Should load transactions from Service on Init', () => {
    // Kiểm tra biến transactions trong component có dữ liệu không
    expect((component as any).transactions).toBeDefined();
    expect((component as any).transactions.length).toBeGreaterThan(0);
  });

  // --- TEST 2: KIỂM TRA REFACTORING (COMPONENT CON) ---
  it('UI_REFACTOR: Should use <app-transaction-item> tag in HTML', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // Tìm thẻ component con
    const childComponent = compiled.querySelector('app-transaction-item');
    expect(childComponent).toBeTruthy(
      'Yêu cầu phải tách component con và sử dụng thẻ <app-transaction-item>',
    );
  });

  // --- TEST 3: KIỂM TRA TƯƠNG TÁC (DELETE) ---
  it('UI_INTERACTION: Delete function should call Service', () => {
    spyOn(service, 'deleteTransaction');

    // Giả sử sinh viên viết hàm tên là onDelete hoặc deleteTransaction
    if ((component as any).onDelete) {
      (component as any).onDelete(1);
    } else if ((component as any).deleteTransaction) {
      (component as any).deleteTransaction(1);
    } else {
      fail(
        'Không tìm thấy hàm xử lý xóa (onDelete hoặc deleteTransaction) trong HomePage',
      );
    }

    expect(service.deleteTransaction).toHaveBeenCalledWith(1);
  });
});
