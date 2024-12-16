import React from 'react'
import CartItem from "../../components/cart-item/CartItem";
import { useNavigate } from 'react-router-dom';

import './cart.css'


const Cart: React.FC = () => {

    const navigate = useNavigate();

    // Call backend to get cart items

    function handleContinueShoppingClick() {
        // Redirect to products page
        navigate('/products')
    }

    function handleCheckoutClick() {
        // Redirect to checkout page
        navigate('/order-success')
    }

    return (
        <div>
            <h1 className="cart-title">Cart</h1>

            <section className="basket-container">
                <ul>
                    <li>

                        <CartItem />

                    </li>
                </ul>
            </section>

            <div className="total">
                <h2>Total: $399.98</h2>
            </div>
            <div className="cart-actions">
                <button
                    className="btn-primary"
                    onClick={handleContinueShoppingClick}
                >
                    Continue Shopping
                </button>
                <button
                    className="btn-primary"
                    onClick={handleCheckoutClick}
                >
                    Checkout
                </button>
            </div>

        </div>
    )
}

export default Cart;