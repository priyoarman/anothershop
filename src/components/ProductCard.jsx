/** This component renders the product card for the home page on the app. */

import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FiArrowUpRight, FiShoppingBag } from "react-icons/fi";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <Link to={`/products/${product.id}`} className="product-card-link">
      <div className="product-card group">
        <div className="product-image-wrap">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="add-button"
            aria-label={`Add ${product.title} to cart`}
          >
            <FiShoppingBag />
          </button>
        </div>

        <div className="product-info">
          <p className="product-category">{product.category}</p>
          <h3 className="product-card-title" title={product.title}>
            {product.title}
          </h3>
          <div className="product-bottom">
            <span className="product-card-price">€{product.price}</span>
            <span className="product-action">
              <FiArrowUpRight />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
