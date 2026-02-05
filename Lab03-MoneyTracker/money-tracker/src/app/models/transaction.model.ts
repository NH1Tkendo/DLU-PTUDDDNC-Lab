export interface Transaction {
  id: number;
  name: string; // Tên khoản thu/chi
  amount: number; // Số tiền
  type: 'income' | 'expense'; // Loại: Thu hoặc Chi
  date: string; // Ngày tháng
}
