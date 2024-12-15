import { useNavigate } from 'react-router-dom';
import './styles.css';

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
    const navigate = useNavigate();

    function handleItemClick() {
        console.log('Item clicked', item.id);
        navigate(`/product/${item.id}`, { state: { product: item } });

    }

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
                        <select className="qty-select" name="" id="">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                        <p>{`$${item.price}`}</p>
                    </div>
                    <button className="add-to-cart-btn">Add to Cart</button>
                </div>
            </section>
        </div>
    )
}

export default ItemCard;