/** This component renders the footer for each page on the app. */

import React from "react";

function Footer() {
  return (
    <footer className="text-center py-4 mt-8">
      <p className="text-yellow-400">
        © {new Date().getFullYear()} Another Shop
      </p>
    </footer>
  );
}

export default Footer;
