import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { makeStyles } from '@mui/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { Redirect } from 'react-router';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { signUpCustom, datasave, postNumber, submitNumber } from "../actions";
import FormLabel from '@mui/material/FormLabel';
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

const SigninForm = (props) => {
    const classes = useStyles();
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

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                variant='outlined'
                                label="password"
                                name="password"

                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
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
        verification: state.registerState.verification,
        number: state.registerState.number,
    }
};
const mapDispatchToProps = (dispatch) => ({
    
});


export default connect(mapStateToProps, mapDispatchToProps)(SigninForm);