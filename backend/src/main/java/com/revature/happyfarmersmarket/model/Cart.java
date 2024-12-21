package com.revature.happyfarmersmarket.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "carts")
@NoArgsConstructor
@AllArgsConstructor
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cartId;

    @ToString.Exclude
    @OneToOne
    @JoinColumn(name = "username")
    private User user;

    @ToString.Exclude
    @OneToMany(mappedBy = "cart", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, orphanRemoval = true)
    private List<CartItem> cartItems = new ArrayList<>();

    @Transient
    private Double totalPrice = 0.0;

    public Double getTotalPrice() {
        return cartItems.stream().mapToDouble((item) -> item.getProduct().getPrice() * item.getQuantity()).sum();
    }

    private void setTotalPrice(Double price) {
        this.totalPrice = price;
    }
}
