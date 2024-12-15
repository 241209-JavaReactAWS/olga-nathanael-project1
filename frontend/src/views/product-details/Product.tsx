import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

import './productDetails.css';

interface Props { }

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageURL: string;
}

const Product: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>();

  console.log('id', id);

  const location = useLocation();
  const product = location.state?.product as Product;

  return (
    <main>
      <section className="item-details-container">
        <div>
          <img
            src={product.imageURL}
            alt={product.name}

            width="300"
          />
        </div>
        <div className="meal-details">
          <h2 className='item-name'>Organic Whole Turkey</h2>
          <p>QTY.</p>
          <select className="qty-select" name="" id="">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <p>{`$${product.price}`}</p>
          <button>Add to Cart</button>
          <p>Details</p>
          <p>
            Description: {product.description}
          </p>
        </div>
      </section>
    </main>
  );
};

export default Product;