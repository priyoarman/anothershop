/** This component renders the search bar and category dropdown for filtering products. */

function Filters({
  searchInput,
  setSearchInput,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="filters mb-4 flex w-full flex-col gap-3 px-3 sm:mb-6 sm:flex-row sm:justify-center sm:gap-6 sm:px-0">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="w-full rounded border border-gray-300 bg-slate-50 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 sm:w-auto"
      />

      {/* Category Dropdown */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full rounded border border-gray-300 bg-slate-50 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 sm:w-auto"
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
