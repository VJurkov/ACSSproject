import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FormControl, makeStyles, Fab, TextField } from '@material-ui/core'
import { Formik } from 'formik';
import SendIcon from '@material-ui/icons/Send';
import { registerUser, loginUser } from './redux/actions';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        display: "flex",
        flexDirection: "column"
    },
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    avatar: {
        width: '25px',
        height: '25px',
        marginLeft: '10px'
    },
    inputContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    }

}));

function Login() {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <Formik
            initialValues={{ username: "", password: "" }}
            validate={values => {
                const errors = {};
                if (!values.username) {
                    errors.username = 'Required';
                }
                if (!values.password) {
                    errors.password = 'Required';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                dispatch(loginUser(values));
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
                setFieldValue
                /* and other goodies */
            }) => (
                    <form className={classes.container} onSubmit={handleSubmit}>
                        <div className={classes.root}>
                            <FormControl>
                                <TextField label="Username" error={errors.username && touched.username && errors.username} helperText={errors.username} id="username" value={values.username} onChange={handleChange} />

                            </FormControl>
                            <FormControl>
                                <TextField label="Password" error={errors.password && touched.password && errors.password} helperText={errors.password} id="password" value={values.password} onChange={handleChange} />
                            </FormControl>
                            <FormControl>
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
                            </FormControl>
                        </div>
                    </form>
                )}
        </Formik>
    )
}


export default Login
