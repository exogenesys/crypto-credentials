import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { disconnectStart } from "../auth/actions";
import Routes from "../routes";

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
          <i className="fas fa-sign-out-alt" />
        </span>
        <span>Logout</span>
      </button>
    );
  } 
    return (
      <Link className="button is-rounded is-black" to={Routes.login.path}>
        <span className="icon">
          <i className="fas fa-university" />
        </span>
        <span>University Login</span>
      </Link>
    );
  
}
