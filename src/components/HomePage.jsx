/** This component renders the main page (HomePage) for the app. */

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Filters from "./Filters";
import HeroSlider from "./HeroSlider";

function HomePage({
  searchInput,
  setSearchInput,
  selectedCategory,
  setSelectedCategory,
  setCart,
}) {
  // State for storing products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from the Fake Store API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    }

    fetchProducts();
  }, []); // Empty dependency array to ensure the fetch runs once

  // Function to add a product to the cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Filter products based on search term and selected category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-dvh w-full overflow-x-hidden pb-6">
      <HeroSlider />
      <section className="shop-section" id="shop">
        <div className="section-heading">
          <div>
            <p className="hero-eyebrow">Curated for your home</p>
            <h1>Find your new favorite piece</h1>
          </div>
          <p>
            Quietly confident furniture and objects that bring a little more
            feeling to the rooms you live in.
          </p>
        </div>
        <Filters
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </section>
      <section className="shop-section product-grid">
        {loading ? (
          <p className="empty-state">Loading products...</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={handleAddToCart}
            />
          ))
        )}
      </section>
    </main>
  );
}

export default HomePage;
