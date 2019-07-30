import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import "./Navbar.css";
const matchesUrl = "javascript:;";
export default class Navbar extends Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar className="Tbar">
          {/* <IconButton
              edge="start"
              className="menuButton"
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton> */}
          <Link to="/" className="link">
            Home
          </Link>
          <Typography variant="h6" className="title">
            Matches
          </Typography>
          <Link to="/about" className="link">
            About
          </Link>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    );
  }
}
