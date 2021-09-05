import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthRedirect from "./app/auth/authUi";
import University from "./app/university/universityUi";
import UniversityEditProfile from "./app/university/universityEditProfileUi";
import Home from "./app/home/homeUi";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <AuthRedirect />
        </Route>
        <Route path="/university">
          <University />
        </Route>
        <Route path="/edit-university">
          <UniversityEditProfile />
        </Route>
        <Route
          path="/demo-video"
          render={() => (window.location = "https://www.google.com")}
        />
      </Switch>
    </BrowserRouter>
  );
}
