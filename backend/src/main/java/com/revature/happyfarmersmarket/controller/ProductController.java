package com.revature.happyfarmersmarket.controller;

import com.revature.happyfarmersmarket.exception.ProductException;
import com.revature.happyfarmersmarket.model.Product;
import com.revature.happyfarmersmarket.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/admin/products")
    public ResponseEntity<?> createNewProduct(@RequestBody Product product) {
        try {
            Product createdProduct = this.productService.createProduct(product);
            if (createdProduct == null) return ResponseEntity.internalServerError().build();
            else return ResponseEntity.status(201).body(createdProduct);
        } catch (ProductException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Integer id) {
        Product product = this.productService.getProduct(id);
        if (product == null) return ResponseEntity.notFound().build();
        else return ResponseEntity.ok(product);
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(this.productService.getAllProducts());
    }

    @PutMapping("/admin/products")
    public ResponseEntity<?> updateProduct(@RequestBody Product product) {
        try {
            Product createdProduct = this.productService.updateProduct(product);
            if (createdProduct == null) return ResponseEntity.internalServerError().build();
            else return ResponseEntity.status(201).body(createdProduct);
        } catch (ProductException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Product> deleteProduct(@PathVariable Integer id) {
        Product product = this.productService.deleteProduct(id);
        if (product == null) return ResponseEntity.notFound().build();
        else return ResponseEntity.ok(product);
    }
}
