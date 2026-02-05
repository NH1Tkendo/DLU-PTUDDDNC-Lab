import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Transaction } from "../../models/transaction.model";

@Component({
  selector: "app-transaction-item",
  templateUrl: "./transaction-item.component.html",
  styleUrls: ["./transaction-item.component.scss"],
  standalone: false
})
export class TransactionItemComponent {
  @Input() transaction!: Transaction;
  @Output() remove = new EventEmitter<number>();

  onRemove() {
    this.remove.emit(this.transaction.id);
  }
}
