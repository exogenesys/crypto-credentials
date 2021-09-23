import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  requestAirdropAndNotify,
  fetchAndUpdateBalanceOfWallet,
  onUniversityLogin,
} from "./universityService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Routes from "../routes";

const UniversityDashboard = () => {
  const {
    universityAccountStatus,
    balance,
    numberOfCourses,
    numberOfStudents,
    numberOfCredentials,
  } = useSelector((store) => store.university);

  const publicKey = useSelector((store) => store.auth.wallet._publicKey);
  const dispatch = useDispatch();

  useMemo(() => {
    dispatch(onUniversityLogin);
  }, []);

  return (
    <div>
      <Navbar />
      <section className="hero is-danger is-bold">
        <div className="hero-body">
          <p className="title">Dashboard</p>
          <p className="subtitle">
            {publicKey.toString()}
            <p>
              <span
                className={`mt-2 tag ${
                  universityAccountStatus ? "is-success" : "is-dark"
                }`}
              >
                {universityAccountStatus ? "Published" : "Not Published"}
              </span>
            </p>
          </p>
          {universityAccountStatus ? (
            <Link className="button is-rounded" to={Routes.editUniversity.path}>
              <span className="icon">
                <i className="fas fa-edit" />
              </span>
              <span>Edit University Profile</span>
            </Link>
          ) : (
            <Link
              className="button is-rounded"
              to={Routes.publishUniversity.path}
            >
              <span className="icon">
                <i className="fas fa-cloud-upload-alt" />
              </span>
              <span>Publish University Profile</span>
            </Link>
          )}
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
                <i className="fas fa-coins" />
              </span>
              <span>Request Airdrop</span>
            </button>
          </div>
          <div className="navbar-item">
            <button
              className="button is-info is-light is-outlined"
              onClick={() => dispatch(fetchAndUpdateBalanceOfWallet)}
            >
              <span className="icon">
                <i className="fas fa-sync" />
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
                <i className="fas fa-sync" />
              </span>
              <span>Load Program</span>
            </button>
          </div>
          <div className="navbar-item">
            <Link
              className="button is-danger is-light is-outlined"
              to={Routes.publishCredential.path}
            >
              <span className="icon">
                <i className="fas fa-sync" />
              </span>
              <span>Create Credential</span>
            </Link>
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
      <section />
      <Footer />
    </div>
  );
};

export default UniversityDashboard;
