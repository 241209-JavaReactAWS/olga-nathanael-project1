import React, {ChangeEventHandler} from 'react'
import "./ProductCardTextArea.css"

interface Props {
    value: string,
    onChange: ChangeEventHandler<HTMLTextAreaElement>,
    placeholder ?: string,
}

const ProductCardTextArea: React.FC<Props> = ({value, onChange, placeholder = ''}) => {
    return <textarea className='productCardTextArea' value={value} onChange={onChange} placeholder={placeholder} />
}

export default ProductCardTextArea;
