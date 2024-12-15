import React, {ChangeEventHandler} from 'react'
import "./ProductCardInput.css"

interface Props {
    value: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
}

const ProductCardInput: React.FC<Props> = ({value, onChange}) => {
    return <input className='productCardInput' value={value} onChange={onChange} />
}

export default ProductCardInput;
