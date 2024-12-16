import React, {ChangeEvent, useState} from 'react'
import ProductCardInput from './ProductCardInput'
import ProductCardTextArea from './ProductCardTextArea'
import Button, {ButtonStyle} from './button/Button'
import "./ProductTableRow.css"
import {postman} from '../postman'

interface Props {
    onSave: () => void,
    onSuccess: (message: string) => void,
    onError: (message: string) => void,
}

const NewProductTableRow: React.FC<Props> = ({onSave, onError, onSuccess}) => {
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [quantityOnHand, setQuantityOnHand] = useState<number | null>(null)
    const [imageURL, setImageURL] = useState<string>('')

    const handleQOHChange = (e: ChangeEvent<HTMLInputElement>) => {
        let newQOH = Number(e.target.value)
        if (!isNaN(newQOH)) setQuantityOnHand(newQOH)
    }

    const handleAdd = () => {
        if (name.length === 0) onError('The product name must be provided.')
        else if (description.length === 0) onError('A description must be provided.')
        else if (price.length === 0 || isNaN(Number(price))) onError('A valid price must be provided.')
        else if (quantityOnHand === null) onError('Please provide quantity on hand.')
        else if (imageURL.length === 0) onError('Please provide an image URL.')
        else {
            postman.post('/admin/products', {
                name: name,
                description: description,
                price: Number(price),
                quantityOnHand: quantityOnHand,
                imageURL: imageURL
            }).then(() => {
                // clear all fields
                setName('')
                setDescription('')
                setPrice('')
                setQuantityOnHand(null)
                setImageURL('')

                // update products listing
                onSuccess('Product added successfully!')
                onSave()
            }).catch((error) => {
                if (error.response && error.response.status === 500) onError('An internal server error occurred adding this product. Please try again.')
                else onError('An unknown error occurred adding this product. Please try again.')
            })
        }
    }

    return <tr>
        <td>
            <div className="tableInputContainer">
                <ProductCardInput placeholder='Image URL' value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
            </div>
        </td>
        <td>
            <div className="tableInputContainer">
                <ProductCardInput placeholder='Product Name' value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
        </td>
        <td>
            <div className="tableTextAreaContainer">
                <ProductCardTextArea placeholder='A brief description...' value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
        </td>
        <td>
            <div className="tableInputContainer">
                <ProductCardInput placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)}/>
            </div>
        </td>
        <td>
            <div className="tableInputContainer">
                <ProductCardInput placeholder='Quantity On Hand' value={quantityOnHand ? quantityOnHand.toString() : ''} onChange={handleQOHChange}/>
            </div>
        </td>
        <td>
            <div className="productOptions">
                <Button style={ButtonStyle.PRIMARY} onClick={handleAdd}>Add</Button>
            </div>
        </td>
    </tr>
}

export default NewProductTableRow;
