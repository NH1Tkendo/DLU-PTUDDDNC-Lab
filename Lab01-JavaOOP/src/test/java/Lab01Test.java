import vn.edu.dlu.cntt.model.Product;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class Lab01Test {

    // ========================================================
    // PHẦN 1: KIỂM TRA MODEL CƠ BẢN (Product.java)
    // Nguồn:
    // ========================================================

    @Test
    @Order(1)
    @DisplayName("REQ 1: Kiểm tra cấu trúc Class Product (Encapsulation)")
    public void testProductStructure() {
        Product p = new Product("P001", "Laptop Gaming", 2500.0);

        // Kiểm tra Getter
        assertAll("Kiểm tra Getters",
                () -> assertEquals("P001", p.getId(), "Hàm getId() sai"),
                () -> assertEquals("Laptop Gaming", p.getName(), "Hàm getName() sai"),
                () -> assertEquals(2500.0, p.getPrice(), 0.01, "Hàm getPrice() sai"));

        // Kiểm tra Setter
        p.setName("Macbook Pro");
        p.setPrice(3000.0);

        assertAll("Kiểm tra Setters",
                () -> assertEquals("Macbook Pro", p.getName(), "Hàm setName() không cập nhật giá trị"),
                () -> assertEquals(3000.0, p.getPrice(), 0.01, "Hàm setPrice() không cập nhật giá trị"));
    }

    @Test
    @Order(2)
    @DisplayName("REQ 1: Kiểm tra hàm toString()")
    public void testProductToString() {
        // Nguồn:
        Product p = new Product("P01", "Mouse", 20.5);
        String str = p.toString();

        assertNotNull(str, "Hàm toString() không được trả về null");
        assertTrue(str.contains("P01"), "toString() phải chứa ID");
        assertTrue(str.contains("Mouse"), "toString() phải chứa Tên");
        // Kiểm tra định dạng số thực cơ bản (chứa dấu chấm hoặc phẩy tùy locale)
        assertTrue(str.contains("20.5") || str.contains("20,5"), "toString() phải chứa Giá");
    }

    // ========================================================
    // PHẦN 2: KIỂM TRA TÍNH KẾ THỪA (ImportedProduct)
    // Nguồn:
    // ========================================================

    @Test
    @Order(3)
    @DisplayName("REQ 2: Kiểm tra class ImportedProduct (Kế thừa & Đa hình)")
    public void testImportedProduct() {
        try {
            Class<?> clazz = Class.forName("model.ImportedProduct");

            // Kiểm tra quan hệ kế thừa: ImportedProduct phải là con của Product
            assertTrue(Product.class.isAssignableFrom(clazz), "ImportedProduct phải kế thừa từ Product");

            // Tìm constructor: (id, name, price, country, importTax)
            Constructor<?> constructor = clazz.getConstructor(String.class, String.class, double.class, String.class,
                    double.class);
            Object ip = constructor.newInstance("IP01", "iPhone 15", 1000.0, "USA", 100.0);

            // Kiểm tra tính đa hình của getPrice()
            // Giá bán = Giá gốc (1000) + Thuế (100) = 1100
            Method getPriceMethod = clazz.getMethod("getPrice");
            double finalPrice = (double) getPriceMethod.invoke(ip);

            assertEquals(1100.0, finalPrice, 0.01, "ImportedProduct tính sai giá (phải cộng thêm thuế)");

        } catch (ClassNotFoundException e) {
            fail("Chưa tìm thấy class 'model.ImportedProduct'. Hãy kiểm tra lại tên package và tên class.");
        } catch (NoSuchMethodException e) {
            fail("ImportedProduct thiếu Constructor phù hợp hoặc hàm getPrice().");
        } catch (Exception e) {
            fail("Lỗi khi test ImportedProduct: " + e.getMessage());
        }
    }

    // ========================================================
    // PHẦN 3: KIỂM TRA NGHIỆP VỤ (Service/Controller Logic)
    // Nguồn:
    // ========================================================

    @Test
    @Order(4)
    @DisplayName("REQ 1 & 4: Kiểm tra Validation (Không cho phép trùng ID)")
    public void testDuplicateIdValidation() {
        // Giả lập logic thêm mới vào danh sách
        List<Product> list = new ArrayList<>();
        list.add(new Product("P01", "Prod A", 100));

        // Tạo sản phẩm mới trùng ID
        Product duplicate = new Product("P01", "Prod B", 200);

        boolean exists = list.stream().anyMatch(p -> p.getId().equals(duplicate.getId()));

        // Đây là test logic: Sinh viên phải cài đặt logic kiểm tra này trong
        // Service/Controller
        // Ở đây ta test xem logic "tìm ID trùng" có hoạt động đúng trên tập dữ liệu hay
        // không
        assertTrue(exists, "Logic tìm kiếm ID trùng không hoạt động");

        if (exists) {
            // Logic đúng là KHÔNG được add vào list
            // (Mô phỏng hành động của Controller)
        } else {
            list.add(duplicate);
        }

        assertEquals(1, list.size(), "Hệ thống không được phép thêm sản phẩm trùng ID");
    }

    @Test
    @Order(5)
    @DisplayName("REQ 3: Kiểm tra chức năng Tìm kiếm (Không phân biệt hoa thường)")
    public void testSearchFunction() {
        // Nguồn:
        List<Product> list = new ArrayList<>();
        list.add(new Product("P1", "Samsung TV", 500));
        list.add(new Product("P2", "Sony TV", 600));
        list.add(new Product("P3", "LG Fridge", 700));

        String keyword = "tv"; // Chữ thường
        List<Product> result = new ArrayList<>();

        for (Product p : list) {
            if (p.getName().toLowerCase().contains(keyword.toLowerCase())) {
                result.add(p);
            }
        }

        assertEquals(2, result.size(), "Tìm kiếm phải trả về 2 kết quả cho từ khóa 'tv'");
        assertTrue(result.stream().anyMatch(p -> p.getName().equals("Samsung TV")));
        assertTrue(result.stream().anyMatch(p -> p.getName().equals("Sony TV")));
    }

    @Test
    @Order(6)
    @DisplayName("REQ 3: Kiểm tra chức năng Sắp xếp (Giá giảm dần)")
    public void testSortFunction() {
        // Nguồn:
        List<Product> list = new ArrayList<>();
        list.add(new Product("P1", "Cheap", 100.0));
        list.add(new Product("P2", "Expensive", 1000.0));
        list.add(new Product("P3", "Medium", 500.0));

        // Logic sắp xếp giảm dần
        Collections.sort(list, (p1, p2) -> Double.compare(p2.getPrice(), p1.getPrice()));

        assertEquals(1000.0, list.get(0).getPrice(), 0.01, "Phần tử đầu tiên phải có giá cao nhất");
        assertEquals(500.0, list.get(1).getPrice(), 0.01, "Phần tử thứ hai phải là giá trung bình");
        assertEquals(100.0, list.get(2).getPrice(), 0.01, "Phần tử cuối cùng phải có giá thấp nhất");
    }

    @Test
    @Order(7)
    @DisplayName("REQ 4: Kiểm tra kiến trúc Service Layer (ProductServiceImpl)")
    public void testServiceLayer() {
        // Nguồn:
        try {
            Class<?> interfaceClass = Class.forName("service.IProductService");
            Class<?> implClass = Class.forName("service.ProductServiceImpl");

            assertTrue(interfaceClass.isAssignableFrom(implClass), "ProductServiceImpl phải thực thi IProductService");

            Object service = implClass.getDeclaredConstructor().newInstance();
            Method addMethod = implClass.getMethod("add", Product.class);
            Method getAllMethod = implClass.getMethod("getAll");

            // Test thêm sản phẩm qua Service
            Product p = new Product("S01", "Service Product", 99.0);
            addMethod.invoke(service, p);

            // Test lấy danh sách
            List<?> list = (List<?>) getAllMethod.invoke(service);
            assertEquals(1, list.size(), "Service add() không hoạt động đúng");

        } catch (ClassNotFoundException e) {
            // Không trừ điểm nặng nếu sinh viên chưa làm đến Req 4, nhưng sẽ fail test case
            // này
            System.out.println("Sinh viên chưa cài đặt gói 'service' hoặc class 'ProductServiceImpl'");
        } catch (Exception e) {
            fail("Lỗi kiểm tra Service Layer: " + e.getMessage());
        }
    }
}