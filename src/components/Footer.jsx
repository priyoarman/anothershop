/** This component renders the footer for each page on the app. */

import React from "react";

const AUTHOR_URL = "https://github.com/priyoarman";
const SOURCE_URL = "https://github.com/priyoarman/anothershop";
const STACK = ["React", "Vite", "Groq", "Stripe", "DummyJSON", "Vercel"];

function Footer() {
  return (
    <footer className="site-footer" id="about">
      <p className="footer-about">
        Another Shop is an online storefront with an AI shopping assistant,
        built by{" "}
        <a href={AUTHOR_URL} target="_blank" rel="noreferrer">
          Arman Hossain
        </a>
        .
      </p>
      <p className="footer-meta">
        © {new Date().getFullYear()} Arman Hossain ·{" "}
        <a href={SOURCE_URL} target="_blank" rel="noreferrer">
          Source code on GitHub
        </a>
      </p>
      <p className="footer-label">Built with</p>
      <ul className="footer-stack">
        {STACK.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </footer>
  );
}

export default Footer;
