import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  function toggleBurgerMenu() {
    document.querySelector(".navbar-menu").classList.toggle("is-active");
  }
  return (
    <nav className="navbar is-transparent">
      <div className="navbar-brand">
        <Link class="navbar-item" to="/">
          <span className="has-text-weight-bold has-text-black">
            🎓 CryptoCredentials
          </span>
        </Link>
        <button
          className="navbar-burger"
          data-target="navbarExampleTransparentExample"
          onClick={toggleBurgerMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div id="navbarExampleTransparentExample" className="navbar-menu">
        <div className="navbar-start"></div>

        <div className="navbar-end">
          <div className="navbar-item">
            <Link className="button is-rounded is-black" to="/login">
              <span className="icon">
                <i className="fas fa-university"></i>
              </span>
              <span>University Login</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
