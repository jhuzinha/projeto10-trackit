import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nome, setNome] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();
    const newUser = {
        email,
        name: nome,
        image,
        password
    }

    function Submit(event) {
    
        event.preventDefault();
        
        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", newUser)
        request.then((res) =>
            {   
                console.log(res.data)
                navigate("/")
                
            }
        )
        request.catch((res)=> console.log(res.response.data) )
    
    }

    return (
        <>
            <Container>
                <figure>

                </figure>
                <Forms onSubmit={(e) => Submit(e)}>
                    <input type="email" id="email" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" id="password" placeholder="senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <input type="text" id="nome" placeholder="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                    <input type="url" id="image" placeholder="foto" value={image} onChange={(e) => setImage(e.target.value)} required />
                    <button type="submit"> Cadastrar </button>
                </Forms>
                <Link to="/"> <h6> Já tem uma conta? Faça login! </h6> </Link>
            </Container>
        </>
    )
}



const Container = styled.section`
    width: 100%;
    height: auto;
    text-align: center;
`

const Forms = styled.form`
    display: flex;
    flex-direction: column;

`