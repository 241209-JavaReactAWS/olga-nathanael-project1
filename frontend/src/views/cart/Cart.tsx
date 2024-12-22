import React, { useEffect } from 'react'
import CartItem from "../../components/cart-item/CartItem";
import { useNavigate } from 'react-router-dom';

import './cart.css'
import {postman} from '../../postman'


const Cart: React.FC = () => {

    const [cartItems, setCartItems] = React.useState<{ cartItemId: number, product: { id: number, price: number }, quantity: number }[]>([]);
    const [cartId, setCartId] = React.useState(1);
    const [cartTotal, setCartTotal] = React.useState(0.00);

    const navigate = useNavigate();

    // Call backend to get cart items
    useEffect(() => {

        async function getCart() {
            const response = await fetch('http://localhost:8080/api/v1/carts/users/cart', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
            });

            const data = await response.json();

            if (data) {
                setCartItems(data.cartItems);
                setCartId(data.cartId);
                setCartTotal(data.totalPrice);
            }
        }

        getCart();
    }, []);

    async function handleRemoveItem(productId: number) {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/carts/${cartId}/product/${productId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    },
                })

            if (response.ok) {
                setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
                setCartTotal(prevTotal => prevTotal - (cartItems.find(item => item.product.id === productId)?.product.price || 0) * (cartItems.find(item => item.product.id === productId)?.quantity || 0));
            } else {
                console.log('Item not removed from cart', response);
            }

        } catch (err) {
            console.log(err)
        }
    }

    async function handleUpdateProductQuantity(e: React.ChangeEvent<HTMLSelectElement>, productId: number) {


        const response = await fetch(`http://localhost:8080/api/v1/carts/products/${productId}/quantity/${e.target.value}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            setCartTotal(data.totalPrice);
        }
    }

    function handleContinueShoppingClick() {
        // Redirect to products page
        navigate('/products')
    }

    function handleCheckoutClick() {
        // Redirect to checkout page
        postman.post('/carts/checkout')
            .then(() => navigate('/order-success'))
    }

    return (
        <div>
            <h1 className="cart-title">Cart</h1>

            <section className="basket-container">
                <ul>
                    <li>

                        {cartItems.map((item: any) => (
                            <CartItem key={item.cartItemId} cartItem={item} removeItem={handleRemoveItem} updateItem={handleUpdateProductQuantity} />
                        ))}

                    </li>
                </ul>
            </section>

            <div className="total">
                <h2>Total: ${cartTotal.toFixed(2)}</h2>
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
