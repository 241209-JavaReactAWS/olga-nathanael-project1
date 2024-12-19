package com.revature.happyfarmersmarket.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemsDTO {
    private int cartItemId;
    private ProductDTO product;
    private Integer quantity;
}
