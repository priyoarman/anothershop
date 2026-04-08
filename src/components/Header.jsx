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
      className={`sticky top-0 z-50 p-4 flex justify-between items-center backdrop-blur shadow-sm transition-colors duration-500 ${
        isDarkMode
          ? "bg-slate-950/95 text-yellow-500"
          : "bg-white/95 text-yellow-600"
      }`}
    >
      {/* Website Title: Should be centered */}
      <NavLink to="/">
        <h2 className="text-2xl font-extrabold">AnotherShop</h2>
      </NavLink>
      {/* Navigation and Cart */}
      <nav className="flex items-center space-x-4">
        <a href="/" className="text-xl hover:scale-115">
          <IoHome />
        </a>
        <Link to={"./Sale"} className="text-xl hover:scale-115">
          <RiDiscountPercentFill />
        </Link>
        <div className="flex items-center">
          <button className="pr-2 text-xl hover:scale-115 cursor-pointer">
            <FaHeart />
          </button>
          <NavLink to="/cart" className="relative">
            <button className="text-orange-500 p-1 text-xl hover:scale-115 cursor-pointer">
              <IoBagHandleSharp />
            </button>
            {/* Cart Counter */}
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-white bg-orange-500 font-semibold rounded-full text-xs px-1">
                {cartCount}
              </span>
            )}
          </NavLink>
          <button
            className="h-7 rounded-xl text-lg ml-2 font-bold hover:scale-115 cursor-pointer bg-amber-700 px-1.5 text-white"
            aria-label="Toggle light/dark theme"
            onClick={toggleTheme}
          >
            {label}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
