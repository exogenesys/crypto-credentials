import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthRedirect from "./app/auth/authUi";
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
          <div className={"center"}>
            <AuthRedirect />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
