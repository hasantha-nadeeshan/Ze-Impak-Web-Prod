import styled from 'styled-components';
import  {useEffect } from 'react';
import {connect} from 'react-redux';
import React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { smsEnable } from "../actions";
const useStyles = makeStyles({
    reg: {
        display: 'block',
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 2,
        marginBottom: 2,
        fontSize: 50
    }
})
const Sms = (props) => {
    const classes = useStyles();
    const reset=(e)=>{
        props.handleClick(e);

    }
    const btn = (e) => {
        const fl = e.target.outerText
        if (props.preference[fl] !== undefined && props.preference[fl].sms) {
            //false
            props.smsEnable(fl, false);
            
            console.log(e.target.outerText);
        } else if (props.preference[fl] !== undefined) {
            //true
            props.smsEnable(fl, true);
            console.log(e.target.outerText);
        } else {
            //true
            props.smsEnable(fl, true);
            console.log(e.target.outerText);

        }
       
    }
    console.log(props.preference)
    return (
        <>
            {   props.showModal === "open" &&
        
                <Container>
                <Content>
                <Header>
                                <h2>Set SMS alert to</h2>
                        <button onClick={(event) => reset(event)}>
                            Done
                         </button>
                            </Header>
                    <div className={classes.reg} >
                        <div >
                        <Typography caption >Filed of preference</Typography> 
                        </div>
                    <Grid container spacing={1} direction="row" justifyContent="space-between" alignItems="center" >
                            {props.fields && props.fields.map((filed) => (
                                <Grid item xs={12}  justifyContent="center"  key={filed}>
                                    <Button
                                        onClick={(event) => btn(event)}
                                    fullWidth
                                    variant="contained"
                                >{props.preference[filed] !== undefined&&props.preference[filed].sms  && <DoneIcon />}{filed}</Button>
                            </Grid>
                            ))
                            }
                        </Grid>
                    </div>
                </Content>
            </Container>
            }
        </>
    );
}


const Container = styled.div`

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    color: black;
    background-color:rgba(0,0,0,0.8);
    animation: fadeIn 0.3s;

`;

const Content = styled.div`

    width: 100%;
    max-width:552px;
    background-color:white;
    max-height:90%;
    overflow: hidden;
    border-radius:5px;
    position: relative;
    display: flex;
    flex-direction: column;
    top:32px;
    margin:0 auto;
`;
const Header = styled.div`

    display:block;
    padding:16px 20px;
    border-bottom:1px solid rgba(0,0,0,0.15);
    font-size:16px;
    line-height:1.5;
    color: rgba(0,0,0,0.6);
    font-weight: 400;
    display: flow;
    justify-content: space-between;
    align-items: center;

    button{
        height:50px;
        width:50px;
        min-width: auto;
        color: red;
        outline: none;
        border: none;
        p{
            colou
        }

    }

`;


const mapStateToProps = (state) =>{

    return {
        fields: state.fieldState.fields,
        preference: state.registerState.preference

    }
};

const mapDispatchToProps = (dispatch) => ({
    smsEnable: (field,value) => dispatch(smsEnable(field,value)),

});

export default connect(mapStateToProps,mapDispatchToProps)(Sms);