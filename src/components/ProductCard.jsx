/** This component renders the product card for the home page on the app. */

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FiArrowUpRight, FiCheck, FiShoppingBag } from "react-icons/fi";

const ADDED_FEEDBACK_MS = 1600;

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const resetTimer = useRef(null);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setAdded(false), ADDED_FEEDBACK_MS);
  };

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
            onClick={handleAdd}
            className={`add-button${added ? " is-added" : ""}`}
            aria-label={
              added
                ? `${product.title} added to cart`
                : `Add ${product.title} to cart`
            }
          >
            {added ? <FiCheck /> : <FiShoppingBag />}
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
