import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TransactionItemComponent } from "./transaction-item.component";
import { TransactionType } from "../../models/transaction.model";

describe("TransactionItemComponent", () => {
  let component: TransactionItemComponent;
  let fixture: ComponentFixture<TransactionItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), TransactionItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionItemComponent);
    component = fixture.componentInstance;

    // Provide a mock transaction
    component.transaction = {
      id: 1,
      title: "Test Transaction",
      amount: 1000,
      type: TransactionType.INCOME,
      date: new Date(),
      category: "Test Category",
    };

    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should emit delete event", () => {
    spyOn(component.delete, "emit");
    component.onDelete();
    expect(component.delete.emit).toHaveBeenCalledWith(1);
  });

  it("should emit edit event", () => {
    spyOn(component.edit, "emit");
    component.onEdit();
    expect(component.edit.emit).toHaveBeenCalledWith(component.transaction);
  });

  it("should determine income correctly", () => {
    component.transaction.type = TransactionType.INCOME;
    component.ngOnInit();
    expect(component.isIncome).toBe(true);
  });

  it("should determine expense correctly", () => {
    component.transaction.type = TransactionType.EXPENSE;
    component.ngOnInit();
    expect(component.isIncome).toBe(false);
  });
});
