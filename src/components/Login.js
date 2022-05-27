import { useState } from "react"
import styled from "styled-components"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Token from "../components/contexts/Token";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setToken } = useContext(Token)

    function getIn(event){
        event.preventDefault();
        const User = {
            email,
            password
        }
        
        const promisse = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", User)
        promisse.then((res) =>
            {
            setToken(res.data.token)
            navigate("/habitos")
            }
        )
        promisse.catch(
            (res) =>console.log(res.response.data)
        )
    }

    return (
        <>
            <ContainerLogin>
                <figure>
                </figure>
                <Forms onSubmit={(e) => getIn(e)}>
                    <input type="email" id="email" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" id="password" placeholder="senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit"> Entrar </button>
                </Forms>
                <Link to="/cadastro"> Não tem uma conta? Cadastre-se! </Link>
            </ContainerLogin>

        </>
    )
}

const ContainerLogin = styled.section`
    width: 100%;
    height: auto;
    text-align: center;
`

const Forms = styled.form`
    display: flex;
    flex-direction: column;
`