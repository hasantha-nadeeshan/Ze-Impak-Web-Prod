import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { makeStyles } from '@mui/styles';

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
        marginBottom:12,
        fontSize: 50
    }
})

const initialFValues = {
    firstName: 'ex:Asanka',
    lastName: 'ex:Kumara',
    userType: 'Investor',
    mobile: '07700000',
    email: 'sample@clique.com',
    birthday: {
        year: '1998',
        month: '09',
        day: '16'
    },
    gender: 'male'
}

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
  
export const Register = () => {
    const classes = useStyles();
    const [value, setValue] = useState(initialFValues)
    const [val, setVal] = React.useState(new Date('2014-08-18T21:11:54'));
    const handleChange = (newVal) => {
        setVal(newVal);
    };
    return (
        <div className={classes.boxContainer}>
            <div className={classes.reg} >
                Register       
            </div>
            <form action="">                
                <Item>
                    <Grid container spacing={3} justifyContent="center" alignItems="center" >
                        <Grid item xs={6} >
                            <TextField fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Date desktop"
                                    inputFormat="MM/dd/yyyy"
                                    value={val}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} fullWidth/>}
                                />
                                <MobileDatePicker
                                    label="Date mobile"
                                    inputFormat="MM/dd/yyyy"
                                    value={val}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params}  fullWidth/>}
                                />
                                </LocalizationProvider>
                        </Grid>
                    </Grid>
                </Item>
            </form>
            </div>
            
    )
};
