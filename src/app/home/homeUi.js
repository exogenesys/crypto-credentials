import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector, useStore } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import { Close } from "@material-ui/icons";

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
          <p className="subtitle">Link subtitle</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
