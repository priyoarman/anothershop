/** This component renders the product card for the home page on the app. */

import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { IoCart } from "react-icons/io5";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <Link to={`/products/${product.id}`}>
      <div className="product-card group flex aspect-[3/4] w-full flex-col overflow-hidden rounded-lg border border-transparent bg-orange-50 shadow-md transition-colors duration-500 hover:shadow-lg">
        {/* Product Image */}
        <div className="relative h-52 w-full overflow-hidden bg-slate-100 flex-shrink-0">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full min-h-full min-w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col p-4">
          <div className="min-h-[5rem]">
            {/* Product Title */}
            <h3 className="text-lg font-semibold text-yellow-900 transition-colors duration-300 product-card-title">
              {product.title}
            </h3>
          </div>

          <div className="mt-auto grid w-full grid-cols-2">
            <div className="flex h-8 items-center justify-center bg-gray-600 text-sm font-semibold text-orange-300 shadow-sm transition-colors duration-500 product-card-price">
              €{product.price}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
                alert(`${product.title} added to Cart`);
              }}
              className="flex h-8 items-center justify-center border border-yellow-700 bg-yellow-700 text-sm font-semibold text-white transition-colors duration-300 hover:bg-yellow-600 cursor-pointer"
            >
              <div className="flex items-center gap-1">
                <IoCart />
                Add to Cart
              </div>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
