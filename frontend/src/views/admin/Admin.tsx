import './Admin.css'
import {useAuth} from '../../hooks/useAuth'
import ProductTable from '../../components/product-table/ProductTable'

export default function Admin() {
    const auth = useAuth()

    console.log(auth.role)

    return <div id="adminView">
        <h1 id='adminHeader'>Admin Portal</h1>
        {auth.role === 'admin'
            ? <ProductTable />
            : <div id='unauthorizedDiv'>
                <h1>You are not authorized to view this page.</h1>
            </div>
        }
    </div>

}
