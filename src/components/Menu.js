import styled from "styled-components";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { useContext } from "react";
import Progressbar from "./contexts/ProgressBar";

export default function Menu() {
    const { progress } = useContext(Progressbar)

    return (
        <>
            <Footer>
                <Link style={{ textDecoration: 'none' }} to="/habitos"><h2> Hábitos </h2></Link>
                <Link to="/hoje"><div> 
                    <CircularProgressbar
                        value={progress}
                        text={"Hoje"}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: "#52B6FF",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent"
                        })}
                    />
                </div> </Link>


                <Link style={{ textDecoration: 'none' }} to="/historico"> <h2> Histórico</h2> </Link>
            </Footer>
            <Spacing></Spacing>
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
    display: flex;
    justify-content: space-between;
    padding: 0 31px 18px 31px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.15);
    align-items: center;

    h2 {
        color: #52B6FF;
        font-size: 18px;
    }

    div {
        width: 78px;
        height: 78px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

`

const Spacing = styled.div`
    margin-top: 120px;

`