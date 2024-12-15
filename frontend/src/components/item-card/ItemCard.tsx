// import React from 'react'
import './styles.css';

const ItemCard: React.FC = () => {

    function handleItemClick() {
        console.log('Item clicked');
    }

    return (
        <div className="list-container">
            <section className="item-details-container">
                <div>
                    <img
                        src="https://images.ctfassets.net/lufu0clouua1/Cpno7p5su5gH1hphtMEz5/c6d201efa4cd6794b1ff3cf973719d6f/2024_ultimate-holiday-meal-beauty-shot-NO-PIE.jpg"
                        alt="Item Name"
                        width="250"
                        onClick={handleItemClick}
                    />
                </div>
                <div className="meal-details">
                    <h2>Organic Whole Turkey</h2>
                    <select className="qty-select" name="" id="">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    <p>$199.99</p>
                    <button>Add to Cart</button>
                </div>
            </section>

            <section className="item-details-container">
                <div>
                    <img
                        src="https://images.ctfassets.net/lufu0clouua1/Cpno7p5su5gH1hphtMEz5/c6d201efa4cd6794b1ff3cf973719d6f/2024_ultimate-holiday-meal-beauty-shot-NO-PIE.jpg"
                        alt="Item Name"
                        width="250"
                    />
                </div>
                <div className="meal-details">
                    <h2>Organic Whole Turkey</h2>
                    <select className="qty-select" name="" id="">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    <p>$199.99</p>
                    <button>Add to Cart</button>
                </div>
            </section>
        </div>
    )
}

export default ItemCard;