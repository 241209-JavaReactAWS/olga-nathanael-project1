package com.revature.happyfarmersmarket.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {

    private int id;
    private String name;
    private String description;
    private double price;
    private int quantityOnHand;
    private String imageURL;

}
