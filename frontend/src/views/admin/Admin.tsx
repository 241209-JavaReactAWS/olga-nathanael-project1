import React, {useCallback, useEffect, useState} from 'react'
import IProduct from '../../components/IProduct'
import './Admin.css'
import ProductTableRow from '../../components/product-table-row/ProductTableRow'
import NewProductTableRow from '../../components/new-product-table-row/NewProductTableRow'
import {postman} from '../../postman'
import Snackbar, {SnackbarStyle} from '../../components/snackbar/Snackbar'

interface Props {
}

const Admin: React.FC<Props> = () => {
    const [products, setProducts] = useState<Array<IProduct>>([])
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')

    const onError = (message: string) => {
        setError(message)
        setTimeout(() => setError(''), 5000)
    }

    const onSuccess = (message: string) => {
        setSuccess(message)
        updateProductsListing()
        setTimeout(() => setSuccess(''), 5000)
    }

    const updateProductsListing = useCallback(() => {
        postman.get('/products')
            .then((response) => {
                setProducts(response.data)
            }).catch((error) => {
            console.log(error)
            onError('Something\'s not working right now. Please try again later.')
        })
    }, [setProducts])

    useEffect(() => {
        updateProductsListing()
    }, [updateProductsListing])

    return <div id="adminView">
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
            <NewProductTableRow onSuccess={onSuccess} onError={onError}/>
            </tbody>
        </table>
        <Snackbar open={Boolean(error)} style={SnackbarStyle.ERROR} message={error}/>
        <Snackbar open={Boolean(success)} style={SnackbarStyle.SUCCESS} message={success}/>
    </div>

}

export default Admin
