import { useState,useEffect} from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import firebase from 'firebase';
import  { postDpAPI,askOTP } from '../actions';

const Leftside = (props) => {
  console.log("im in left",props.user);
  const [sharedImage,setSharedImage] = useState("");
  const [imageLink,setImageLink] = useState(props.user.sharedImg);

  useEffect(() =>{
    setImageLink(props.user.sharedImg);
  },[])

  const handleChanged =(e) =>{
    const imaged = e.target.files[0];
    
    if (imaged === '' || imaged === undefined ){
        alert("not an image, the file is a ${typeof image} ");
        return;
    }

    setSharedImage(imaged);

  }
 
  const reset=()=>{
    setSharedImage("");
  }
  const postDpUser = (e) =>{
    e.preventDefault();
    if (e.target !== e.currentTarget){
        return;

    }

    const payload = {
        image: sharedImage,
        timestamp: firebase.firestore.Timestamp.now(),
        uid:props.user.uid,
    };

    props.postDp(payload);
    reset();

  }

  return (
    <Container>
      <ArtCard>
        <UserInfo>
          <CardBackground />
          <a>
            <Photo>
              {
                props.user.sharedImg ? (
                  <img src={props.user.sharedImg}/>
                )
                :
                (
                  <img src="./images/user.svg"/>
                )
              }
              
            </Photo>
              
            <Link>Welcome, {props.user.firstName ? props.user.firstName : "there"}</Link>
          </a>
          <a>
            <AddPhotoText>
            <input 
              type="file"  
              accept ="image/gif, image/jpeg, image/png, image/jpg"
              name = "image" 
              id="file1"
              style = {{ display: "none" }}
              onChange={handleChanged}
            />
            <p>
              <label htmlFor="file1">
                Select an image to share
              </label>
            </p>
            <button onClick={(e)=>postDpUser(e)}>
              Upload
            </button>
            <button onClick={(e)=>props.axioCheck(e)}>
              ckeck axio
            </button>
                            
            </AddPhotoText>
          </a>
        </UserInfo>
        {/* <Widget>
          <a>
            <div>
              <span>Connections</span>
              <span>Grow your network</span>
            </div>
            <img src="/images/widget-icon.svg" alt="" />
          </a>
        </Widget>
        <Item>
          <span>
            <img src="/images/item-icon.svg" alt="" />
            My Items
          </span>
        </Item> */}
      </ArtCard>

      {/* <CommunityCard>
        <a>
          <span>Groups</span>
        </a>
        <a>
          <span>
            Events
            <img src="/images/plus-icon.svg" alt="" />
          </span>
        </a>
        <a>
          <span>Follow Hashtags</span>
        </a>
        <a>
          <span>Discover more</span>
        </a>
      </CommunityCard> */}
    </Container>
  );
};

const Container = styled.div`
  grid-area: leftside;
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

const UserInfo = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 12px 12px 16px;
  word-wrap: break-word;
  word-break: break-word;
`;

const CardBackground = styled.div`
  background: url("/images/card-bg.svg");
  background-position: center;
  background-size: 462px;
  height: 54px;
  margin: -12px -12px 0;
`;

const Photo = styled.div`
  box-shadow: none;
  background-image: url({imageLink});
  width: 72px;
  height: 72px;
  box-sizing: border-box;
  background-clip: content-box;
  background-color: white;
  background-position: center;
  background-size: 60%;
  background-repeat: no-repeat;
  margin: -38px auto 12px;
  border-radius: 50%;

  img {
    width: 72px;
    height: 72px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
`;

const Link = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;
`;

const AddPhotoText = styled.div`
  color: #0a66c2;
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.33;
  font-weight: 400;
`;

const Widget = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding-top: 12px;
  padding-bottom: 12px;
  & > a {
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 12px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
    div {
      display: flex;
      flex-direction: column;
      text-align: left;
      span {
        font-size: 12px;
        line-height: 1.333;
        &:first-child {
          color: rgba(0, 0, 0, 0.6);
        }
        &:nth-child(2) {
          color: rgba(0, 0, 0, 1);
        }
      }
    }
  }
  svg {
    color: rgba(0, 0, 0, 1);
  }
`;

const Item = styled.a`
  border-color: rgba(0, 0, 0, 0.8);
  text-align: left;
  padding: 12px;
  font-size: 12px;
  display: block;
  span {
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 1);
    svg {
      color: rgba(0, 0, 0, 0.6);
    }
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

const CommunityCard = styled(ArtCard)`
  padding: 8px 0 0;
  text-align: left;
  display: flex;
  flex-direction: column;
  a {
    color: black;
    padding: 4px 12px 4px 12px;
    font-size: 12px;
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

const mapStateToProps = (state) =>{
  return{
    //user: state.userState.user,
    user: state.registerState,

  }
}
const mapDispatchToProps = (dispatch) =>({

  postDp : (payload) => dispatch(postDpAPI(payload)),
  axioCheck : (payload) => dispatch(askOTP(payload))

});

export default connect(mapStateToProps,mapDispatchToProps)(Leftside);