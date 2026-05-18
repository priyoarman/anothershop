/** This component renders the header for each page on the app. */

import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { IoHome } from "react-icons/io5";
import { RiDiscountPercentFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { IoBagHandleSharp } from "react-icons/io5";

function Header() {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "bg-gray-950";
  });
  const [label, setLabel] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "bg-gray-950" ? "🌙" : "🔆";
  });

  const isDarkMode = theme === "bg-gray-950";

  const toggleTheme = () => {
    setTheme((prev) => (prev === "bg-gray-950" ? "bg-white" : "bg-gray-950"));
    setLabel((prev) => (prev === "🔆" ? "🌙" : "🔆"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  return (
    <header
      className={`sticky top-0 z-50 flex w-full items-center justify-between gap-3 p-3 backdrop-blur shadow-sm transition-colors duration-500 sm:p-4 ${
        isDarkMode
          ? "bg-slate-950/90 text-yellow-300"
          : "bg-white/95 text-yellow-400"
      }`}
    >
      {/* Website Title: Should be centered */}
      <NavLink to="/">
        <h2 className="text-xl font-extrabold sm:text-2xl">AnotherShop</h2>
      </NavLink>
      {/* Navigation and Cart */}
      <nav className="flex shrink-0 items-center gap-2 sm:gap-4">
        <a href="/" className="text-xl hover:scale-115">
          <IoHome />
        </a>
        <Link to={"./Sale"} className="text-xl hover:scale-115">
          <RiDiscountPercentFill />
        </Link>
        <Link to={"./Wishlist"} className="text-xl hover:scale-115">
          <FaHeart />
        </Link>
        <NavLink to="/cart" className="relative">
          <button className="text-yellow-400 py-1 text-xl hover:scale-115 cursor-pointer">
            <IoBagHandleSharp />
          </button>
          {/* Cart Counter */}
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 text-white bg-yellow-500 font-semibold rounded-full text-xs px-1">
              {cartCount}
            </span>
          )}
        </NavLink>
        <button
          className="h-7 rounded-full text-lg font-bold hover:scale-115 cursor-pointer text-yellow-400"
          aria-label="Toggle light/dark theme"
          onClick={toggleTheme}
        >
          {label}
        </button>
      </nav>
    </header>
  );
}

export default Header;
