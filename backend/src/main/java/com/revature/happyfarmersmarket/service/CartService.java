package com.revature.happyfarmersmarket.service;

import com.revature.happyfarmersmarket.dao.CartDAO;
import com.revature.happyfarmersmarket.dao.CartItemDAO;
import com.revature.happyfarmersmarket.dao.ProductDAO;
import com.revature.happyfarmersmarket.dao.UserDAO;
import com.revature.happyfarmersmarket.exception.APIException;
import com.revature.happyfarmersmarket.exception.ResourceNotFoundException;
import com.revature.happyfarmersmarket.interceptor.UserDetails;
import com.revature.happyfarmersmarket.model.Cart;
import com.revature.happyfarmersmarket.model.CartItem;
import com.revature.happyfarmersmarket.model.Product;
import com.revature.happyfarmersmarket.model.User;
import com.revature.happyfarmersmarket.payload.CartDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.modelmapper.ModelMapper;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.List;

@Service
public class CartService {
    private static final Logger logger = LogManager.getLogger();

    private final CartDAO cartDAO;
    private final ProductDAO productDAO;
    private final CartItemDAO cartItemDAO;
    private final UserDAO userDAO;
    private final ModelMapper modelMapper;

    @Autowired
    public CartService(CartDAO cartDAO, ProductDAO productDAO, CartItemDAO cartItemDAO, UserDAO userDAO, ModelMapper modelMapper) {
        this.cartDAO = cartDAO;
        this.productDAO = productDAO;
        this.cartItemDAO = cartItemDAO;
        this.userDAO = userDAO;
        this.modelMapper = modelMapper;
    }

    @Transactional
    public CartDTO addProductToCart(Integer productId, Integer quantity, UserDetails userDetails ) {
        logger.info("Adding product with id `{}` to user `{}`'s cart. Quantity: {}", productId, userDetails.getUsername(), quantity);
        Cart cart = createCart(userDetails.getUsername());

        Product product = productDAO.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        CartItem cartItem = cartItemDAO.findCartItemByProductIdAndCartId(cart.getCartId(), productId);

        if (cartItem != null) {
            throw new APIException("Product " + product.getName() + "already exists in the cart");
        }

        if (product.getQuantityOnHand() < quantity) {
            throw new APIException("Only " + product.getQuantityOnHand() + " left in stock.");
        }

        if (product.getQuantityOnHand() == 0) {
            throw new APIException("SOLD OUT");
        }

        CartItem newCartItem = new CartItem();

        newCartItem.setCart(cart);
        newCartItem.setProduct(product);
        newCartItem.setQuantity(quantity);

        cartItemDAO.save(newCartItem);
        cartDAO.save(cart);

       Cart updatedCart = cartDAO.findCartByUsername(cart.getUser().getUsername());

       return modelMapper.map(updatedCart, CartDTO.class);
   }

    public Cart createCart(String username) {
        logger.info("Finding cart for user: {}", username);
        Cart userCart = cartDAO.findCartByUsername(username);
        System.out.println("User cart: " + userCart);

        User user = userDAO.findById(username).orElse(null);

        if (userCart != null) {
            logger.info("User cart found");
            return userCart; // Return existing cart if it exists
        }

        logger.info("User cart not found. Creating new cart...");

        // Create a new cart and associate it with the logged-in user
        Cart cart = new Cart();
        cart.setUser(user);  // Associate with logged user

        // Save the newly created cart to the database
        return cartDAO.save(cart);
    }

    public CartDTO getCart(String username) {
        logger.info("Getting cart for user: {}", username);
        Cart cart = cartDAO.findCartByUsername(username);

        if (cart == null) {
            throw new ResourceNotFoundException("Cart", "username", username);
        }

        return modelMapper.map(cart, CartDTO.class);
    }


    public CartDTO updateProductQuantityInCart(Integer productId, Integer quantity, UserDetails userDetails) {

        Cart cart = cartDAO.findCartByUsername(userDetails.getUsername());

        Integer cartId = cart.getCartId();

        Product product = productDAO.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        if (product.getQuantityOnHand() == 0) {
            throw new APIException(product.getName() + "is not available");
        }

        if ( product.getQuantityOnHand() < quantity ) {
            throw new APIException("Only " + product.getQuantityOnHand() + " items available");
        }

        CartItem cartItem = cartItemDAO.findCartItemByProductIdAndCartId(cartId, productId);

        cartItem.setQuantity(quantity);

        cartDAO.save(cart);

        cartItemDAO.save(cartItem);

        return modelMapper.map(cart, CartDTO.class);

    }

    @Transactional
    public String deleteProductFromCart(Integer cartId, Integer productId) {

        CartItem cartItem = cartItemDAO.findCartItemByProductIdAndCartId(cartId, productId);

        if (cartItem == null) {
            throw new ResourceNotFoundException("Product", "productId", productId);
        }

        cartItemDAO.deleteCartItemByProductIdAndCartId(cartId, productId);

        return "Product " + cartItem.getProduct().getName() + " removed from the cart.";

    }

    @Transactional
    public void checkout(String username) {
        logger.info("Removing all items from cart.");
        Cart cart = this.cartDAO.findCartByUsername(username);
        List<CartItem> cartItems = cart.getCartItems();
        cartItems.forEach((cartItem) -> this.deleteProductFromCart(cart.getCartId(), cartItem.getProduct().getId()));
    }
}
