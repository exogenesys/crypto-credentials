import React from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AuthRedirect() {
  return (
    <div>
      <Navbar />
      <section className="hero is-primary is-bold is-large">
        <div className="hero-body">
          <h1 className="title is-1">
            Welcome To{" "}
            <span className=" is-underlined">Crypto Credentials</span> 🎓
          </h1>
          <p className="subtitle">
            platform for educators to give credentials to their students
            on-chain
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
