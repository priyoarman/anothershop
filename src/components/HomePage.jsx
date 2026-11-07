/** This component renders the main page (HomePage) for the app. */

import { useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import Filters from "./Filters";
import HeroSlider from "./HeroSlider";
import products from "../../lib/products.js";

const PRODUCTS_PER_PAGE = 20;

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

  // Current page lives in the URL (?page=2) so back/forward and shared links work.
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  );
  const requestedPage = Number.parseInt(searchParams.get("page"), 10) || 1;
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages);
  const pageProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const goToPage = (page) => {
    setSearchParams((params) => {
      if (page <= 1) params.delete("page");
      else params.set("page", String(page));
      return params;
    });
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  };

  // Changing the search or category starts again from page 1.
  const resetPage = () =>
    setSearchParams(
      (params) => {
        params.delete("page");
        return params;
      },
      { replace: true }
    );
  const handleSearchChange = (value) => {
    setSearchInput(value);
    resetPage();
  };
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    resetPage();
  };

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
          setSearchInput={handleSearchChange}
          selectedCategory={selectedCategory}
          setSelectedCategory={handleCategoryChange}
        />
      </section>
      <section className="shop-section product-grid">
        {filteredProducts.length === 0 ? (
          <p className="empty-state">No products match your search.</p>
        ) : (
          pageProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={handleAddToCart}
            />
          ))
        )}
      </section>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
    </main>
  );
}

export default HomePage;
