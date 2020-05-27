import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormControl, Input, InputLabel, makeStyles, Button, Fab, TextField, Avatar } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import { required, emailValidator } from '../../shared/validators';
import { Formik } from 'formik';

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
    }

}));


function Register(props) {
    const classes = useStyles();

    return (
        <Formik
            initialValues={{ name: "", username: "", password: "",file:{} }}
            validate={values => {
                const errors = {};
                if (!values.username) {
                    errors.username = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
                ) {
                    errors.username = 'Invalid email address';
                }
                if (!values.name) {
                    errors.name = 'Required';
                }  
                if (!values.password) {
                    errors.password = 'Required';
                } 
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
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
                                <TextField label="Name" error={errors.name && touched.name && errors.name} helperText={errors.name} id="name" value={values.name} onChange={handleChange} />
                            </FormControl>
                            <FormControl>
                                <TextField label="Username" error={errors.username && touched.username && errors.username} helperText={errors.username}  id="username" value={values.username} onChange={handleChange} />

                            </FormControl>
                            <FormControl>
                                <TextField label="Password" error={errors.password && touched.password && errors.password} helperText={errors.password}  id="password" value={values.password} onChange={handleChange} />
                            </FormControl>
                            <FormControl>
                                <label htmlFor="upload-photo">
                                    <input
                                        style={{ display: 'none' }}
                                        id="upload-photo"
                                        name="upload-photo"
                                        onChange={(event)=>{
                                            console.log(event.currentTarget.files);
                                            setFieldValue("file", event.currentTarget.files[0]);
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
                    </Fab>
                                </label>
                            </FormControl>
                            <Avatar alt={values.name} src={values.file.name}/>
                            <Input type="submit"/>
                        </div>
                    </form>
                )}
        </Formik>
    )
}

Register.propTypes = {

}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
