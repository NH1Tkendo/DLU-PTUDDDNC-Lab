package model;

import vn.edu.dlu.cntt.model.Product;

public class ImportedProduct extends Product {
    private String country;
    private double importTax;

    public ImportedProduct(String id, String name, double price, String country, double importTax) {
        super(id, name, price);
        this.country = country;
        this.importTax = importTax;
    }

    // Hello
    @Override
    public double getPrice() {
        return super.getPrice() + importTax;
    }
}
