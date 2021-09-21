import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  resetError,
  resetTransaction,
  setError,
  setupTransaction,
  storeNewCredentialData,
} from "./actions";
import {
  doTransfer,
  requestAirdropAndNotify,
  fetchAndUpdateBalanceOfWallet,
  initProgramFromIdl,
  createUniversity,
  fetchUniveristyAccount,
  createCredential,
} from "./universityService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useHistory } from "react-router-dom";
import { useMemo } from "react";

const CreateCredential = () => {
  const isConnected = useSelector((store) => store.auth.is_connected);

  if (!isConnected) {
    let history = useHistory();
    history.push("/login");
  }

  const publicKey = useSelector((store) => store.auth.wallet._publicKey);
  const profile = useSelector((store) => store.university.profile);
  console.log(profile);

  const [studentName, setStudentName] = useState("exogenesys");
  const [studentPublicKey, setStudentPublicKey] = useState(
    "6rky1unoNKWYE8u2j9jNq4JMnVWizDq7xdXzyic7yV3R"
  );
  const [courseName, setCourseName] = useState("CS101");
  const [graduationYear, setGraduationYear] = useState(2021);

  const dispatch = useDispatch();

  const onClickCreateCredential = () => {
    dispatch(
      storeNewCredentialData({
        newCredentialData: {
          studentName,
          studentPublicKey,
          courseName,
          graduationYear,
        },
      })
    );
    dispatch(createCredential);
  };
  return (
    <div>
      <Navbar />
      <section className="hero is-warning is-bold">
        <div className="hero-body">
          <p className="title">Create New Credential</p>
          <p className="subtitle">{publicKey.toString()}</p>
        </div>
      </section>
      <section>
        <div className="container mt-6">
          <div className="field">
            <label className="label">Student Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Text input"
                onChange={(e) => setStudentName(e.target.value.trim())}
                maxLength="10"
                value={studentName}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Student Public Key</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Text input"
                onChange={(e) => setStudentPublicKey(e.target.value.trim())}
                value={studentPublicKey}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Course Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Text input"
                onChange={(e) => setCourseName(e.target.value.trim())}
                maxLength="10"
                value={courseName}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Graduation Year</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Text input"
                onChange={(e) => setGraduationYear(e.target.value.trim())}
                maxLength="10"
                value={graduationYear}
              />
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button
                className="button is-warning"
                onClick={onClickCreateCredential}
              >
                Create Credential
              </button>
            </div>
            <div className="control">
              <Link className="button is-warning is-light" to="/university">
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

export default CreateCredential;
