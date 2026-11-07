/** This component renders the footer for each page on the app. */

import React from "react";

function Footer() {
  return (
    <footer className="site-footer" id="about">
      <p>© {new Date().getFullYear()} Another Shop</p>
    </footer>
  );
}

export default Footer;
