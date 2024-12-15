import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Product from './views/Product';
import Registration from './views/Registration';
import ItemsList from './views/ItemsList';

function App() {
  return (
    <div className="App">
      <header className="">
      </header>

      <Router>
        <Routes>
          <Route path="/" element={<ItemsList />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/product" element={<Product />} />
          <Route path="/products" element={<ItemsList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
