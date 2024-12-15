import React, {ChangeEvent, useState} from 'react'
import ProductCardInput from './ProductCardInput'
import ProductCardTextArea from './ProductCardTextArea'
import Button, {ButtonStyle} from './Button'
import IProduct from './IProduct'
import "./ProductCard.css"

interface ProductCardProps {
    product: IProduct,
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [name, setName] = useState<string>(product.name)
    const [description, setDescription] = useState<string>(product.description)
    const [price, setPrice] = useState<string>(product.price.toFixed(2))
    const [quantityOnHand, setQuantityOnHand] = useState<number>(product.quantityOnHand)

    const handleQOHChange = (e: ChangeEvent<HTMLInputElement>) => {
        let newQOH = Number(e.target.value)
        if (!isNaN(newQOH)) setQuantityOnHand(newQOH)
    }

    const handleUpdate = () => {
        console.log(name)
    }

    const handleDelete = () => {

    }

    return <div className='productCard'>
        <div className='productImage'>
            <img src={product.imageURL} height={128} width={128} alt={product.name}/>
        </div>
        <div className="productData">
            <h4>Name</h4>
            <ProductCardInput value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
            <h4>Description</h4>
            <ProductCardTextArea value={description}
                                 onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}/>
            <div className='productData2'>
                <div>
                    <h4>Price</h4>
                    <ProductCardInput value={price.toString()}
                                      onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}/>
                </div>
                <div>
                    <h4>Quantity on Hand</h4>
                    <ProductCardInput value={quantityOnHand.toString()} onChange={handleQOHChange}/>
                </div>
            </div>
        </div>
        <div className='productOptions'>
            <div>
                <Button style={ButtonStyle.SECONDARY} onClick={handleUpdate}>Update</Button>
                <Button style={ButtonStyle.DANGER} onClick={handleDelete}>Delete</Button>
            </div>
        </div>
    </div>
}

export default ProductCard;
