import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import Snackbar, {SnackbarProps, SnackbarStyle} from '../snackbar/Snackbar'
import {useAuth} from '../../hooks/useAuth'

interface Props {
    item: Item;
}

interface Item {
    id: number;
    name: string;
    imageURL: string;
    price: number;
}

const ItemCard: React.FC<Props> = ({ item }) => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [snackbar, setSnackbar] = useState<SnackbarProps>({
        style: SnackbarStyle.SUCCESS,
        message: '',
        open: false,
    });

    function handleItemClick() {
        navigate(`/product/${item.id}`, { state: { product: item } });

    }

    async function handleAddToCart() {
        if (!auth.isAuthenticated) {
            setSnackbar({
                style: SnackbarStyle.WARNING,
                message: 'You must be signed in to perform this action!',
                open: true
            });

            setTimeout(() => setSnackbar(prev => {
                return {...prev, open: false}
            }), 5000);

            return;
        }

        const response = await fetch(`http://localhost:8080/api/v1/carts/products/${item.id}/quantity/${quantity}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            },
        });

        const data = await response.json();
        console.log('Add to cart response', data);
    }

    const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setQuantity(parseInt(e.target.value));
    };

    return (
        <div>
            <section className="item-card-container">
                <div>
                    <img className="item-image"
                        src={item.imageURL}
                        alt={item.name}
                        onClick={handleItemClick}
                    />
                </div>
                <div className="item-details">
                    <h2 className="item-name">{item.name}</h2>
                    <div className="price-container">
                        <select
                            className="qty-select"
                            name="quantity"
                            id={`quantity-${item.id}`}
                            onChange={handleQuantityChange}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                        <p>{`$${item.price}`}</p>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="add-to-cart-btn">
                        Add to Cart
                    </button>
                </div>
            </section>
            <Snackbar style={snackbar.style} message={snackbar.message} open={snackbar.open} />
        </div>
    )
}

export default ItemCard;
