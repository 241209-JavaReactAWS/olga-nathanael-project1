import React, {ChangeEventHandler} from 'react'
import "./ProductTableInput.css"

interface Props {
    value: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
    placeholder ?: string,
}

const ProductTableInput: React.FC<Props> = ({value, onChange, placeholder = ''}) => {
    return <input className='productTableInput' value={value} onChange={onChange} placeholder={placeholder}/>
}

export default ProductTableInput;
