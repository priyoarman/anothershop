/** This component renders the search bar and category dropdown for filtering products. */

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
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
      </select>
    </div>
  );
}

export default Filters;
