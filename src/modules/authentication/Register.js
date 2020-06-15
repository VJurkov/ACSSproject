import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  Button,
  Fab,
  TextField,
  Avatar,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Formik } from "formik";
import SendIcon from "@material-ui/icons/Send";
import { registerUser, editUser } from "./redux/actions";
import { currentUserSelector } from "./redux/selectors";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    display: "flex",
    flexDirection: "column",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: "25px",
    height: "25px",
    marginLeft: "10px",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

function Register(props) {
  const classes = useStyles();
  const currentUser = useSelector(currentUserSelector);
  const dispatch = useDispatch();
  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setFieldValue("img", reader.result);
    });
    reader.readAsDataURL(file);
  };

  return (
    <Formik
      initialValues={{
        name: currentUser.name || "",
        username: currentUser.username || "",
        password: currentUser.password || "",
        img: currentUser.img || null,
      }}
      validate={(values) => {
        const errors = {};
        if (!values.username) {
          errors.username = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
        ) {
          errors.username = "Invalid email address";
        }
        if (!values.name) {
          errors.name = "Required";
        }
        if (!values.password) {
          errors.password = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        if (currentUser.username === undefined) {
          dispatch(registerUser(values));
        } else {
          dispatch(editUser({ id: currentUser.id, ...values }));
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        /* and other goodies */
      }) => (
        <form className={classes.container} onSubmit={handleSubmit}>
          <div className={classes.root}>
            <FormControl>
              <TextField
                label="Name"
                error={errors.name && touched.name && errors.name}
                helperText={errors.name}
                id="name"
                value={values.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <TextField
                label="Username"
                error={errors.username && touched.username && errors.username}
                helperText={errors.username}
                id="username"
                value={values.username}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <TextField
                label="Password"
                error={errors.password && touched.password && errors.password}
                helperText={errors.password}
                id="password"
                value={values.password}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <label htmlFor="upload-photo" className={classes.inputContainer}>
                <input
                  style={{ display: "none" }}
                  id="upload-photo"
                  name="upload-photo"
                  onChange={(event) => {
                    handleFileChange(event, setFieldValue);
                  }}
                  type="file"
                />

                <Fab
                  color="secondary"
                  size="small"
                  component="span"
                  aria-label="add"
                  variant="extended"
                >
                  <AddIcon /> Upload photo
                  <Avatar
                    className={classes.avatar}
                    alt={values.name}
                    src={values.img || {}}
                  />
                </Fab>
                <Fab
                  color="secondary"
                  size="small"
                  aria-label="add"
                  variant="extended"
                  className={classes.button}
                  type="submmit"
                >
                  <SendIcon />
                </Fab>
              </label>
            </FormControl>
          </div>
        </form>
      )}
    </Formik>
  );
}

Register.propTypes = {};

export default Register;
