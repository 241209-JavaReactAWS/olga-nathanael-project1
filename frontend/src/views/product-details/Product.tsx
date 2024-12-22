import React, {useState} from 'react'
import {useLocation} from 'react-router-dom'

import './productDetails.css'
import {useAuth} from '../../hooks/useAuth'
import Snackbar, {SnackbarProps, SnackbarStyle} from '../../components/snackbar/Snackbar'

interface Props { }

interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  imageURL: string;
}

const Product: React.FC<Props> = () => {
  const auth = useAuth();
  const location = useLocation();
  const product = location.state?.product as IProduct;
  const [quantity, setQuantity] = useState(1);
  const [snackbar, setSnackbar] = useState<SnackbarProps>({
    style: SnackbarStyle.SUCCESS,
    message: '',
    open: false,
  });

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

    const response = await fetch(`http://localhost:8080/api/v1/carts/products/${product.id}/quantity/${quantity}`, {
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
    <main>
      <section className="item-details-container">
        <div>
          <img className="item-details-image"
            src={product.imageURL}
            alt={product.name}
          />
        </div>
        <div className="meal-details">
          <h2 className='item-name'>{product.name}</h2>
          <p>QTY.</p>
          <select
            className="qty-select"
            name="quantity"
            id={`quantity-${product.id}`}
            onChange={handleQuantityChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <p>{`$${product.price}`}</p>
          <button
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <div>
            Details:
            <p>{product.description}</p>
          </div>
        </div>
        <Snackbar style={snackbar.style} message={snackbar.message} open={snackbar.open} />
      </section>
    </main>
  );
};

export default Product;
