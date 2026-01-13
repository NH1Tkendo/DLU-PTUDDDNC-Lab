package controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import service.IProductService;
import service.ProductServiceImpl;
import view.ProductView;
import vn.edu.dlu.cntt.model.Product;

public class ProductController {
    // 1. Khai báo Service thay vì List
    private IProductService productService = new ProductServiceImpl();
    private ProductView view;

    // áhdhasjhdajsdja
    public ProductController(ProductView view) {
        this.view = view;
    }

    public void run() {
        while (true) {
            try {
                int choice = view.menu();
                switch (choice) {
                    case 1:
                        addProduct(); // Tách hàm cho gọn
                        break;
                    case 2:
                        showAllProducts();
                        break;
                    case 3:
                        searchProduct();
                        break;
                    case 4:
                        System.out.println("Tạm biệt!");
                        return;
                    default:
                        view.showMessage("Lựa chọn không hợp lệ!");
                }
            } catch (Exception e) {
                view.showMessage("Lỗi hệ thống: " + e.getMessage());
                e.printStackTrace();
            }
        }
    }

    // --- CÁC HÀM XỬ LÝ GỌI SERVICE ---

    private void addProduct() {
        Product p = view.inputProduct();
        productService.add(p);
    }

    private void showAllProducts() {
        // Controller yêu cầu Service lấy dữ liệu -> đưa cho View hiển thị
        List<Product> list = productService.getAll();
        view.displayList(list);
    }

    private void searchProduct() {
        // 1. Controller yêu cầu View lấy từ khóa
        String keyword = new Scanner(System.in).nextLine();

        // 2. Controller yêu cầu Service tìm kiếm
        List<Product> results = productService.search(keyword);

        // 3. Controller đưa kết quả cho View hiển thị
        if (results.isEmpty()) {
            view.showMessage("Không tìm thấy sản phẩm nào!");
        } else {
            view.displayList(results);
        }
    }
}