import styled from "styled-components";
import Sms from './Sms';
import Packages from './Packages';
import { useState } from 'react';
import { connect } from "react-redux";

const sms = "SMS SERVICE";

const Rightside = (props) => {
  const [showModal, setShowModal] = useState("close");
  const [toggle,setToggle] = useState(true);
  const handleClick = (e) =>{
    e.preventDefault();
    const btn = e.target.outerText
    if (btn === sms) {
      setToggle(true)
    } else {
      setToggle(false)
    }
    if(e.target !== e.currentTarget){
        return;
    }

    switch(showModal){
        case "open":
            setShowModal("close");
            break;
        case "close":
            setShowModal("open");
            break;
        default:
            setShowModal("close");
            break;
    }
}
  return (
    <Container>
      { props.user.userType === "Investor"  && 
        
        <FollowCard>
        <Title>
          <h2>Investor's choice</h2>
          <img src="/images/feed-icon.svg" alt="" />
        </Title>

        <FeedList>
          <li>
            <a>
              <Avatar />
            </a>
            <div>
              <span>#Linkedin</span>
              <button onClick={handleClick} >{sms}</button>
            </div>
          </li>
          <li>
            <a>
              <Avatar />
            </a>
            <div>
              <span>#Video</span>
              <button onClick={handleClick} >Packages</button>
            </div>
          </li>
        </FeedList>

        {/* <Recommendation>
          View all recommendations
          <img src="/images/right-icon.svg" alt="" />
        </Recommendation> */}
      </FollowCard>
      }
      <BannerCard>
        <img
          src="/images/comapny-ad.jpg"
          alt=""
        />
      </BannerCard>
      <CommunityCard>
         <a>
          <span>Advertisement Area</span>
        </a>
      </CommunityCard>
      {
        toggle ? <Sms showModal={showModal} handleClick={handleClick} /> :
          <Packages showModal={showModal} handleClick={handleClick} />
      }

     
    </Container>
  );
};

const Container = styled.div`
  grid-area: rightside;
`;

const FollowCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  padding: 12px;
`;

const Title = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  width: 100%;
  color: rgba(0, 0, 0, 0.6);
`;

const FeedList = styled.ul`
  margin-top: 16px;
  li {
    display: flex;
    align-items: center;
    margin: 12px 0;
    position: relative;
    font-size: 14px;
    & > div {
      display: flex;
      flex-direction: column;
    }
    button {
      background-color: transparent;
      color: rgba(0, 0, 0, 0.6);
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
      padding: 16px;
      align-items: center;
      border-radius: 15px;
      box-sizing: border-box;
      font-weight: 600;
      display: inline-flex;
      justify-content: center;
      max-height: 32px;
      max-width: 480px;
      text-align: center;
      outline: none;
    }
  }
`;

const Avatar = styled.div`
  background-image: url("https://static-exp1.licdn.com/sc/h/1b4vl1r54ijmrmcyxzoidwmxs");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 48px;
  height: 48px;
  margin-right: 8px;
`;

const Recommendation = styled.a`
  color: #0a66c2;
  display: flex;
  align-items: center;
  font-size: 14px;
`;
const ArtCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  transition: box-shadow 83ms;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const CommunityCard = styled(ArtCard)`
  padding: 8px 0 0;
  text-align: left;
  display: flex;
  flex-direction: column;
  height:100%;
  align-items: center;
  a {
    color: black;
    padding: 4px 12px 4px 12px;
    font-size: 12px;
    text-align: center;
    &:hover {
      color: #0a66c2;
    }
    span {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &:last-child {
      color: rgba(0, 0, 0, 0.6);
      text-decoration: none;
      border-top: 1px solid #d6cec2;
      padding: 12px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
      }
    }
  }
`;

const BannerCard = styled(FollowCard)`
  img {
    width: 100%;
    height: 100%;
  }
`;
const mapStateToProps = (state) =>{
  return{
    //user: state.userState.user,
    user: state.registerState,

  }
}

export default connect(mapStateToProps)(Rightside);