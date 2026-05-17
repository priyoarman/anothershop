import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/HomePage";
import ProductDetails from "./components/ProductDetails";
import ShoppingCart from "./components/ShoppingCart";
import CheckoutCancel from "./components/CheckoutCancel";
import CheckoutSuccess from "./components/CheckoutSuccess";
import Sale from "./components/Sale";
import Chatbot from "./components/Chatbot";

function App() {
  // State for managing search and category filters
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  // State for the cart
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        {/* Header Component with Cart Count */}
        <Header cartCount={cart.length} />

        <main className="flex-1">
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
            {/* <Route path="/wishlist" element={<Wishlist />} /> */}
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            <Route path="/checkout/cancel" element={<CheckoutCancel />} />
          </Routes>
        </main>

        <Footer />
      </div>
      <Chatbot />
    </BrowserRouter>
  );
}

export default App;
