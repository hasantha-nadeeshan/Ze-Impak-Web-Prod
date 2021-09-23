import styled from 'styled-components';
import {connect} from 'react-redux';
import firebase from 'firebase';
import  { postArticleAPI } from '../actions';

const Suscribe = (props) => {


    return (
        <>
            {   props.showModal === "open" &&
        
                <Container>
                        <Content>
                           HI
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



const mapStateToProps = (state) =>{

    return {
        user:state.userState.user,
    }
};

const mapDispatchToProps = (dispatch) =>({

    postArticale : (payload) => dispatch(postArticleAPI(payload))

});

export default connect(mapStateToProps,mapDispatchToProps)(Suscribe);