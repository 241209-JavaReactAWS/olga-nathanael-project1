package com.revature.happyfarmersmarket.dao;

import com.revature.happyfarmersmarket.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemDAO extends JpaRepository<CartItem, Integer> {
    @Query("SELECT ci FROM CartItem ci WHERE ci.cart.cartId = ?1 AND ci.product.id = ?2")
    CartItem findCartItemByProductIdAndCartId(Integer cartId, Integer productId);

    @Modifying
    @Query("DELETE FROM CartItem ci WHERE ci.cart.cartId = ?1 AND ci.product.id = ?2")
    void deleteCartItemByProductIdAndCartId(Integer cartId, Integer productId);
}
