package com.revature.happyfarmersmarket.controller;

import com.revature.happyfarmersmarket.dao.CartDAO;
import com.revature.happyfarmersmarket.interceptor.AuthUtil;
import com.revature.happyfarmersmarket.model.Cart;
import com.revature.happyfarmersmarket.payload.CartDTO;
import com.revature.happyfarmersmarket.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class CartController {

    @Autowired
    private CartService cartService;
    @Autowired
    private AuthUtil authUtil;
    @Autowired
    private CartDAO cartDAO;

    @PostMapping("/carts/products/{productId}/quantity/{quantity}")
    public ResponseEntity<CartDTO> addProductToCart(@PathVariable Integer productId,
                                                    @PathVariable Integer quantity) {
        CartDTO cartDTO = cartService.addProductToCart(productId, quantity);
        return new ResponseEntity<CartDTO>(cartDTO, HttpStatus.CREATED);
    }

    @GetMapping("/carts/users/cart")
    public ResponseEntity<CartDTO> getCartById() {
        String username = AuthUtil.loggedUser().getUsername();
        Cart cart = cartDAO.findCartByUsername(username);
        Integer cartId = cart.getCartId();
       CartDTO cartDTO = cartService.getCart(username, cartId);
       return new ResponseEntity<CartDTO>(cartDTO, HttpStatus.OK);

    }
}
