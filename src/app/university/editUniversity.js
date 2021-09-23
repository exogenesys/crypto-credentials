import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Routes from "../routes";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UniversityBanner from "../components/UniversityBanner";

const EditUniversityProfile = () => {
  const publicKey = useSelector((store) => store.auth.wallet._publicKey);
  const profile = useSelector((store) => store.university.profile);
  console.log(profile);

  return (
    <div>
      <Navbar />
      <UniversityBanner
        title="Publish University"
        publicKeyString={publicKey.toString()}
      />
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
              <button className="button is-rounded is-info">Save</button>
            </div>
            <div className="control">
              <Link
                className="button is-rounded is-info is-light"
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
