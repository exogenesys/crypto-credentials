import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector, useStore } from "react-redux";
import Routes from "./app/routes";
import LoginPage from "./app/auth/authUi";
import University from "./app/university/universityUi";
import EditUniversityPage from "./app/university/universityEditProfileUi";
import EditCredentialPage from "./app/university/createCredential";
import ViewUniversityPage from "./app/university/viewCredential";
import InitPage from "./app/init/InitUi";
import Home from "./app/home/homeUi";
import "./App.css";
import EditUniversityProfile from "./app/university/universityEditProfileUi";

export default function App() {
  const isConnected = useSelector((state) => state.auth.is_connected);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={Routes.home.path}>
          <Home />
        </Route>
        <Route path={Routes.login.path}>
          <LoginPage />
        </Route>
        <Route path={Routes.viewUniversity.path}>
          <ViewUniversityPage />
        </Route>
        <Route path={Routes.viewCredential.path}>
          <ViewUniversityPage />
        </Route>
        <Route path={Routes.init.path}>
          {Routes.init.isProtected && isConnected ? (
            <InitPage />
          ) : (
            <Redirect to={Routes.login.path} />
          )}
        </Route>
        <Route path={Routes.dashboard.path}>
          {Routes.dashboard.isProtected && isConnected ? (
            <University />
          ) : (
            <Redirect to={Routes.login.path} />
          )}
        </Route>
        <Route path={Routes.editUniversity.path}>
          {Routes.editUniversity.isProtected && isConnected ? (
            <EditUniversityPage />
          ) : (
            <Redirect to={Routes.login.path} />
          )}
        </Route>
        <Route path={Routes.editCredential.path}>
          {Routes.editCredential.isProtected && isConnected ? (
            <EditCredentialPage />
          ) : (
            <Redirect to={Routes.login.path} />
          )}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
