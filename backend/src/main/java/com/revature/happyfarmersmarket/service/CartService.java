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
import com.revature.happyfarmersmarket.payload.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;

import java.util.List;
import java.util.stream.Stream;
import org.modelmapper.ModelMapper;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Service
public class CartService {

    @Autowired
    public CartService(CartDAO cartDAO, ProductDAO productDAO, CartItemDAO cartItemDAO, UserService userService, UserDAO userDAO, StandardServletMultipartResolver standardServletMultipartResolver, ModelMapper modelMapper) {
        this.cartDAO = cartDAO;
        this.productDAO = productDAO;
        this.cartItemDAO = cartItemDAO;
        this.userDAO = userDAO;
        this.modelMapper = modelMapper;
    }

    private static final Logger logger = LogManager.getLogger();

    private final CartDAO cartDAO;

    private final ProductDAO productDAO;

    private final CartItemDAO cartItemDAO;

    private final UserDAO userDAO;

    private final ModelMapper modelMapper;

    public CartDTO addProductToCart(Integer productId, Integer quantity, UserDetails userDetails ) {
       Cart cart = createCart(userDetails);

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
       newCartItem.setProductPrice(product.getPrice());

       cartItemDAO.save(newCartItem);

       product.setQuantityOnHand(product.getQuantityOnHand());

       cart.setTotalPrice(cart.getTotalPrice() + (product.getPrice() * quantity));

       cartDAO.save(cart);

       CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
       List<CartItem> cartItems = cart.getCartItems();

       Stream<ProductDTO> productStream = cartItems.stream().map(item -> {
           ProductDTO map = modelMapper.map(item.getProduct(), ProductDTO.class);
           map.getQuantityOnHand();
           return map;
       });

       cartDTO.setProducts(productStream.toList());

       return cartDTO;


   }

    private Cart createCart(UserDetails userDetails) {

       logger.info("User details: {}", userDetails);
        Cart userCart = cartDAO.findCartByUsername(userDetails.getUsername());
        System.out.println("User cart: " + userCart);

        User user = userDAO.findById(userDetails.getUsername()).orElse(null);

        if (userCart != null) {
            System.out.println("User cart found");
            return userCart; // Return existing cart if it exists
        }

        System.out.println("User cart not found");

        // Create a new cart and associate it with the logged-in user
        Cart cart = new Cart();
        cart.setTotalPrice(0.00); // Default value for a new cart
        cart.setUser(user);  // Associate with logged user

        // Save the newly created cart to the database
        return cartDAO.save(cart);
    }

    public CartDTO getCart(String username) {

        Cart cart = cartDAO.findCartByUsername(username);

        Integer cartId = cart.getCartId();

        if (cart == null) {
            throw new ResourceNotFoundException("Cart", "cartId", cartId);
        }

        CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);

        cart.getCartItems().forEach(c -> c.getProduct().setQuantityOnHand(c.getQuantity()));

        List<ProductDTO> products = cart.getCartItems().stream()
                .map(p -> modelMapper.map(p.getProduct(), ProductDTO.class))
                .toList();

        cartDTO.setProducts(products);

        return cartDTO;



    }


}
