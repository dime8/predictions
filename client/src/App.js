import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import logo from "./logo.svg";
import "./App.css";
import { Provider } from "react-redux";
import Matches from "./components/matches/Matches";
import store from "./store";
import Navbar from "./components/navbar/Navbar";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Matches} />
              <Route exact path="/about" component={About} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
