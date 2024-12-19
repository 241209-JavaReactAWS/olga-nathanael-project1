package com.revature.happyfarmersmarket.controller;

import com.revature.happyfarmersmarket.dao.CartDAO;
import com.revature.happyfarmersmarket.interceptor.UserDetails;
import com.revature.happyfarmersmarket.payload.CartDTO;
import com.revature.happyfarmersmarket.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class CartController {

    @Autowired
    public CartController(CartService cartService,  CartDAO cartDAO) {
        this.cartService = cartService;
    }

    private final CartService cartService;

    @PostMapping("/carts/products/{productId}/quantity/{quantity}")
    public ResponseEntity<CartDTO> addProductToCart(@PathVariable Integer productId,
                                                    @PathVariable Integer quantity,
                                                    @RequestAttribute("userDetails") UserDetails userDetails) {
        CartDTO cartDTO = cartService.addProductToCart(productId, quantity, userDetails);
        return new ResponseEntity<CartDTO>(cartDTO, HttpStatus.CREATED);
    }

    @GetMapping("/carts/users/cart")
    public ResponseEntity<CartDTO> getCartById(@RequestAttribute("userDetails") UserDetails userDetails) {

       CartDTO cartDTO = cartService.getCart(userDetails.getUsername());
       return new ResponseEntity<CartDTO>(cartDTO, HttpStatus.OK);

    }
}
