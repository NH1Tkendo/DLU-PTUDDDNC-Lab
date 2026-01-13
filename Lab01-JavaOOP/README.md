[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/HdpJx-GO)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=22201462&assignment_repo_type=AssignmentRepo)
# BÀI THỰC HÀNH 1: JAVA OOP & MVC PATTERN

> **QUAN TRỌNG:** Sinh viên vui lòng điền thông tin vào phần dưới đây ngay sau khi Clone project.

### 🎓 THÔNG TIN SINH VIÊN

* **Họ và tên:** ............................................................
* **Mã số sinh viên:** ....................................................
* **Lớp:** .....................................................................

---

## ⚠️ CẢNH BÁO QUAN TRỌNG (ĐỌC KỸ)

Dự án này sử dụng hệ thống chấm điểm tự động (Autograding) thông qua file kiểm thử unit test.

1.  **File bảo vệ:** `src/test/java/Lab01Test.java`
2.  **Quy định:**
    * Sinh viên **KHÔNG ĐƯỢC PHÉP** chỉnh sửa, xóa hoặc đổi tên file này.
    * Hệ thống sẽ giám sát mọi thay đổi. Nếu phát hiện file này bị can thiệp, bài làm sẽ bị đánh dấu **"Protected file modified"** và có thể nhận **0 điểm** do vi phạm quy chế.
3.  **Khuyến khích:** Sinh viên nên mở file này để đọc hiểu logic chấm điểm, nhưng tuyệt đối không sửa nội dung bên trong.

---

## 📂 CẤU TRÚC DỰ ÁN (MAVEN)

Sinh viên cần tuân thủ cấu trúc package dưới đây để hệ thống chấm điểm hoạt động chính xác:

```text
src/
├── main/
│   └── java/
│       ├── model/          <-- Chứa class Product, ImportedProduct (Yêu cầu 2)
│       ├── view/           <-- Chứa class ProductView (Menu, Input/Output)
│       ├── controller/     <-- Chứa class ProductController
│       ├── service/        <-- Chứa Service Interface & Impl (Yêu cầu 4)
│       └── main/           <-- Chứa class Main (Chạy thử ứng dụng)
└── test/
    └── java/
        └── Lab01Test.java  <-- FILE CHẤM ĐIỂM (KHÔNG SỬA)

```

---

## ✅ YÊU CẦU THỰC HIỆN

Sinh viên hoàn thành code dựa trên các yêu cầu trong file đề bài:

1. **Cơ bản:** Xây dựng mô hình MVC (Model, View, Controller) cho `Product`.
2. **Yêu cầu 1 (Validation):** Kiểm tra trùng lặp ID trước khi thêm mới.
3. **Yêu cầu 2 (Kế thừa):** Tạo class `ImportedProduct` kế thừa `Product`, ghi đè tính giá (Cộng thuế).
4. **Yêu cầu 3 (Thuật toán):**
* Tìm kiếm sản phẩm theo tên (không phân biệt hoa thường).
* Sắp xếp danh sách theo giá giảm dần.


5. **Yêu cầu 4 (Kiến trúc):** Tách logic xử lý từ Controller sang Service Layer (`IProductService`, `ProductServiceImpl`).

---

## 🚀 HƯỚNG DẪN KIỂM THỬ (TEST)

Để biết mình đang được bao nhiêu điểm trước khi nộp, bạn có thể chạy test trên máy cá nhân:

**Cách 1: Sử dụng Terminal/CMD**

1. Mở terminal tại thư mục gốc của dự án.
2. Chạy lệnh:
```bash
mvn test

```


3. Kết quả:
* **BUILD SUCCESS**: Chúc mừng, code của bạn đã vượt qua logic kiểm tra.
* **BUILD FAILURE**: Có lỗi xảy ra, hãy xem log để sửa lại code.



**Cách 2: Sử dụng IDE (IntelliJ/Eclipse)**

* Mở file `src/test/java/Lab01Test.java`.
* Nhấn chuột phải và chọn **Run 'Lab01Test'**.

---

## 📝 HƯỚNG DẪN NỘP BÀI

### Bước 1: Nộp code lên GitHub (Chấm điểm tự động)

Thực hiện các lệnh git sau để đẩy bài làm lên:

```bash
git add .
git commit -m "Nộp bài Lab 1 - MSSV"
git push

```

*Sau khi push, hãy truy cập tab **Actions** trên GitHub repository của bạn để xem điểm số được chấm tự động.*

### Bước 2: Nộp báo cáo (Bắt buộc theo quy định môn học)

Ngoài việc push code, sinh viên cần nộp thêm file báo cáo:

1. Nén toàn bộ thư mục `src` thành file `.zip`.
* *Tên file:* `MSSV_HoTen_Lab01.zip`


2. Viết báo cáo ngắn (Word) chụp ảnh màn hình kết quả chạy chương trình (Console).
3. Nộp cả 2 file trên lên hệ thống quản lý học tập (LMS/Google Classroom) của lớp.

---

**Chúc các em làm bài tốt!**
