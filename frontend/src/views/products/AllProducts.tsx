import React, { useEffect } from 'react';
import ItemCard from '../../components/item-card/ItemCard';

import './styles.css';

interface Props { }

interface Product {
  id: number;
  name: string;
  imageURL: string;
  price: number;
}

const AllProducts: React.FC<Props> = () => {
  const [products, setProducts] = React.useState<Product[]>([]);

  useEffect(() => {

    const fetchProducts = async () => {
      const response = await fetch('http://localhost:8080/api/v1/products');
      const data = await response.json();
      setProducts(data.data);
    };


    fetchProducts();


  }, []);

  return (
    <div className="all-products-container">
      {products.map((product: Product) => (<ItemCard key={product.id} item={product} />))}
    </div>
  );
};

export default AllProducts;