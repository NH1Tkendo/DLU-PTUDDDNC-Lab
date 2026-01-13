package service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import vn.edu.dlu.cntt.model.Product;

public class ProductServiceImpl implements IProductService {
    private List<Product> listProducts = new ArrayList<>();
    private final String FILE_NAME = "products.dat";

    public ProductServiceImpl() {
        loadDataFromFile();
    }

    @Override
    public void add(Product p) {
        for (Product existing : listProducts) {
            if (existing.getId().equals(p.getId())) {
                return;
            }
        }

        saveDataToFile();
        listProducts.add(p);
    }

    @Override
    public List<Product> getAll() {
        return listProducts;
    }

    @Override
    public List<Product> search(String name) {
        return listProducts.stream()
                .filter(p -> p.getName().toLowerCase().contains(name.toLowerCase()))
                .collect(Collectors.toList());
    }

    @SuppressWarnings("unchecked")
    private void loadDataFromFile() {
        File file = new File(FILE_NAME);
        // Nếu file chưa tồn tại (lần đầu chạy) thì thôi, không đọc
        if (!file.exists()) {
            return;
        }

        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(file))) {
            // Ép kiểu Object đọc được về List<Product>
            listProducts = (List<Product>) ois.readObject();
        } catch (IOException | ClassNotFoundException e) {
            System.out.println("Lỗi khi đọc file: " + e.getMessage());
            // Nếu file lỗi, khởi tạo list rỗng để chương trình không crash
            listProducts = new ArrayList<>();
        }
    }

    private void saveDataToFile() {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(FILE_NAME))) {
            oos.writeObject(listProducts);
        } catch (IOException e) {
            System.out.println("Lỗi khi ghi file: " + e.getMessage());
        }
    }
}
