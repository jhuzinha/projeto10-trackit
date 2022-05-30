import styled from "styled-components";
import Menu from "./Menu";
import Header from "./Header";
import { createGlobalStyle } from "styled-components";

export default function History() {
    return (
        <>  
            <GlobalStyle />
            <Header />
            <Container>
                <h1> Histórico </h1>
                <p> Em breve você poderá ver o histórico dos seus hábitos aqui! </p>
            </Container>
            <Menu />
        </>
    )

}



const GlobalStyle = createGlobalStyle`
body {
    background-color:  #F2F2F2;
}
`
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