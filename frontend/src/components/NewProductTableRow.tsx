import React, {ChangeEvent, useState} from 'react'
import ProductCardInput from './ProductCardInput'
import ProductCardTextArea from './ProductCardTextArea'
import Button, {ButtonStyle} from './button/Button'
import "./ProductTableRow.css"

interface Props {
    onSave?: () => void,
}

const NewProductTableRow: React.FC<Props> = () => {
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
        console.log(name)
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
