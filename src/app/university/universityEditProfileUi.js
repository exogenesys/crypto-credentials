import React from "react";
import { Link } from "react-router-dom";
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
  createUniversity,
  fetchUniveristyAccount,
} from "./universityService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useHistory } from "react-router-dom";
import { useMemo } from "react";

const EditUniversityProfile = () => {
  const isConnected = useSelector((store) => store.auth.is_connected);

  if (!isConnected) {
    let history = useHistory();
    history.push("/login");
  }

  const publicKey = useSelector((store) => store.auth.wallet._publicKey);
  const profile = useSelector((store) => store.university.profile);
  console.log(profile);

  return (
    <div>
      <Navbar />
      <section className="hero is-info is-bold">
        <div className="hero-body">
          <p className="title">Edit University Profile</p>
          <p className="subtitle">{publicKey.toString()}</p>
        </div>
      </section>
      <section>
        <div className="container mt-6">
          <div className="field">
            <label className="label">University Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Text input"
                value={profile.name}
              />
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-info">Save</button>
            </div>
            <div className="control">
              <Link className="button is-info is-light" to="/university">
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default EditUniversityProfile;
