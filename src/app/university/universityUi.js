import React from "react";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  resetError,
  resetTransaction,
  setError,
  setupTransaction,
} from "./actions";
import {
  doTransfer,
  requestAirdropAndNotify,
  getBalanceOfWallet,
  initProgramFromIdl,
} from "./universityService";
import { Close, ErrorOutline } from "@material-ui/icons";
import { PublicKey } from "@solana/web3.js";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useHistory } from "react-router-dom";
import { useMemo } from "react";

const UniversityPage = () => {
  const isConnected = useSelector((store) => store.auth.is_connected);
  const { balance, numberOfCourses, numberOfStudents, numberOfCredentials } =
    useSelector((store) => store.university);

  if (!isConnected) {
    let history = useHistory();
    history.push("/login");
  }
  const publicKey = useSelector((store) => store.auth.wallet._publicKey);
  const dispatch = useDispatch();
  useMemo(() => {
    dispatch(getBalanceOfWallet);
    dispatch(initProgramFromIdl);
  }, [balance]);
  return (
    <div>
      <Navbar />
      <section className="hero is-danger">
        <div className="hero-body">
          <p className="title">Dashboard</p>
          <p className="subtitle">{publicKey.toString()}</p>
        </div>
      </section>
      <section className="py-1">
        <nav className="navbar">
          <div className="navbar-item">
            <button
              className="button is-success is-light"
              onClick={() => dispatch(requestAirdropAndNotify)}
            >
              <span className="icon">
                <i className="fas fa-coins"></i>
              </span>
              <span>Request Airdrop</span>
            </button>
          </div>
          <div className="navbar-item">
            <button
              className="button is-info is-light is-outlined"
              onClick={() => dispatch(getBalanceOfWallet)}
            >
              <span className="icon">
                <i className="fas fa-sync"></i>
              </span>
              <span>Refresh Balance</span>
            </button>
          </div>
          <div className="navbar-item">
            <button
              className="button is-info is-light is-outlined"
              onClick={() => dispatch(initProgramFromIdl)}
            >
              <span className="icon">
                <i className="fas fa-sync"></i>
              </span>
              <span>Get University Account</span>
            </button>
          </div>
        </nav>
      </section>
      <section className="py-6">
        <nav className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Balance (SOL)</p>
              <p className="title">{balance}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Total Courses</p>
              <p className="title">{numberOfCourses}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Total Students</p>
              <p className="title">{numberOfStudents}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Total Credentials Issued</p>
              <p className="title">{numberOfCredentials}</p>
            </div>
          </div>
        </nav>
      </section>
      <section></section>
      <Footer />
    </div>
  );
};

export default UniversityPage;
