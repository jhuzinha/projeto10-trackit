import styled from "styled-components";
import Menu from "./Menu";
import Header from "./Header";


export default function History() {
    return (
        <>
            <Header />
            <Container>
                <h1> Histórico </h1>
                <p> Em breve você poderá ver o histórico dos seus hábitos aqui! </p>
            </Container>
            <Menu />
        </>
    )

}


const Container = styled.div`
    width: 100%;
    height: auto;
    padding: 0 17px 0 17px;
    color: #666666;
    font-size: 18px;

    h1{
        font-size: 23px;
        color: #126BA5;
        margin: 28px 0 28px 0;
    }
`