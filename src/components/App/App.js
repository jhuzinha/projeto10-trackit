import Token from "../contexts/Token"
import Router from "../Routes/Router";
import { useState } from "react";
import UserImage from "../contexts/Image";
import { GlobalStyle } from '../../Assets/reset';
import Progressbar from "../contexts/ProgressBar";



export default function App() {
    const [token, setToken] = useState([]);
    const [userImage, setUserImage] = useState('')
    const [progress, setProgress] = useState(0)
    return (

        <Token.Provider value={{ token, setToken }}>
            <Progressbar.Provider value={{ progress, setProgress }}>
                <UserImage.Provider value={{ userImage, setUserImage }}>
                    <GlobalStyle />
                    <Router />
                </UserImage.Provider>
            </Progressbar.Provider>
        </Token.Provider>
    )
}