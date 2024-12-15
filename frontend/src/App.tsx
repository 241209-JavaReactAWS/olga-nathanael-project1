import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Product from './views/product-details/Product';
import Registration from './views/Registration';
import Header from './components/header/Header'
import Login from './views/login/Login'
import { AuthProvider } from './hooks/AuthProvider'
import AllProducts from './views/products/AllProducts';

function App() {
    return (
        <AuthProvider>
            <div id="App">
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/" element={<AllProducts />} />
                        <Route path="/register" element={<Registration />} />
                        <Route path="/product/:id" element={<Product />} />
                        <Route path="/products" element={<AllProducts />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </Router>
            </div>
        </AuthProvider>
    );
}

export default App;
