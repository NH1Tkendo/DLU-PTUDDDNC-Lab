import { Injectable } from "@angular/core";
import { Transaction } from "../models/transaction.model";

@Injectable({
  providedIn: "root",
})
export class TransactionService {
  private transactions: Transaction[] = [
    {
      id: 1,
      name: "Lương tháng 1",
      amount: 10000000,
      type: "income",
      date: "2024-01-05",
    },
    { id: 2, name: "Tiền trọ", amount: 3500000, type: "expense", date: "2024-01-10" },
  ];

  constructor() {}

  getTransactions(): Transaction[] {
    return this.transactions;
  }

  addTransaction(name: string, amount: number, type: "income" | "expense") {
    const newTrans: Transaction = {
      id: Date.now(),
      name: name,
      amount: amount,
      type: type,
      date: new Date().toISOString(),
    };
    this.transactions.unshift(newTrans);
  }

  deleteTransaction(id: number) {
    this.transactions = this.transactions.filter((t) => t.id !== id);
  }

  // Computed balance: sum(income) - sum(expense)
  getBalance(): number {
    return this.transactions.reduce((acc, t) => {
      return t.type === "income" ? acc + t.amount : acc - t.amount;
    }, 0);
  }
}
