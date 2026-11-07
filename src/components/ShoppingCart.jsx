/** This component renders the shopping cart for the app. */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  FiArrowLeft,
  FiChevronRight,
  FiLock,
  FiMinus,
  FiPlus,
  FiRefreshCw,
  FiShoppingBag,
  FiTrash2,
  FiX,
} from "react-icons/fi";

const MAX_QTY = 99;

const formatPrice = (value) => `€${value.toFixed(2)}`;

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [checkoutError, setCheckoutError] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const setQty = (id, qty) =>
    updateQuantity(id, Math.min(MAX_QTY, Math.max(1, qty)));

  const handleCheckout = async () => {
    setCheckoutError("");
    setIsCheckingOut(true);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await response.json()
        : {};

      if (!response.ok) {
        throw new Error(data.error || "Unable to start checkout.");
      }

      if (!data.url) {
        throw new Error("Checkout URL was not returned.");
      }

      window.location.href = data.url;
    } catch (error) {
      setCheckoutError(error.message || "Unable to start checkout.");
      setIsCheckingOut(false);
    }
  };

  const breadcrumb = (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      <FiChevronRight />
      <span className="breadcrumb-category">Cart</span>
    </nav>
  );

  if (cartItems.length === 0) {
    return (
      <div className="details-page">
        <section className="shop-section">
          {breadcrumb}
          <div className="cart-empty">
            <span className="cart-empty-icon" aria-hidden="true">
              <FiShoppingBag />
            </span>
            <p className="hero-eyebrow">Your bag</p>
            <h1>Your cart is empty</h1>
            <p>
              Looks like you haven&apos;t added anything yet. Explore the
              collection and find something you love.
            </p>
            <Link to="/" className="details-button cart-empty-cta">
              Start shopping
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="details-page">
      <section className="shop-section">
        {breadcrumb}

        <div className="section-heading cart-heading">
          <div>
            <p className="hero-eyebrow">Your bag</p>
          </div>
          <p>
            {itemCount} {itemCount === 1 ? "item" : "items"} ready for checkout
          </p>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            <div className="cart-items-head" aria-hidden="true">
              <span>Product</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>

            <ul className="cart-list">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <Link
                    to={`/products/${item.id}`}
                    className="cart-item-image-wrap"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="cart-item-image"
                    />
                  </Link>

                  <div className="cart-item-info">
                    {item.category && (
                      <p className="product-category">{item.category}</p>
                    )}
                    <Link
                      to={`/products/${item.id}`}
                      className="cart-item-title"
                      title={item.title}
                    >
                      {item.title}
                    </Link>
                    <p className="cart-item-unit">
                      {formatPrice(item.price)} each
                    </p>
                  </div>

                  <div
                    className="qty-stepper cart-qty"
                    role="group"
                    aria-label={`Quantity for ${item.title}`}
                  >
                    <button
                      type="button"
                      onClick={() => setQty(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                      disabled={item.quantity <= 1}
                    >
                      <FiMinus />
                    </button>
                    <span aria-live="polite">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQty(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                      disabled={item.quantity >= MAX_QTY}
                    >
                      <FiPlus />
                    </button>
                  </div>

                  <p className="cart-item-total">
                    {formatPrice(item.price * item.quantity)}
                  </p>

                  <button
                    type="button"
                    className="cart-remove"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.title} from cart`}
                  >
                    <FiX />
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-items-foot">
              <Link to="/" className="back-link">
                <FiArrowLeft /> Continue shopping
              </Link>
              <button type="button" className="back-link" onClick={clearCart}>
                <FiTrash2 /> Clear cart
              </button>
            </div>
          </div>

          <aside className="cart-summary" aria-label="Order summary">
            <h2>Order summary</h2>

            <dl className="cart-summary-rows">
              <div>
                <dt>
                  Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                </dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div>
                <dt>Shipping</dt>
                <dd className="cart-free">Free</dd>
              </div>
            </dl>

            <div className="cart-summary-total">
              <span>Total</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <p className="details-tax">Tax included.</p>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="details-button cart-checkout"
            >
              <FiLock />
              {isCheckingOut ? "Redirecting to checkout…" : "Secure checkout"}
            </button>

            {checkoutError && (
              <p className="cart-error" role="alert">
                {checkoutError}
              </p>
            )}

            <ul className="cart-assurances">
              <li>
                <FiRefreshCw /> 30-day easy returns
              </li>
              <li>
                <FiLock /> Payments handled securely by Stripe
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default ShoppingCart;
