import React from "react";
import PropTypes from "prop-types";

const UniversityBanner = ({
  publicKeyString = "publicKey",
  title = "title",
  style = "",
}) => (
  <section className={`hero is-warning ${style} is-bold`}>
    <div className="hero-body">
      <p className="title">{title}</p>
      <p className="subtitle">{publicKeyString}</p>
    </div>
  </section>
);

export default UniversityBanner;

UniversityBanner.propTypes = {
  publicKeyString: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.string,
};
