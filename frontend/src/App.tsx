import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Product from './views/product-details/Product';
import Registration from './views/Registration';
import Header from './components/header/Header'
import Login from './views/login/Login'
import Admin from './views/admin/Admin'
import { AuthProvider } from './hooks/AuthProvider'
import AllProducts from './views/products/AllProducts';
import Cart from './views/cart/Cart';
import OrderSuccess from './views/order-success/OrderSuccess';
import Navbar from './components/navbar/Navbar'
import ForgotPassword from './views/forgot-password/ForgotPassword'

function App() {
    return (
        <AuthProvider>
            <div id="App">
                <Header />
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<AllProducts />} />
                        <Route path="/register" element={<Registration />} />
                        <Route path="/product/:id" element={<Product />} />
                        <Route path="/products" element={<AllProducts />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/order-success" element={<OrderSuccess />} />
                        <Route path='/forgot-password' element={<ForgotPassword />} />
                    </Routes>
                </Router>
            </div>
        </AuthProvider>
    );
}

export default App;
