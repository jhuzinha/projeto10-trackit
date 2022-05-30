import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/images/Logo.png";
import { ThreeDots } from  'react-loader-spinner';
import { createGlobalStyle } from 'styled-components';


export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nome, setNome] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [disable, setDisable] = useState(false);

    const newUser = {
        email,
        name: nome,
        image,
        password
    }

    function Submit(event) {
        event.preventDefault();
        setLoading(true);
        setDisable(true);
        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", newUser)
        request.then((res) =>
            {   
                navigate("/")
                
            }
        )
        request.catch((res)=> {alert(res.response.data.message);setLoading(false); setDisable(false)})
    
    }

    return (
        <>
        <GlobalStyle />
            <Container>
                <figure>
                    <img src={logo} alt="logo" />
                </figure>
                <Forms onSubmit={(e) => Submit(e)}>
                    <input type="email" id="email" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} required disabled = {disable} />
                    <input type="password" id="password" placeholder="senha" minLength={3} value={password} onChange={(e) => setPassword(e.target.value)} required disabled = {disable}/>
                    <input type="text" id="nome" placeholder="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                    <input type="url" id="image" placeholder="foto" value={image} onChange={(e) => setImage(e.target.value)} required />
                    {
                       loading ? <div> <ThreeDots color="white" height={40} width={40} /> </div> : <button type="submit"> Cadastrar </button> 
                    }
                </Forms>
                <Link to="/"> <h6> Já tem uma conta? Faça login! </h6> </Link>
            </Container>
        </>
    )
}

const GlobalStyle = createGlobalStyle`
body {
    background-color: white;
}
`

const Container = styled.section`
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

    h6 {
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
        color: black;
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