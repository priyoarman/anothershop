/** This component renders the product card for the home page on the app. */

import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { IoCart } from "react-icons/io5";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <Link to={`/products/${product.id}`}>
      <div className="product-card p-4 bg-orange-50 shadow-md rounded-lg flex flex-col items-center h-full hover:shadow-lg transition-colors duration-500">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover object-top mb-4 transform hover:scale-105 transition duration-300"
        />

        <div className="p-4 flex flex-col flex-grow">
          {/* Product Title */}
          <h3 className="text-lg font-semibold text-yellow-900 hover:text-pink-800 transition duration-300 product-card-title">
            {product.title}
          </h3>

          {/* Product Price */}
          <p className="text-yellow-700 font-semibold mb-8 product-card-price">€{product.price}</p>
        </div>
        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
            alert(`${product.title} added to Cart`);
          }}
          className="mt-4 bg-yellow-700 text-white py-2 px-3 rounded hover:bg-yellow-600 transition duration-300 cursor-pointer"
        >
          {" "}
          <div className="flex flex-row justify-center items-center">
            <IoCart className="mr-2" /> Add to Cart
          </div>
        </button>
      </div>
    </Link>
  );
}

export default ProductCard;
