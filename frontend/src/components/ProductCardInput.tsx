import React, {ChangeEventHandler} from 'react'
import "./ProductCardInput.css"

interface Props {
    value: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
    placeholder ?: string,
}

const ProductCardInput: React.FC<Props> = ({value, onChange, placeholder = ''}) => {
    return <input className='productCardInput' value={value} onChange={onChange} placeholder={placeholder}/>
}

export default ProductCardInput;
