import React, {ChangeEventHandler} from 'react'
import "./ProductCardTextArea.css"

interface Props {
    value: string,
    onChange: ChangeEventHandler<HTMLTextAreaElement>,
}

const ProductCardTextArea: React.FC<Props> = ({value, onChange}) => {
    return <textarea className='productCardTextArea' value={value} onChange={onChange} />
}

export default ProductCardTextArea;
