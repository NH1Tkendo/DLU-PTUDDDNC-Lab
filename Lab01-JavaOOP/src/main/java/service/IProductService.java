package service;

import java.util.List;

import vn.edu.dlu.cntt.model.Product;

public interface IProductService {
    // Thêm sản phẩm
    void add(Product p);

    // Lấy toàn bộ danh sách sản phẩm
    List<Product> getAll();

    // Tìm kiếm sản phẩm theo tên (trả về danh sách các sản phẩm tìm thấy)
    List<Product> search(String name);
}
