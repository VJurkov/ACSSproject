import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  logout,
} from "../modules/authentication/redux/actions";
import { currentUserSelector } from "../modules/authentication/redux/selectors";
import { Button, Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";

function UserStatus() {
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);
  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    const username = localStorage.getItem("USERNAME");
    if (token && username) {
      dispatch(getUserDetails(token, username));
    }
  }, []);

  if (currentUser.username === undefined) {
    return (
      <div>
        <Button component={Link} to="/login" color="inherit">
          Login
        </Button>
        <Button component={Link} to="/register" color="inherit">
          Register
        </Button>
      </div>
    );
  } else {
    return (
      <div>
        <Button component={Link} to="/edit">
          <Avatar alt={currentUser.name} src={currentUser.img || {}} />
        </Button>
        <Button
          onClick={() => {
            dispatch(logout());
          }}
          color="inherit"
        >
          LogOut
        </Button>
      </div>
    );
  }

  return <div></div>;
}

export default UserStatus;
