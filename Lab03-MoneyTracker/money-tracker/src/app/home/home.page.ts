import { Component, OnInit } from "@angular/core";
import { Transaction } from "../models/transaction.model";
import { TransactionService } from "../services/transaction.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
  standalone: false
})

export class HomePage implements OnInit {
  transactions: Transaction[] = [];
  balance: number = 0;

  // Biến form
  name: string = "";
  amount: number | null = null;
  type: "income" | "expense" = "expense";

  // INJECT Service vào Constructor
  constructor(private transactionService: TransactionService) {}

  // Lifecycle Hook: Gọi dữ liệu khi component khởi tạo xong
  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.transactions = this.transactionService.getTransactions();
    this.balance = this.transactionService.getBalance();
  }

  onAdd() {
    if (!this.name || !this.amount) {
      alert("Vui lòng nhập đủ thông tin!");
      return;
    }

    this.transactionService.addTransaction(this.name, this.amount, this.type);
    
    // Reset form
    this.name = "";
    this.amount = null;
    
    this.loadData(); // Cập nhật lại view
  }

  onDelete(id: number) {
    this.transactionService.deleteTransaction(id);
    this.loadData(); // Cập nhật lại view sau khi xóa
  }
}