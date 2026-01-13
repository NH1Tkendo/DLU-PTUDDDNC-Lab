package view;

import java.util.Collections;
import java.util.InputMismatchException;
import java.util.List;
import java.util.Scanner;

import model.ImportedProduct;
import vn.edu.dlu.cntt.model.Product;

public class ProductView {
    private Scanner scanner = new Scanner(System.in);

    // hello
    public int menu() {
        System.out.println("\n=== QUẢN LÝ SẢN PHẨM ===");
        System.out.println("1. Thêm sản phẩm");
        System.out.println("2. Hiển thị danh sách");
        System.out.println("3. Tìm kiếm theo tên");
        System.out.println("4. Sắp xếp theo giá giảm dần");
        System.out.println("5. Thoát");
        System.out.print("Chọn chức năng: ");
        return Integer.parseInt(scanner.nextLine());
    }

    public Product inputProduct() {
        System.out.print("Nhập ID: ");
        String id = scanner.nextLine();
        System.out.print("Nhập Tên: ");
        String name = scanner.nextLine();
        System.out.print("Nhập Giá: ");
        double price = Double.parseDouble(scanner.nextLine());

        System.out.println("--- CHỌN LOẠI SẢN PHẨM ---");
        System.out.println("1. Sản phẩm thường");
        System.out.println("2. Sản phẩm nhập khẩu");
        System.out.print("Mời chọn (1/2): ");

        int choice = scanner.nextInt();
        if (choice == 2) {
            System.out.print("Nhập quốc gia: ");
            String country = scanner.nextLine();

            System.out.print("Nhập thuế nhập khẩu (%): ");
            double tax = inputDouble();
            // hello
            return new ImportedProduct(id, name, price, country, tax);
        }
        return new Product(id, name, price);
    }

    public void displayList(List<Product> products) {
        System.out.println("DANH SÁCH SẢN PHẨM:");
        System.out.println("| ID | Tên | Giá|");
        System.out.println("|------------|----------------------|------------|");
        for (Product p : products) {
            System.out.println(p.toString());
        }
    }

    public void showMessage(String msg) {
        System.out.println(">> Thông báo: " + msg);
    }

    public double inputDouble() {
        double input = 0.0;
        while (true) {
            try {
                System.out.print("Nhập số thực: ");
                input = scanner.nextDouble();

                scanner.nextLine();
                return input;

            } catch (InputMismatchException e) {
                System.out.println("Lỗi: Bạn đã nhập sai định dạng. Vui lòng nhập lại số!");
                scanner.nextLine();
            }
        }
    }

    public void searchByName(List<Product> listProducts) {
        System.out.print("Nhập tên sản phẩm cần tìm: ");
        String keyword = new Scanner(System.in).nextLine();

        System.out.println("--- KẾT QUẢ TÌM KIẾM ---");
        boolean found = false;

        for (Product p : listProducts) {
            String productName = p.getName();

            if (productName.toLowerCase().contains(keyword.toLowerCase())) {
                System.out.println(p.toString()); // In ra thông tin
                found = true;
            }
        }

        if (!found) {
            System.out.println("Không tìm thấy sản phẩm nào có tên: " + keyword);
        }
    }

    public void sortProductsByPrice(List<Product> listProducts) {
        Collections.sort(listProducts, (p1, p2) -> Double.compare(p2.getPrice(), p1.getPrice()));
        System.out.println("Đã sắp xếp danh sách theo giá giảm dần!");

        for (Product p : listProducts) {
            System.out.println(p.toString());
        }
    }
}
