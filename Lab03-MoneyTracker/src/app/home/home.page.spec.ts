import { ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { Component, Input } from "@angular/core";

import { HomePage } from "./home.page";
import { TransactionService } from "../services/transaction.service";
import { Transaction } from "../models/transaction.model";

// Mock component for testing
@Component({
  selector: "app-transaction-item",
  template: "<div></div>",
  standalone: true,
})
class MockTransactionItemComponent {
  @Input() transaction!: Transaction;
}

describe("HomePage", () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let transactionService: TransactionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), HomePage, MockTransactionItemComponent],
      providers: [TransactionService],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    transactionService = TestBed.inject(TransactionService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load transactions on init", () => {
    expect(component.transactions.length).toBeGreaterThan(0);
  });

  it("should calculate totals correctly", () => {
    expect(component.totalIncome).toBeGreaterThan(0);
    expect(component.totalExpense).toBeGreaterThan(0);
    expect(component.balance).toBe(
      component.totalIncome - component.totalExpense,
    );
  });

  it("should filter transactions by type", () => {
    component.selectedFilter = "income";
    component.applyFilters();
    expect(
      component.filteredTransactions.every((t) => t.type === "income"),
    ).toBe(true);
  });

  it("should toggle sort order", () => {
    const initialOrder = component.sortOrder;
    component.toggleSortOrder();
    expect(component.sortOrder).not.toBe(initialOrder);
  });
});
