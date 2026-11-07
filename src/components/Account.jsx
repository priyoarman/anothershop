/** This component renders the account page, where shoppers save their details for checkout. */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiCheck,
  FiChevronRight,
  FiMessageCircle,
  FiShoppingBag,
  FiUser,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import {
  EMPTY_PROFILE,
  clearProfile,
  loadProfile,
  saveProfile,
} from "../profile";

const FIELDS = [
  { name: "name", label: "Full name", autoComplete: "name", wide: true },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  {
    name: "address",
    label: "Street address",
    autoComplete: "street-address",
    wide: true,
  },
  { name: "city", label: "City", autoComplete: "address-level2" },
  { name: "postalCode", label: "Postal code", autoComplete: "postal-code" },
  { name: "country", label: "Country", autoComplete: "country-name", wide: true },
];

function Account() {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [profile, setProfile] = useState(loadProfile);
  const [status, setStatus] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setStatus("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = Object.fromEntries(
      Object.entries(profile).map(([key, value]) => [key, value.trim()]),
    );
    setProfile(trimmed);
    setStatus(
      saveProfile(trimmed)
        ? "saved"
        : "Your browser blocked saving. Details will be lost on reload.",
    );
  };

  const handleClear = () => {
    clearProfile();
    setProfile({ ...EMPTY_PROFILE });
    setStatus("cleared");
  };

  const greeting = profile.name ? `Hi, ${profile.name.split(" ")[0]}` : "Your account";

  return (
    <div className="details-page">
      <section className="shop-section">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <FiChevronRight />
          <span className="breadcrumb-category">Account</span>
        </nav>

        <div className="section-heading cart-heading">
          <div>
            <p className="hero-eyebrow">Account</p>
            <h1>{greeting}</h1>
          </div>
          <p>
            Save your details here. Your email is filled in for you at checkout.
            Everything stays in this browser.
          </p>
        </div>

        <div className="cart-layout">
          <form className="account-form" onSubmit={handleSubmit}>
            <h2>
              <FiUser aria-hidden="true" /> Contact &amp; shipping
            </h2>
            <div className="account-fields">
              {FIELDS.map(({ name, label, type = "text", autoComplete, wide }) => (
                <label
                  key={name}
                  className={`account-field${wide ? " is-wide" : ""}`}
                >
                  <span>{label}</span>
                  <input
                    type={type}
                    name={name}
                    autoComplete={autoComplete}
                    value={profile[name]}
                    onChange={handleChange}
                    className="search-input"
                  />
                </label>
              ))}
            </div>
            <div className="account-actions">
              <button type="submit" className="details-button">
                Save details
              </button>
              <button
                type="button"
                className="account-clear"
                onClick={handleClear}
              >
                Clear saved details
              </button>
            </div>
            <p className="account-status" role="status">
              {status === "saved" && (
                <>
                  <FiCheck aria-hidden="true" /> Details saved
                </>
              )}
              {status === "cleared" && "Saved details cleared"}
              {status && status !== "saved" && status !== "cleared" && status}
            </p>
          </form>

          <aside className="cart-summary account-links">
            <h2>Quick links</h2>
            <Link to="/cart">
              <FiShoppingBag aria-hidden="true" />
              <span>
                Your cart
                <small>
                  {cartCount === 0
                    ? "Empty"
                    : `${cartCount} ${cartCount === 1 ? "item" : "items"}`}
                </small>
              </span>
              <FiChevronRight aria-hidden="true" />
            </Link>
            <Link to="/chat">
              <FiMessageCircle aria-hidden="true" />
              <span>
                Help &amp; support
                <small>Ask the shopping assistant</small>
              </span>
              <FiChevronRight aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default Account;
