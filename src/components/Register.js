import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { signUpCustom } from "../actions";
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
    },
    date: {
        display: 'none',
        ['@media (min-width:780px)']: {
            display: 'block'
        }
    },
    date2: {
        display: 'block',
        ['@media (min-width:780px)']: {
            display: 'none'
        }
    }
})

const initialFValues = {
    firstName: '',
    lastName: '',
    userType: 'Investor',
    mobile: '',
    email: '',
    birthday: new Date('2021-01-18T21:11:54'),
    gender: 'male',
    code:''
}

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
  
export const Register = () => {
    const [alignment, setAlignment] = useState('INVESTOR');

    const classes = useStyles();
    const [values, setValue] = useState(initialFValues)
    const [val, setVal] = React.useState(new Date('2014-08-18T21:11:54'));
    const register = useSelector((state) => state.registerState)
    const user = useSelector((state) => state.userState.user)
    const handleChangeGen = (newVal) => {
        setVal(newVal);
        setValue({
            ...values,
            birthday: val
        })
    };
    const  handleInputChange = e => {
        const { name, value } = e.target
        setValue({
            ...values,
            [name]: value
        })
        console.log(values)
    }
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        setValue({
            ...values,
            userType: newAlignment
        })
    };
    const submit = () => {
        
    }
    const createAccount = () => {
        signUpCustom('ravindu@hi.com',"ravinduhiroshan")
    }
    return (
        <div className={classes.boxContainer}>
            {
                user && <Redirect to='/home' />
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
                             Register 
                </Grid>
            </Grid>
            </div>
            <form action="">                
                
                    <Grid container spacing={3} justifyContent="center" alignItems="center" >
                        <Grid item xs={6} >
                            <TextField
                                fullWidth
                                required
                                variant='outlined'
                                label="First name"
                                value={values.firstName}
                                name="firstName"
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                fullWidth
                                variant='outlined'
                                label="Last name"
                                name="lastName"
                                value={values.lastName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                variant='outlined'
                                label="Mobile"
                                name="mobile"
                                value={values.mobile}
                                onChange={handleInputChange}
                            />
                        </Grid>
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
                        <ToggleButtonGroup
                                color="primary"
                                value={values.userType}
                                exclusive
                                onChange={handleChange}
                                >
                                <ToggleButton value="Investor">Investor</ToggleButton>
                                <ToggleButton value="Inventor">Inventor</ToggleButton>
                                </ToggleButtonGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <div className={classes.date}>
                                <DesktopDatePicker
                                    label="Date desktop"
                                    inputFormat="MM/dd/yyyy"
                                    value={values.birthday}
                                    onChange={handleChangeGen}
                                    renderInput={(params) => <TextField {...params} fullWidth/>}
                                    />
                                    </div>
                                    <div className={classes.date2}>
                                <MobileDatePicker
                                    label="Date mobile"
                                    inputFormat="MM/dd/yyyy"
                                    value={values.birthday}
                                    onChange={handleChangeGen}
                                    renderInput={(params) => <TextField {...params}  fullWidth />}
                                />
                                </div>
                            </LocalizationProvider>
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        row
                                        aria-label="gender"
                                        defaultValue={values.gender}
                                        name="gender"
                                        onChange={handleInputChange}
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                            </FormControl>
                            </Grid>
                            <div style={{ display: 'block' }}>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    onClick={submit}
                                >Submit</Button>
                            </Grid>
                            </div>
                        </Grid>
                        <div style={{ display: 'block' }}>
                        <Grid container spacing={3} justifyContent="center" alignItems="center" >
                        <Grid item xs={12}>
                        <TextField
                                fullWidth
                                required
                                variant='outlined'
                                label="CODE"
                                name="code"
                                value={values.code}
                                onChange={handleInputChange}
                            />
                        
                        </Grid>
                        <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    onClick={createAccount}
                                >Verify Mobile Number</Button>
                        </Grid>
                        </Grid>
                        </div>
                    </Grid>
               
            </form>
            </Item>
            </div>
            
    )
};
