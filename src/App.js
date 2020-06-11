import React, { useState } from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import "./App.css";
import Home from "./modules/home/Home";
import Register from "./modules/authentication/Register";
import { useSelector } from "react-redux";
import { currentUserSelector } from "./modules/authentication/redux/selectors";
import { Avatar } from "@material-ui/core";
import Login from "./modules/authentication/Login";
import Customers from "./modules/customers/Customers";
import Bills from "./modules/bills/Bills";
import BillDetails from "./modules/billDetails/BillDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  spacer: {
    flexGrow: 1,
  },
}));

function App({ label }) {
  const classes = useStyles();
  const currentUser = useSelector(currentUserSelector);
  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              component={Link}
              className={classes.menuButton}
              to="/"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <HomeIcon />
            </IconButton>
            <Typography variant="h6">BO Workshop</Typography>
            <Button component={Link} to="/customers" color="inherit">
              Customers
            </Button>
            <div className={classes.spacer} />
            <Avatar alt={currentUser.name} src={currentUser.img || {}} />
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
            <Button component={Link} to="/register" color="inherit">
              Register
            </Button>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route path="/customers">
            <Customers />
          </Route>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/register">
            <Register />
          </Route>
          <Route component={Bills} path="/bills/:id" />
          <Route component={BillDetails} path="/billDetails/:id" />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
