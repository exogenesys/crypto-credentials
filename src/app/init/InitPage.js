import React from "react";
import { Link } from "react-router-dom";
import Routes from "../routes";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  resetError,
  resetTransaction,
  setError,
  setupTransaction,
} from "./actions";
import { initializeApp } from "./initService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useHistory } from "react-router-dom";
import { useMemo } from "react";

const InitPage = () => {
  const dispatch = useDispatch();
  const { provider, program } = useSelector((store) => store.init);

  useMemo(() => {
    dispatch(initializeApp);
  }, []);

  if (program != null && program != null) {
    const history = useHistory();
    history.push(Routes.dashboard.path);
  }

  return (
    <div>
      <Navbar />
      <section className="hero is-link is-bold is-large">
        <div className="hero-body">
          <p className="title">Please wait</p>
          <p className="subtitle">
            traversing central finit curve
            <span className="icon ml-2">
              <i className="fas fa-cog fa-spin"></i>
            </span>
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default InitPage;
