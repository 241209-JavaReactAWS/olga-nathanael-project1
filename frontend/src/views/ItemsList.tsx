import React from 'react';
import ItemCard from '../components/item-card/ItemCard';

interface Props { }

const ItemsList: React.FC<Props> = () => {
  return (
    <div>
      <h1>Product List</h1>
      <ItemCard />
    </div>
  );
};

export default ItemsList;