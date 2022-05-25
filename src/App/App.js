import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/Login"
import Register from "../components/Register"
import Habits from "../components/Habits"
import Today from "../components/Today"
import History from "../components/History"


export default function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/cadastro" element={<Register />}/>
                <Route path="/habitos" element={<Habits />}/>
                <Route path="/hoje" element={<Today />}/>
                <Route path="/historico" element={<History />}/>
            </Routes>
        </BrowserRouter>
    )
}