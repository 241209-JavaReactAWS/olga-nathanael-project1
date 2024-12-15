import React, {useEffect, useState} from 'react'
import IProduct from '../../components/IProduct'
import ProductCard from '../../components/ProductCard'
import "./Admin.css"

interface Props {}

const Admin: React.FC<Props> = () => {
    const [products, setProducts] = useState<Array<IProduct>>([])

    useEffect(() => {
        // postman.get('/products')
        //     .then((response) => {
        //         setProducts(response.data)
        //     }).catch((error) => {
        //         console.log(error)
        // })
        setProducts([
            {
                id: 1,
                name: 'Kelloggs Corn Flakes',
                description: 'Made from toasted corn, this classic breakfast cereal is a delicious and nutritious way to fuel your morning. High in vitamins and minerals, it\'s perfect with milk or as a crunchy topping for yogurt.',
                price: 2.99,
                quantityOnHand: 10,
                imageURL: 'https://i5.walmartimages.com/asr/cd45facd-db37-4ca7-a0a7-14f36d1b57e6.f951c0d77e2953dc9a97690256461bfb.jpeg'
            }, {
                id: 2,
                name: 'Goya Extra Virgin Olive Oil',
                description: 'Elevate your cooking with Goya Extra Virgin Olive Oil, crafted from the finest olives. This premium, cold-pressed oil offers a rich, smooth flavor, ideal for drizzling, sautéing, or dressing salads. Packed with heart-healthy fats, it\'s a versatile kitchen essential.',
                price: 10.99,
                quantityOnHand: 15,
                imageURL: 'https://cdnimg.webstaurantstore.com/images/products/large/611156/2189145.jpg',
            }, {
                id: 3,
                name: 'Garelick Farms Whole Milk',
                description: 'Garelick Farms Whole Milk delivers rich, creamy flavor in every glass. Sourced from local farms, it\'s packed with essential vitamins and nutrients like calcium and vitamin D, making it perfect for drinking, cooking, or baking. Enjoy the wholesome goodness in every sip.',
                price: 3.99,
                quantityOnHand: 8,
                imageURL: 'https://pics.walgreens.com/prodimg/646740/900.jpg'
            }
        ])
    }, [])

    return <>
        <h1>Admin</h1>
        <div className='productsListing'>
            {products.map((product) => <ProductCard product={product} key={product.id} />)}
        </div>
    </>
}

export default Admin;
