/** This component renders the search bar and category dropdown for filtering products. */

import products from "../../lib/products.js";

const categories = [...new Set(products.map((p) => p.category))].sort();

const toLabel = (category) =>
  category.replace(/(^|\s)\S/g, (c) => c.toUpperCase());

function Filters({
  searchInput,
  setSearchInput,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search the collection"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="search-input"
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="category-select"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {toLabel(category)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filters;
