import Token from "../contexts/Token"
import Router from "../Routes/Router";
import { useState } from "react";

export default function App() {
    const [token, setToken] = useState('');
    return (
        <Token.Provider value={{token, setToken}}>
            <Router />
        </Token.Provider>
    )
}