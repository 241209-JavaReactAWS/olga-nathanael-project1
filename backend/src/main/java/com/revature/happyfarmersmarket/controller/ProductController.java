package com.revature.happyfarmersmarket.controller;

import com.revature.happyfarmersmarket.exception.ProductException;
import com.revature.happyfarmersmarket.model.Product;
import com.revature.happyfarmersmarket.payload.ProductResponse;
import com.revature.happyfarmersmarket.service.ProductService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class ProductController {
    private static final Logger logger = LogManager.getLogger();
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
    public ResponseEntity<ProductResponse> getAllProducts() {
        ProductResponse productResponse = productService.getAllProducts();
        return new ResponseEntity<>(productResponse,HttpStatus.OK);
    }

    @PutMapping("/admin/products")
    public ResponseEntity<?> updateProduct(@RequestBody Product product) {
        logger.info("Request received to update product: {}", product);
        try {
            Product createdProduct = this.productService.updateProduct(product);
            if (createdProduct == null) return ResponseEntity.internalServerError().build();
            else return ResponseEntity.ok(createdProduct);
        } catch (ProductException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/admin/products/{id}")
    public ResponseEntity<Product> deleteProduct(@PathVariable Integer id) {
        Product product = this.productService.deleteProduct(id);
        if (product == null) return ResponseEntity.notFound().build();
        else return ResponseEntity.ok(product);
    }
}
