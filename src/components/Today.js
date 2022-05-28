import styled from "styled-components"
import Header from "./Header"
import Menu from "./Menu"

export default function Today(){
    return (
        <>
        <Header />
        <Container>
            <MenuHoje> 
                <h2> Segunda, 17/05 </h2>
                <p> Nenhum hábito concluído ainda </p>
            </MenuHoje>

        </Container>
        <Menu />
        </>

    )
}


const Container = styled.div ` 
    width: 100%;
    height: auto;


`

const MenuHoje = styled.div`
    padding: 0 17px 0 17px;
    margin: 28px 0 28px 0;
    p {
        font-size: 17.976px;
        color: #BABABA;
        margin-top: 8px;
    }

    h2 {
        color: #126BA5;
        font-size: 22.976px;
    }

`