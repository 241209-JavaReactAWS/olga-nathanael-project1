import React, { useState } from 'react';
import './cart-item.css';

interface CartItemProps {
    cartItem: {
        product: {
            id: number;
            name: string;
            imageURL: string;
            price: number;
        };
        quantity: number;
    };
    removeItem: (productId: number) => void;
    updateItem: (e: React.ChangeEvent<HTMLSelectElement>, productId: number) => void;
}

const CartItem = ({ cartItem, removeItem, updateItem }: CartItemProps) => {

    const [quantity, setQuantity] = useState(cartItem.quantity);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setQuantity(parseInt(e.target.value));
        updateItem(e, cartItem.product.id);
    }


    return (
        <div>
            <section className="cart-item-container">
                <div>
                    <img
                        src={cartItem.product.imageURL}
                        alt={cartItem.product.name}
                    />
                </div>
                <div className="item-details">
                    <h2 className="item-name">{cartItem.product.name}</h2>
                    <p>QTY.</p>
                    <select
                        className="qty-select"
                        name="quantity"
                        id="quantity"
                        value={quantity}
                        onChange={handleChange}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    <p>${cartItem.product.price}</p>
                </div>
            </section>
            <div
                className="close-button"
                onClick={() => removeItem(cartItem.product.id)}
            >
                <span>&times;</span>
                <button
                    className="remove-btn"
                // onClick={() => removeItem(cartItem.product.id)}
                >
                    Remove
                </button>
            </div>
            <hr className="white-line" />
        </div>
    )
}

export default CartItem