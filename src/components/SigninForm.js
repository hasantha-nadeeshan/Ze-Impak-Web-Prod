import React, { useState, } from 'react';
import { connect } from "react-redux";
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { Redirect } from 'react-router';
import  { signInCustom } from '../actions';

const useStyles = makeStyles({
    boxContainer: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 600
    },
    reg: {
        display: 'block',
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        marginBottom: 12,
        maxWidth: 600,
        fontSize: 50
    }
})
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const loginValues = {
    email: '',
    password: ''
}

const SigninForm = (props) => {
    const classes = useStyles();
    const [values, setValues] = useState(loginValues)
    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }
    const verifi = () => {
        props.signIn(values.email,values.password)
    }
    return (
        <div className={classes.boxContainer}>
            {
                props.user && <Redirect to='/home' />
            }
            <Item>
                <div className={classes.reg} >
                    <Grid container spacing={3} direction="row" justifyContent="space-between" alignItems="center" >
                        <Grid item xs={3} >
                            <a href="/">
                                <img src="/images/login-logo.svg" alt="" />
                            </a>
                        </Grid>
                        <Grid item >
                            Login
                        </Grid>
                    </Grid>
                </div>
                <form action="">
                    <Grid container spacing={3} direction="row" justifyContent="space-between" alignItems="center" >
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                variant='outlined'
                                label="E-mail"
                                name="email"
                                value={values.email}
                                onChange={handleInputChange}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                type="password" 
                                variant='outlined'
                                label="password"
                                name="password"
                                value={values.password}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                onClick={verifi}
                                variant="contained"
                            >Login</Button>
                        </Grid>

                    </Grid>
                </form>
            </Item>
        </div>

    )
};


const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    }
};
const mapDispatchToProps = (dispatch) => ({
    signIn: (email, password) => dispatch(signInCustom(email, password)),
});


export default connect(mapStateToProps, mapDispatchToProps)(SigninForm);