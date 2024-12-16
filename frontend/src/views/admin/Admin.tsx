import React, {useCallback, useEffect, useState} from 'react'
import IProduct from '../../components/IProduct'
import './Admin.css'
import ProductTableRow from '../../components/ProductTableRow'
import NewProductTableRow from '../../components/NewProductTableRow'
import {postman} from '../../postman'

// @ts-ignore
import warningImg from "../../images/warning.png"

interface Props {
}

const Admin: React.FC<Props> = () => {
    const [products, setProducts] = useState<Array<IProduct>>([])
    const [error, setError] = useState<string | null>(null)
    // @ts-ignore
    const [success, setSuccess] = useState<string | null>(null)

    const updateProductsListing = useCallback(() => {
        postman.get('/products')
            .then((response) => {
                setProducts(response.data)
            }).catch((error) => {
            console.log(error)
        })
    }, [setProducts])

    useEffect(() => {
        updateProductsListing()
    }, [updateProductsListing])

    const onError = (message: string) => {
        setError(message)
        setTimeout(() => setError(null), 5000)
    }

    const onSuccess = (message: string) => {
        setSuccess(message)
        setTimeout(() => setSuccess(null), 5000)
    }

    return <div id='adminView'>
        <h1>Admin</h1>
        <h2>Products</h2>
        <table id="productTable">
            <thead>
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Quantity On Hand</th>
                <th>Price</th>
                <th>Options</th>
            </tr>
            </thead>
            <tbody>
            {products.map((product) => <ProductTableRow product={product} key={product.id} onSuccess={onSuccess}
                                                        onError={onError}/>)}
            <tr>
                <td>
                    <div>
                        <h3 style={{paddingLeft: '10px'}}>Add new product...</h3>
                    </div>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <NewProductTableRow onSave={updateProductsListing} onSuccess={onSuccess} onError={onError}/>
            </tbody>
        </table>
        {error && <div id='warningDiv'>
            <p>{error}</p>
        </div>}
        {success && <div id='successDiv'>
            <p>{success}</p>
        </div>}
    </div>

}

export default Admin
