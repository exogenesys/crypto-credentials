import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { disconnectStart } from "../auth/actions";

export default function Navbar(props) {
  const isConnected = useSelector((store) => store.auth.is_connected);
  if (isConnected) {
    const dispatch = useDispatch();
    return (
      <button
        className="button is-rounded is-black"
        onClick={() => dispatch(disconnectStart())}
      >
        <span className="icon">
          <i className="fas fa-sign-out-alt"></i>
        </span>
        <span>Logout</span>
      </button>
    );
  } else {
    return (
      <Link className="button is-rounded is-black" to="/login">
        <span className="icon">
          <i className="fas fa-university"></i>
        </span>
        <span>University Login</span>
      </Link>
    );
  }
}
