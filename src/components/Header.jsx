/** This component renders the header for each page on the app. */

import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  FiMenu,
  FiMoon,
  FiSearch,
  FiShoppingBag,
  FiSun,
  FiUser,
  FiX,
} from "react-icons/fi";

// Store departments shown in the header. Each one filters the shop grid by category.
const DEPARTMENTS = [
  { label: "Women", category: "women's clothing" },
  { label: "Men", category: "men's clothing" },
  { label: "Electronics", category: "electronics" },
  { label: "Home & Kitchen", category: "home & kitchen" },
  { label: "Beauty", category: "beauty" },
];

function Header({ selectedCategory, setSelectedCategory }) {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const onCartPage = location.pathname === "/cart";

  // On the cart page, the cart icon acts as a toggle back to where the user came from.
  // "default" key means /cart was the first page loaded, so there is no in-app page to return to.
  const handleCartClick = (e) => {
    if (!onCartPage) return;
    e.preventDefault();
    if (location.key !== "default") navigate(-1);
    else navigate("/");
  };

  // Jump to the search box above the product grid, from any page.
  const handleSearchClick = () => {
    setMenuOpen(false);
    if (location.pathname !== "/") navigate("/");
    // Wait a tick so the home page has rendered before scrolling.
    setTimeout(() => {
      const input = document.getElementById("product-search");
      if (!input) return;
      input.scrollIntoView({ behavior: "smooth", block: "center" });
      input.focus({ preventScroll: true });
    }, 0);
  };

  // Open the shop grid filtered to a department, from any page.
  const handleDepartmentClick = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category);
    setMenuOpen(false);
    navigate("/");
    // Wait a tick so the home page has rendered before scrolling to the grid.
    setTimeout(() => {
      document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <button
          className="mobile-menu"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
        <NavLink to="/" className="brand-mark">
          Another<span>Shop</span>
        </NavLink>
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`}>
          {DEPARTMENTS.map(({ label, category }) => (
            <Link
              key={category}
              to="/"
              onClick={(e) => handleDepartmentClick(e, category)}
              className={
                location.pathname === "/" && selectedCategory === category
                  ? "active"
                  : undefined
              }
            >
              {label}
            </Link>
          ))}
          <Link
            to="/account"
            className={`nav-account${location.pathname === "/account" ? " active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            Account
          </Link>
        </nav>
        <div className="header-actions">
          <button
            className="icon-button desktop-only"
            aria-label="Search products"
            onClick={handleSearchClick}
          >
            <FiSearch />
          </button>
          <Link
            to="/cart"
            onClick={handleCartClick}
            className={`icon-button cart-button${onCartPage ? " is-active" : ""}`}
            aria-label={onCartPage ? "Close cart" : "Shopping cart"}
          >
            <FiShoppingBag />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
          <Link
            to="/account"
            className={`icon-button desktop-only${location.pathname === "/account" ? " is-active" : ""}`}
            aria-label="Account"
          >
            <FiUser />
          </Link>
          <button
            className="theme-toggle"
            aria-label={
              theme === "light" ? "Switch to dark theme" : "Switch to light theme"
            }
            title={theme === "light" ? "Dark theme" : "Light theme"}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <FiMoon /> : <FiSun />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
