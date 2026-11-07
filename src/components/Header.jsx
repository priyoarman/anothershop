/** This component renders the header for each page on the app. */

import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FiMenu, FiSearch, FiShoppingBag, FiUser, FiX } from "react-icons/fi";

function Header() {
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
          <NavLink to="/" end>
            Home
          </NavLink>
          <a href="#shop">Shop</a>
          <Link to="/sale">Collections</Link>
          <a href="#about">About us</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button" aria-label="Search">
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
            to="/chat"
            className="icon-button desktop-only"
            aria-label="Account"
          >
            <FiUser />
          </Link>
          <button
            className="theme-toggle"
            aria-label="Toggle light/dark theme"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? "Night" : "Day"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
