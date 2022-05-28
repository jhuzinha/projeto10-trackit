import Token from "../contexts/Token"
import Router from "../Routes/Router";
import { useState } from "react";
import UserImage from "../contexts/Image";

export default function App() {
    const [token, setToken] = useState('');
    const [userImage, setUserImage] = useState('')
    return (
    
        <Token.Provider value={{token, setToken}}>
            <UserImage.Provider value = {{userImage, setUserImage}}>
                <Router />
            </UserImage.Provider>
        </Token.Provider>
    )
}