package com.revature.happyfarmersmarket.dao;

import com.revature.happyfarmersmarket.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDAO extends JpaRepository<Product, Integer> {

}
