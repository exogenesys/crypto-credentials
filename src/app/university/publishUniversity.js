import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Routes from "../routes";
import { updateUniversityFormData } from "./actions";
import { createUniversity } from "./universityService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UniversityBanner from "../components/UniversityBanner";
import { isValidString } from "../util";

const EditUniversityProfile = () => {
  const publicKey = useSelector((store) => store.auth.wallet._publicKey);
  const profile = useSelector((store) => store.university.profile);
  console.log(profile);

  const dispatch = useDispatch();
  const [formState, setFormState] = useState("default");
  const [universityName, setUniversityName] = useState("");

  const handlePublishButton = () => {
    if (formState == "default") {
      if (isValidString(universityName)) {
        dispatch(updateUniversityFormData({ name: universityName }));
        setFormState("loading");
        publishUniversity();
      } else {
        setFormState("default");
        alert("invalid form data");
      }
    }
  };

  const publishUniversity = () => {
    dispatch(createUniversity);

    // .then(() => {
    //   alert("published");
    //   setFormState("default");
    // });
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
                className={`button is-warning is-rounded ${
                  formState == "loading" ? "is-loading" : ""
                }`}
                disabled={formState == "loading"}
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

export default EditUniversityProfile;
