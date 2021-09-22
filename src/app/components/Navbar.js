import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import Routes from "../routes";

export default function Navbar() {
  function toggleBurgerMenu() {
    document.querySelector(".navbar-menu").classList.toggle("is-active");
  }
  return (
    <nav className="navbar is-transparent">
      <div className="navbar-brand">
        <Link class="navbar-item" to={Routes.home.path}>
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
            <LoginButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
