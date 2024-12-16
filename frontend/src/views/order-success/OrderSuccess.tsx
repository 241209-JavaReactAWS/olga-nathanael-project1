import './order-success.css'

// @ts-ignore
import produceImg from '../../images/produce.png';

const OrderSuccess: React.FC = () => {
    return (
        <div className="success-container" style={{ backgroundImage: `url(${produceImg})` }}>
            <div className="custom-heading" >
                <h1>
                    THANK YOU

                </h1>
                <p>FOR YOUR ORDER!</p>

            </div>

        </div>
    )
}

export default OrderSuccess