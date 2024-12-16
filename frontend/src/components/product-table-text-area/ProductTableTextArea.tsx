import React, {ChangeEventHandler} from 'react'
import "./ProductTableTextArea.css"

interface Props {
    value: string,
    onChange: ChangeEventHandler<HTMLTextAreaElement>,
    placeholder ?: string,
}

const ProductTableTextArea: React.FC<Props> = ({value, onChange, placeholder = ''}) => {
    return <textarea className='productTableTextArea' value={value} onChange={onChange} placeholder={placeholder} />
}

export default ProductTableTextArea;
