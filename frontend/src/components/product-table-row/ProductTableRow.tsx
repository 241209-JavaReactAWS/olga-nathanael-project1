import React, {ChangeEvent, useState} from 'react'
import IProduct from '../IProduct'
import ProductTableInput from '../product-table-input/ProductTableInput'
import ProductTableTextArea from '../product-table-text-area/ProductTableTextArea'
import Button, {ButtonStyle} from "../button/Button"
import "./ProductTableRow.css"
import {postman} from '../../postman'

interface Props {
    product: IProduct,
    onSuccess: (message: string) => void,
    onError: (message: string) => void,
}

const ProductTableRow: React.FC<Props> = ({product, onSuccess, onError}) => {
    const [name, setName] = useState<string>(product.name)
    const [description, setDescription] = useState<string>(product.description)
    const [price, setPrice] = useState<string>(product.price.toFixed(2))
    const [quantityOnHand, setQuantityOnHand] = useState<number>(product.quantityOnHand)

    const handleQOHChange = (e: ChangeEvent<HTMLInputElement>) => {
        let newQOH = Number(e.target.value)
        if (!isNaN(newQOH)) setQuantityOnHand(newQOH)
    }

    const handleUpdate = () => {
        if (name.length === 0) onError('The product name must be provided.')
        else if (description.length === 0) onError('A description must be provided.')
        else if (price.length === 0 || isNaN(Number(price))) onError('A valid price must be provided.')
        else if (quantityOnHand === null) onError('Please provide quantity on hand.')
        else {
            postman.put('/admin/products', {
                id: product.id,
                name: name,
                description: description,
                price: Number(price),
                quantityOnHand: quantityOnHand,
                imageURL: product.imageURL
            }).then(() => onSuccess('Product updated successfully!'))
                .catch(() => onError('Unable to update product.'))
        }
    }

    const handleDelete = () => {
        postman.delete(`/admin/products/${product.id}`)
            .then(() => onSuccess('Product deleted successfully!'))
            .catch(() => onError('Unable to delete product.'))
    }

    return <tr>
        <td>
            <div className="productImageContainer">
                <img src={product.imageURL} alt={name} width={128} height={128}/>
            </div>
        </td>
        <td>
            <div className="tableInputContainer">
                <ProductTableInput value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
        </td>
        <td>
            <div className="tableTextAreaContainer">
                <ProductTableTextArea value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
        </td>
        <td>
            <div className="tableInputContainer">
                <ProductTableInput value={price} onChange={(e) => setPrice(e.target.value)}/>
            </div>
        </td>
        <td>
            <div className="tableInputContainer">
                <ProductTableInput value={quantityOnHand.toString()} onChange={handleQOHChange}/>
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
