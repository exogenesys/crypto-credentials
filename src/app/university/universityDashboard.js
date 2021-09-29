import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  requestAirdropAndNotify,
  fetchAndUpdateBalanceOfWallet,
  onUniversityLogin,
} from "./universityService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Routes from "../routes";
import { getBlockExplorerLink } from "../solana/utils";
import UniversityBanner from "../components/UniversityBanner";

const UniversityDashboard = () => {
  const dispatch = useDispatch();

  useMemo(() => {
    dispatch(onUniversityLogin);
  }, []);

  const {
    universityAccountStatus,
    universityAccountKey,
    balance,
    numberOfCourses,
    numberOfStudents,
    numberOfCredentials,
    profile,
  } = useSelector((store) => store.university);

  const publicKey = useSelector((store) => store.auth.wallet._publicKey);
  const [isCopied, setIsCopied] = useState(false);

  const univerityName = profile && profile.name ? profile.name : "";

  const universityKeyLabel = universityAccountKey ? (
    <span className="tag">
      University Key: {universityAccountKey.toString() || ""}
    </span>
  ) : null;

  const universityKeyCopyButton = universityAccountKey ? (
    <div className="navbar-item">
      <CopyToClipboard
        text={universityAccountKey.toString()}
        onCopy={() => setIsCopied(true)}
      >
        <button
          className="button is-link is-light is-outlined"
          type="button"
          onClick={() => {}}
        >
          <span className="icon">
            <i className="fas fa-copy" />
          </span>
          <span>{!isCopied ? "Copy Address" : "Copied"}</span>
        </button>
      </CopyToClipboard>
    </div>
  ) : null;

  const viewAccountOnExplorer = universityAccountKey ? (
    <div className="navbar-item">
      <Link
        className="button is-info is-light is-outlined"
        to={{
          pathname: getBlockExplorerLink(universityAccountKey.toString()),
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="icon">
          <i className="fas fa-link" />
        </span>
        <span>View On Explorer</span>
      </Link>
    </div>
  ) : null;

  const EditProfileLinkButton = universityAccountStatus ? (
    <div className="navbar-item">
      <Link
        className="button is-success is-light is-outlined"
        to={Routes.editUniversity.path}
      >
        <span className="icon">
          <i className="fas fa-edit" />
        </span>
        <span>Edit University Profile</span>
      </Link>
    </div>
  ) : null;

  const PublishProfileButton = !universityAccountStatus ? (
    <div className="navbar-item">
      <Link
        className="button is-success is-light is-outlined"
        to={Routes.publishUniversity.path}
      >
        <span className="icon">
          <i className="fas fa-cloud-upload-alt" />
        </span>
        <span>Publish University Profile</span>
      </Link>
    </div>
  ) : null;

  return (
    <div>
      <Navbar />
      <UniversityBanner
        title="Dashboard"
        publicKeyString={publicKey.toString()}
        style="is-danger"
      >
        <p className="title is-4">{univerityName}</p>
        <div className="mt-1">{universityKeyLabel}</div>
        <div className="mt-1">
          <span
            className={`tag ${
              universityAccountStatus ? "is-success" : "is-dark"
            }`}
          >
            Status: {universityAccountStatus ? "Published" : "Not Published"}
          </span>
        </div>
      </UniversityBanner>
      <section className="py-1">
        <nav className="navbar">
          {EditProfileLinkButton}
          {PublishProfileButton}
          {universityKeyCopyButton}
          {viewAccountOnExplorer}
          <div className="navbar-item">
            <button
              type="button"
              className="button is-primary is-light is-outlined"
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
              type="button"
              className="button is-warning is-light is-outlined"
              onClick={() => dispatch(fetchAndUpdateBalanceOfWallet)}
            >
              <span className="icon">
                <i className="fas fa-sync" />
              </span>
              <span>Refresh Balance</span>
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
