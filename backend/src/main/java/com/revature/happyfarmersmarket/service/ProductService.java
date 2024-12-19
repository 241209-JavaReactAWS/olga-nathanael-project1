package com.revature.happyfarmersmarket.service;

import com.revature.happyfarmersmarket.dao.ProductDAO;
import com.revature.happyfarmersmarket.exception.ProductException;
import com.revature.happyfarmersmarket.model.Product;
import com.revature.happyfarmersmarket.payload.ProductDTO;
import com.revature.happyfarmersmarket.payload.ProductResponse;
import lombok.NonNull;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {
    private final ProductDAO productDAO;
    private final ModelMapper modelMapper;

    @Autowired
    public ProductService(ProductDAO productDAO, ModelMapper modelMapper) {
        this.productDAO = productDAO;
        this.modelMapper = modelMapper;
    }

    public Product createProduct(Product product) throws ProductException {
        validateProduct(product);

        return this.productDAO.save(product);
    }

    public ProductResponse getAllProducts() {
        List<Product> products = productDAO.findAll();
        List<ProductDTO> productDTOS = products.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .toList();

        ProductResponse productResponse = new ProductResponse();
        productResponse.setData( productDTOS);

        return productResponse;
    }

    public Product getProduct(@NonNull Integer id) {
        return this.productDAO.findById(id).orElse(null);
    }

    public Product updateProduct(Product product) throws ProductException {
        validateProduct(product);
        return this.productDAO.save(product);
    }

    public Product deleteProduct(@NonNull Integer id) {
        Optional<Product> productToDelete = this.productDAO.findById(id);
        if (productToDelete.isPresent()) this.productDAO.deleteById(id);
        return productToDelete.orElse(null);
    }

    private void validateProduct(Product product) throws ProductException {
        if (product.getName() == null || product.getName().isBlank())
            throw new ProductException("Product name must not be empty.");
        if (product.getDescription() == null || product.getDescription().isBlank())
            throw new ProductException("Product description must not be empty.");
        if (product.getPrice() < 0.00) throw new ProductException("Product price must be non-negative.");
        if (product.getQuantityOnHand() < 0) throw new ProductException("Quantity on Hand must be non-negative");
    }

}
