import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/HomePage";
import ProductDetails from "./components/ProductDetails";
import ShoppingCart from "./components/ShoppingCart";
import Sale from "./components/Sale";

function App() {
  // State for managing search and category filters
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  // State for the cart
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>
      {/* Header Component with Cart Count */}
      <Header cartCount={cart.length} />

      {/* define app routes */}
      <Routes>
        {/* home page: shows Main (product list) */}
        <Route
          path="/"
          element={
            <Main
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              setCart={setCart}
            />
          }
        />

        {/* product details page */}
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/cart" element={<ShoppingCart />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
