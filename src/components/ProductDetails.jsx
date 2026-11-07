/** This component renders the product details for each products on the app. */

import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ProductCard from "./ProductCard";
import products from "../../lib/products.js";
import {
  FiShoppingBag,
  FiCheck,
  FiMinus,
  FiPlus,
  FiTruck,
  FiRefreshCw,
  FiShield,
  FiChevronRight,
} from "react-icons/fi";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function Stars({ rate }) {
  return (
    <span className="details-stars" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) =>
        rate >= i ? (
          <FaStar key={i} />
        ) : rate >= i - 0.5 ? (
          <FaStarHalfAlt key={i} />
        ) : (
          <FaRegStar key={i} />
        )
      )}
    </span>
  );
}

const perks = [
  { icon: FiTruck, title: "Free delivery", text: "On all orders over €50" },
  { icon: FiRefreshCw, title: "30-day returns", text: "Easy, no-questions returns" },
  { icon: FiShield, title: "Secure checkout", text: "Payments handled by Stripe" },
];

function ProductDetails() {
  const { id } = useParams();
  const { cartItems, addToCart, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = useMemo(
    () => products.find((p) => p.id === Number(id)) ?? null,
    [id]
  );

  // Same-category items first, then fill the row with others.
  const related = useMemo(() => {
    if (!product) return [];
    const others = products.filter((p) => p.id !== product.id);
    const sameCategory = others.filter((p) => p.category === product.category);
    const rest = others.filter((p) => p.category !== product.category);
    return [...sameCategory, ...rest].slice(0, 4);
  }, [product]);

  useEffect(() => {
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 2000);
    return () => clearTimeout(timer);
  }, [added]);

  const handleAdd = () => {
    const existing = cartItems.find((item) => item.id === product.id);
    addToCart(product);
    updateQuantity(product.id, (existing?.quantity ?? 0) + quantity);
    setAdded(true);
  };

  if (!product) {
    return (
      <section className="shop-section">
        <p className="empty-state">No product found</p>
      </section>
    );
  }

  return (
    <div className="details-page">
      <section className="shop-section">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <FiChevronRight />
          <Link to="/#shop">Shop</Link>
          <FiChevronRight />
          <span className="breadcrumb-category">{product.category}</span>
        </nav>

        <div className="details-layout">
          <div className="details-image-wrap">
            <img
              src={product.image}
              alt={product.title}
              className="details-image"
            />
          </div>

          <div className="details-info">
            <p className="product-category">{product.category}</p>
            <h1 className="details-title">{product.title}</h1>

            {product.rating && (
              <div className="details-rating">
                <Stars rate={product.rating.rate} />
                <span className="details-rating-value">
                  {product.rating.rate.toFixed(1)}
                </span>
                <span className="details-rating-count">
                  {product.rating.count} reviews
                </span>
              </div>
            )}

            <p className="details-price">€{product.price.toFixed(2)}</p>
            <p className="details-tax">Tax included. Shipping calculated at checkout.</p>

            <p className="details-description" title={product.description}>
              {product.description}
            </p>

            <div className="details-actions">
              <div className="qty-stepper" role="group" aria-label="Quantity">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                >
                  <FiMinus />
                </button>
                <span aria-live="polite">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                  aria-label="Increase quantity"
                >
                  <FiPlus />
                </button>
              </div>

              <button onClick={handleAdd} className="details-button">
                {added ? <FiCheck /> : <FiShoppingBag />}
                {added ? "Added to cart" : "Add to cart"}
              </button>
            </div>

            <ul className="details-perks">
              {perks.map(({ icon: Icon, title, text }) => (
                <li key={title}>
                  <Icon />
                  <div>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <>
          <section className="shop-section related-section">
            <div className="section-heading">
              <div>
                <p className="hero-eyebrow">More to explore</p>
                <h2>You may also like</h2>
              </div>
              <Link to="/#shop" className="back-link">
                View all products <FiChevronRight />
              </Link>
            </div>
          </section>
          <section className="shop-section product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </section>
        </>
      )}
    </div>
  );
}

export default ProductDetails;
