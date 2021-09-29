import React, { useState, useMemo } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Routes from "../routes";
import {
  POLLING_STATUS,
  updateAccountPollingStatus,
  updateUniversityFormData,
} from "./actions";
import { createUniversity } from "./universityService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UniversityBanner from "../components/UniversityBanner";
import { isValidString } from "../util";

const PublishUniversity = () => {
  const dispatch = useDispatch();

  const publicKey = useSelector((store) => store.auth.wallet._publicKey);
  const history = useHistory();
  const { universityAccountStatus, profile, accountPollingStatus } =
    useSelector((store) => store.university);

  const FORM_STATES = {
    DEFAULT: "default",
    LOADING: "loading",
  };

  const [formState, setFormState] = useState(FORM_STATES.DEFAULT);
  const [universityName, setUniversityName] = useState("");

  useMemo(() => {
    console.log("accountPollingStatus", accountPollingStatus);
    if (accountPollingStatus === POLLING_STATUS.SUCCESS) {
      setFormState(FORM_STATES.DEFAULT);
      history.push(Routes.dashboard.path);
    } else if (accountPollingStatus === POLLING_STATUS.FAILED) {
      setFormState(FORM_STATES.DEFAULT);
    }
  }, [accountPollingStatus, setFormState]);

  const handlePublishButton = () => {
    if (formState === FORM_STATES.DEFAULT) {
      if (isValidString(universityName)) {
        setFormState(FORM_STATES.LOADING);
        dispatch(updateUniversityFormData({ name: universityName }));
        dispatch(createUniversity);
      } else {
        setFormState(FORM_STATES.DEFAULT);
        alert("invalid form data");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <UniversityBanner
        title="Publish University Profile"
        publicKeyString={publicKey.toString()}
      />
      <section>
        <div className="container mt-6">
          <div className="field">
            <label className="label">University Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Text input"
                onChange={(e) => setUniversityName(e.target.value)}
                value={universityName}
              />
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button
                type="button"
                className={`button is-warning is-rounded ${
                  formState === FORM_STATES.LOADING ? "is-loading" : ""
                }`}
                disabled={formState === FORM_STATES.LOADING}
                onClick={handlePublishButton}
              >
                Publish
              </button>
            </div>
            <div className="control">
              <Link
                className="button is-warning is-light is-rounded"
                to={Routes.dashboard.path}
              >
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

export default PublishUniversity;
