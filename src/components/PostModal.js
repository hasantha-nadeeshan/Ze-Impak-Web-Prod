import { useState} from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import {connect} from 'react-redux';
import firebase from 'firebase';
import  { postArticleAPI,notifyInvestor,riskCalculate,resetRisk } from '../actions';
import Select from 'react-select';


const PostModal = (props) => {

    const [editorText,setEditorText] = useState("");
    const [shareImage,setShareImage] = useState("");
    const [videoLink,setVideoLink] = useState("");
    const [assetArea,setAssetArea] = useState("");
    const [title,setTitle] = useState("");
    const [field,setField] = useState({});
    
    const Countries = [
        { label: "AGRICULTURE"},
        { label: "ICT" },
        { label: "ELECTRONICS" },
      ];

    const handleChange =(e) =>{
        const image = e.target.files[0];
        console.log("awa athukta")
        if (image === '' || image === undefined ){
            alert("not an image, the file is a ${typeof image} ");
            console.log("awa athukta awulk")
            return;
        }
        
        setShareImage(image);

    }

    const switchAssetArea = (area)=>{
        setShareImage("");
        setVideoLink("");
        setAssetArea(area);
    }

    const postArticale = (e) =>{
        e.preventDefault();
        if (e.target !== e.currentTarget){
            return;

        }

        const payload = {
            image: shareImage,
            video:videoLink,
            user: props.user,
            userReg:props.userReg,
            description: editorText,
            title:title,
            field:field.label,
            timestamp: firebase.firestore.Timestamp.now(),
        };

        const sendMsg = props.userReg.firstName + " " + props.userReg.lastName + " has just published a post relavant to " + payload.field + " field. Contact him/her via " + props.user.email + " . Thank You!";

        if(title==="" || editorText==""){
            alert("Please fill all feilds")
        }
        else{
            props.postArticale(payload);
            
            console.log(payload);
            props.notifyInvestor(sendMsg);
            reset(e);
        }
        

    }
    const calRisk = (e) =>{
        e.preventDefault();
        if (e.target !== e.currentTarget){
            return;

        }

        const payload = {
          
            description: editorText,
           
        };

        
        if(editorText===""){
            alert("Please fill description field")
        }
        else{
            props.calculateRisk(payload.description);
            
            console.log(payload);
          
          
        }
        

    }


    const reset=(e)=>{
        setEditorText("");
        setShareImage("");
        setTitle("");
        setField({});
        setVideoLink("");
        props.resetRisk();
        props.handleClick(e);

    }

    return (
        <>
            {   props.showModal === "open" &&
        
                <Container>
                        <Content>
                            <Header>
                                <h2>Create a post</h2>
                                <button onClick={(event)=> reset(event)}>
                                    <img src="/images/close-icon.svg" alt=""/>
                                </button>
                            </Header>
                            <SharedContent>
                                <UserInfo>
                                    {props.userReg.sharedImg ? 
                                        (<img src={props.userReg.sharedImg} alt=""/>)
                                        :
                                        (<img src="/images/user.svg" alt=""/>)
                                    }
                                    
                                    <span>{props.userReg.firstName + " " + props.userReg.lastName}</span>
                                </UserInfo>
                                <Editor>
                                    <Select 
                                        value = {field}
                                        options={Countries}
                                        onChange = {(e)=> setField(e)}


                                    
                                    />
                                    <textarea 
                                        value={title} 
                                        onChange={(e)=>setTitle(e.target.value)}
                                        placeholder="Title"
                                        autoFocus={true}
                                    />
                                    <textarea 
                                        value={editorText} 
                                        onChange={(e)=>setEditorText(e.target.value)}
                                        placeholder="What do you want to talk about"
                                        autoFocus={true}
                                    />
                                    
                                    {
                                        assetArea==="image"  ? (

                                    
                                    <UploadImage>
                                        <input 
                                            type="file"  
                                            accept ="image/gif, image/jpeg, image/png, image/jpg"
                                            name = "image" 
                                            id="file"
                                            style = {{ display: "none" }}
                                            onChange={handleChange}
                                        />
                                        <p>
                                            <label htmlFor="file">
                                                Select an image to share
                                            </label>
                                        </p>
                                        
                                        { 
                                            shareImage && 
                                                <img src={URL.createObjectURL(shareImage)}/>
                                        
                                        }
                                    </UploadImage>
                                    )
                                    :(

                                        assetArea === "media" &&  (
                                        <>
                                            <input 
                                                type='text'
                                                placeholder="Please input a video link..."
                                                value={videoLink}
                                                onChange={(e)=> setVideoLink(e.target.value)}
                                            />
                                             {videoLink 
                                             
                                                && 
                                                <ReactPlayer width={'100%'} url={videoLink}/> 
                                            }
                                        
                                        </>
                                        )
                                    )}
                                    
                                    
                                </Editor>
                            </SharedContent>
                            <ShareCreation>
                                <AttachAssets>
                                    <AssetButton onClick={()=> switchAssetArea("image")}>
                                        <img src="/images/photo.svg" alt=""/>
                                    </AssetButton>
                                    <AssetButton onClick={()=> switchAssetArea("media")}>
                                        <img src="/images/video.svg" alt=""/>
                                    </AssetButton>
                                </AttachAssets>
                                    <ShareComment>
                                        { props.risk.value === "" ? (
                                            <AssetButton>
                                            
                                            Press Verify Risk
                                            </AssetButton>
                                        ):



                                            (<AssetButton>              
                                                                                        
                                            Calculated Risk: {props.risk.value}
                                            </AssetButton>)

                                    
                                        }
                                        
                                    </ShareComment>
                                    <PostButton disabled={!editorText ? true : false} onClick={(event)=> calRisk(event)}>
                                        Verify Risk
                                    </PostButton>
                                    <PostButton disabled={!editorText ? true : false} onClick={(event)=> postArticale(event)}>
                                        Post
                                    </PostButton>
                                    
                            </ShareCreation>
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
        height:40px;
        width:40px;
        min-width: auto;
        color: rgba(0,0,0,0.15);
        outline: none;
        border: none;
        svg,img{
            pointer-events: none;
        }

    }

`;

const SharedContent = styled.div`

    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    vertical-align: baseline;
    background: transparent;
    padding:8px 12px;

`;

const UserInfo = styled.div`

    display: flex;
    align-items: center;
    padding: 12px 24px;

    svg,img {
        width: 48px;
        height: 48px;
        background-clip: content-box;
        border: 2px solid transparent;
        border-radius: 50%;

    }

    span{
        font-weight: 600;
        font-size:16px ;
        line-height: 1.5;
        margin-left: 5px;
    }

`;

const ShareCreation = styled.div`

    display: flex;
    justify-content: space-between;
    padding: 12px 24px 12px 16px;

`;

const AssetButton = styled.button`
    
    display: flex;
    align-items: center;
    height: 40px;
    min-width:auto;
    color: rgba(0,0,0,0.5);



`;

const AttachAssets = styled.div`

    align-items: center;
    display: flex;
    padding-right:8px;
    ${AssetButton} {
        width:40px;             //40px in video problem with photo image
    }
`;

const ShareComment = styled.div`

    padding-left: 8px;
    margin-right: auto;
    border-left: 19x solid rgba(0,0,0,0.15);
    ${AssetButton} {
        svg{
            margin-right: 5px;
        }
    }
`;

const PostButton = styled.button`
    min-width:60px;
    border-radius:20px;
    padding-left:16px;
    padding-right: 16px;
    background: ${(props) => (props.disabled ? "rgba(0,0,0,0.8)" : "#0a66c2")};
    color: ${(props)=>(props.disabled ? "rgba(1,1,1,0.2)" : "white")};
    &:hover{
        background: ${(props)=> (props.disabled ? "rgba(0,0,0,0.08)" : "#004182")};
    }
`;

const Editor = styled.div`

    padding: 12px 24px;

    textarea{
        width: 100%;
        min-height: 100px;
        resize: none;

        &:first-child{
            min-height:40px;
        }
    }


    input{
        width:100%;
        height: 35px;
        font-size:16px;
        margin-bottom: 20px;

    }

`;
const UploadImage = styled.div`
    text-align:center;
    img{
        width: 100%;

    }
`;

const mapStateToProps = (state) =>{

    return {
        user:state.userState.user,
        userReg:state.registerState,
        risk: state.riskState,
    }
};

const mapDispatchToProps = (dispatch) =>({

    postArticale : (payload) => dispatch(postArticleAPI(payload)),
    notifyInvestor: (msg) => dispatch(notifyInvestor(msg)),
    calculateRisk: (des) => dispatch(riskCalculate(des)),
    resetRisk: ()=> dispatch(resetRisk())

});

export default connect(mapStateToProps,mapDispatchToProps)(PostModal);