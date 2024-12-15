import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Product from './views/Product';
import Registration from './views/Registration';
import Header from './components/header/Header'
import Login from './views/login/Login'
import {AuthProvider} from './hooks/AuthProvider'
import ItemsList from './views/ItemsList';

function App() {
  return (
      <AuthProvider>
          <div id="App">
              <Router>
                  <Header/>
                  <Routes>
                      <Route path="/" element={<ItemsList />} />
                      <Route path="/register" element={<Registration/>}/>
                      <Route path="/product" element={<Product/>}/>
                      <Route path="/products" element={<ItemsList />} />
                      <Route path="/login" element={<Login/>}/>
                  </Routes>
              </Router>
          </div>
      </AuthProvider>
  );
}

export default App;
