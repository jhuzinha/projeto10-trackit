import { useState } from "react"
import styled from "styled-components"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Token from "../components/contexts/Token";
import logo from "../Assets/images/Logo.png"
import UserImage from "./contexts/Image";
import { ThreeDots } from  'react-loader-spinner';


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setToken } = useContext(Token);
    const { setUserImage } = useContext(UserImage);
    const [loading, setLoading] = useState(false);
    const [disable, setDisable] = useState(false);
    

    
    
    function getIn(event){
        event.preventDefault();
        setLoading(true);
        setDisable(true);
        const User = {
            email,
            password
        }
        
        const promisse = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", User)
        promisse.then((res) =>
            {
            setToken(res.data.token);
            setUserImage(res.data.image)
            navigate("/hoje")
            }
        )
        promisse.catch(
            (res) => {alert(res.response.data.message);
            setLoading(false);
            setDisable(false);}
        )
    }

    return (
            <ContainerLogin>
                <figure>
                    <img src={logo} alt="logo" />
                </figure>
                <Forms onSubmit={(e) => getIn(e)}>
                    <input type="email" id="email" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} required  disabled= {disable}/>
                    <input type="password" id="password" placeholder="senha" value={password} onChange={(e) => setPassword(e.target.value)} required disabled= {disable}/>
                    {loading ?	<div> <ThreeDots color="white" height={40} width={40} /> </div> : <button type="submit"> Entrar </button>}
                </Forms>
                <Link to="/cadastro"> <p>Não tem uma conta? Cadastre-se!</p> </Link>
            </ContainerLogin>
    )
}

const ContainerLogin = styled.section`
    min-height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: auto;
    text-align: center;
    
    figure {
        margin-top: 68px;
        margin-bottom: 32px;
    }
    p {
        color: #52B6FF;
        font-size: 14px;
        text-decoration: underline;
    }
`

const Forms = styled.form`
    display: flex;
    flex-direction: column;
    margin: 0 36px 0 36px;
    input {
        border: #D4D4D4;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        height: 45px;
        margin-bottom: 6px;
        padding: 11px;
        color: black;
        font-size: 20px;
    }
    
    input:focus {
        outline: 1px solid #126BA5;
    }

    button {
        border: none;
        background: #52B6FF;
        border-radius: 4.63636px;
        height: 45px;
        font-size: 20px;
        color: #ffffff;
        margin-bottom: 25px;
    }

    div {
        background: #52B6FF;
        opacity: 0.7;
        border-radius: 4.63636px;
        height: 45px;
        margin-bottom: 25px;
        display: flex;
        justify-content: center;
    }
`