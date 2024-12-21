import {useCallback, useEffect, useState} from 'react'
import IProduct from '../IProduct'
import {postman} from '../../postman'
import ProductTableRow from '../product-table-row/ProductTableRow'
import NewProductTableRow from '../new-product-table-row/NewProductTableRow'
import Snackbar, {SnackbarStyle} from '../snackbar/Snackbar'
import "./ProductTable.css"

export default function ProductTable() {
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
                setProducts(response.data.data)
            }).catch((error) => {
            console.log(error)
            onError('Something\'s not working right now. Please try again later.')
        })
    }, [setProducts])

    useEffect(() => {
        updateProductsListing()
    }, [updateProductsListing])

    return <>
        <h2>Products</h2>
        <table id="productTable">
            <thead>
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity On Hand</th>
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
    </>
}
