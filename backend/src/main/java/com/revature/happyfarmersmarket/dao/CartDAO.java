package com.revature.happyfarmersmarket.dao;

import com.revature.happyfarmersmarket.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CartDAO extends JpaRepository<Cart, Integer> {


    @Query("SELECT c FROM Cart c WHERE c.user.username = ?1")
    Cart findCartByUsername(String username);

    @Query("SELECT c FROM Cart c WHERE c.user.username = ?1 AND c.cartId = ?2")
    Cart findCartByUsernameAndCartId(String username, Integer cartId);
}
