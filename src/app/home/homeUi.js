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
      <div className="container">
        <section className="section">
          <h1 className="title">
            {" "}
            Welcome to{" "}
            <a href="https://credentials.online">Credentials.Online!</a>
          </h1>
          <h2 className="subtitle">
            Get started by editing <code>pages/index.js</code>
          </h2>
        </section>
      </div>
      <Footer />
    </div>
  );
}
