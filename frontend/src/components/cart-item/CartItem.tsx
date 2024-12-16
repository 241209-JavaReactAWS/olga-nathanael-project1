import './cart-item.css';

const CartItem = () => {
    return (
        <div>
            <section className="cart-item-container">
                <div>
                    <img
                        src="https://images.ctfassets.net/lufu0clouua1/Cpno7p5su5gH1hphtMEz5/c6d201efa4cd6794b1ff3cf973719d6f/2024_ultimate-holiday-meal-beauty-shot-NO-PIE.jpg"
                        alt="Item Name"
                        width="300"
                    />
                </div>
                <div className="item-details">
                    <h2 className="item-name">Organic Whole Turkey</h2>
                    <p>QTY.</p>
                    <select className="qty-select" name="" id="">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    <p>$199.99</p>
                </div>
            </section>
            <div className="close-button">
                <span>&times;</span>
                <button className="remove-btn">Remove</button>
            </div>
            <hr className="white-line" />
        </div>
    )
}

export default CartItem