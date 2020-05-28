import React, { useState } from 'react';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import './App.css';
import Home from './modules/home/Home';
import Register from './modules/authentication/Register';
import { useSelector } from 'react-redux';
import { currentUserSelector } from './modules/authentication/redux/selectors';
import { Avatar } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App({label}) {
  const classes = useStyles();
  const currentUser = useSelector(currentUserSelector);
  return (
    
    <Router>
      <div>
      <AppBar position="static">
      <Toolbar>
        <IconButton component={Link} className={classes.menuButton} to="/" edge="start" color="inherit" aria-label="menu">
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          BO Workshop
        </Typography>
        <Avatar alt={currentUser.name} src={currentUser.img || {}}/>
        <Button component={Link} to="/login" color="inherit">Login</Button>
        <Button component={Link} to="/register" color="inherit">Register</Button>
      </Toolbar>
    </AppBar>
        <Switch>
        <Route path="/login">
            <div>login page</div>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/">
           <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  )


  
}

export default App;
