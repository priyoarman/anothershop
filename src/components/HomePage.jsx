/** This component renders the main page (HomePage) for the app. */

import ProductCard from "./ProductCard";
import Filters from "./Filters";
import HeroSlider from "./HeroSlider";
import products from "../../lib/products.js";

function HomePage({
  searchInput,
  setSearchInput,
  selectedCategory,
  setSelectedCategory,
  setCart,
}) {
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
        {filteredProducts.length === 0 ? (
          <p className="empty-state">No products match your search.</p>
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
