import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Menu() {
    return (
        <>
            <Footer>
                <Link to="/habitos"><h2> Hábitos </h2></Link>
                <>
                </>
                <h2><Link to="/historico"> Histórico </Link></h2>
            </Footer>
        </>
    )
}

const Footer = styled.footer`
    position: fixed;
    bottom: 0;
    left: 0;
    height: 70px;
    width: 100%;
    background: #FFFFFF;
    color: #52B6FF;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    padding: 0 31px 0 31px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.15);
    align-items: center;

    h2 {
        text-decoration: none;
    }
`