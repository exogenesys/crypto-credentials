import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector, useStore } from "react-redux";
import "./App.css";
import Routes from "./app/routes";

import Home from "./app/home/homePage";
import LoginPage from "./app/auth/authPage";

import ViewUniversityPage from "./app/university/viewUniversity";
import ViewCredentialPage from "./app/university/viewCredential";

import InitPage from "./app/init/InitPage";
import UniversityDashboard from "./app/university/universityDashboard";

import PublishUniversityPage from "./app/university/publishUniversity";
import EditUniversityPage from "./app/university/editUniversity";

import PublishCredentialPage from "./app/university/publishCredential";
import EditCredentialPage from "./app/university/editCredential";

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
          <ViewCredentialPage />
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
            <UniversityDashboard />
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
        <Route path={Routes.publishCredential.path}>
          {Routes.publishCredential.isProtected && isConnected ? (
            <PublishCredentialPage />
          ) : (
            <Redirect to={Routes.login.path} />
          )}
        </Route>
        <Route path={Routes.publishUniversity.path}>
          {Routes.publishUniversity.isProtected && isConnected ? (
            <PublishUniversityPage />
          ) : (
            <Redirect to={Routes.login.path} />
          )}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
