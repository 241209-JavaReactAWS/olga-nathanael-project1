import React, {ChangeEvent, useState} from 'react'
import IProduct from './IProduct'
import ProductCardInput from './ProductCardInput'
import ProductCardTextArea from './ProductCardTextArea'
import Button, {ButtonStyle} from './Button'
import "./ProductTableRow.css"

interface Props {
    product: IProduct,
}

const ProductTableRow: React.FC<Props> = ({product}) => {
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

    return <tr>
        <td>
            <div className="productImageContainer">
                <img src={product.imageURL} alt={name} width={128} height={128}/>
            </div>
        </td>
        <td>
            <div className="tableInputContainer">
                <ProductCardInput value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
        </td>
        <td>
            <div className="tableTextAreaContainer">
                <ProductCardTextArea value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
        </td>
        <td>
            <div className="tableInputContainer">
                <ProductCardInput value={price} onChange={(e) => setPrice(e.target.value)}/>
            </div>
        </td>
        <td>
            <div className="tableInputContainer">
                <ProductCardInput value={quantityOnHand.toString()} onChange={handleQOHChange}/>
            </div>
        </td>
        <td>
            <div className="productOptions">
                <Button style={ButtonStyle.SECONDARY} onClick={handleUpdate}>Update</Button>
                <Button style={ButtonStyle.DANGER} onClick={handleDelete}>Delete</Button>
            </div>
        </td>
    </tr>
}

export default ProductTableRow;
