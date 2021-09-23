import styled from 'styled-components';
const PostModal = (props) => {
    return (
        <Container>
                <Content>
                    <Header>
                        <h2>Create a post</h2>
                        <button>
                            <img src="/images/close-icon.svg" alt=""/>
                        </button>
                    </Header>
                    <SharedContent>
                        <UserInfo>
                            <img src="/images/user.svg" alt=""/>
                            <span>Name</span>
                        </UserInfo>
                    </SharedContent>
                    <ShareCreation>
                        <AttachAssets>
                            <AssetButton>
                                <img src="/images/share-icon.svg" alt=""/>
                            </AssetButton>
                            <AssetButton>
                                <img src="/images/photo.svg" alt=""/>
                            </AssetButton>
                        </AttachAssets>
                    </ShareCreation>
                </Content>
        </Container>
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
        svg{
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

`;

const AttachAssets = styled.div``;
export default PostModal;