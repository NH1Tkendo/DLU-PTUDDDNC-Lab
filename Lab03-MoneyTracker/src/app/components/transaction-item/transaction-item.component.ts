import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { Transaction } from "../../models/transaction.model";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-transaction-item",
  templateUrl: "./transaction-item.component.html",
  styleUrls: ["./transaction-item.component.scss"],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class TransactionItemComponent implements OnInit, OnChanges {
  @Input() transaction!: Transaction;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Transaction>();

  isIncome: boolean = false;

  ngOnInit() {
    console.log(
      "TransactionItemComponent initialized with transaction:",
      this.transaction,
    );
    this.checkTransactionType();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["transaction"]) {
      console.log("Transaction changed:", changes["transaction"].currentValue);
      this.checkTransactionType();
    }
  }

  private checkTransactionType(): void {
    this.isIncome = this.transaction?.type === "income";
  }

  onDelete(): void {
    this.delete.emit(this.transaction.id);
  }

  onEdit(): void {
    this.edit.emit(this.transaction);
  }

  getIconName(): string {
    return this.isIncome ? "arrow-down-circle" : "arrow-up-circle";
  }

  getColorClass(): string {
    return this.isIncome ? "income" : "expense";
  }
}
