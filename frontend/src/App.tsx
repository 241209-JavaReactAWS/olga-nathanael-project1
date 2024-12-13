import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Product from './views/Product';
import Registration from './views/Registration';
import AllProducts from './views/AllProducts';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>header</h1>
      </header>

      <Router>
        <Routes>
          <Route path="/" element={<AllProducts />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/product" element={<Product />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
