import controller.ProductController;
import view.ProductView;

public class Main {
    public static void main(String[] args) {
        ProductView view = new ProductView();
        ProductController controller = new ProductController(view);
        controller.run();
    }
}
