import styled from "styled-components";
import UserImage from "./contexts/Image";
import { useContext } from "react";

export default function Header(){
    const { userImage } = useContext(UserImage);
    return(
        <Head>
            <h1> TrackIt </h1>
            <Image userImage = {userImage}></Image>
        </Head>
    )
}


const Head = styled.header`
    height: 70px;
    background-color: #126BA5;
    width: 100%;
    display: flex;
    padding: 18px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    justify-content: space-between;
    align-items: center;

    h1 {
        font-size: 40px; 
        font-family: 'Playball', cursive;
        color: white;
    }
`

const Image = styled.div` 
    background: url(${(props) => props.userImage});
    border-radius: 98.5px;
    background-color: red;
    width: 51px;
    height: 51px;
`