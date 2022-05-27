import { useState, useContext } from "react";
import styled from "styled-components";
import ShowCard from "./Card";
import axios from "axios";
import Token from "./contexts/Token";


export default function Habits() {
    const [allHabits, setAllHabits] = useState([]);
    const [card, setCard] = useState(false);
    const { token } = useContext(Token);



    return (
        <Container>
            <div>
                <h2> Meus hábitos </h2>
                <button onClick={() => setCard(true)}> + </button>
            </div>
            <div>
                {
                    card ? <ShowCard setCard={setCard} /> : ''
                }
            </div>
            <div>
                {
                    allHabits.length === 0 ? <WithoutHabits /> : ''
                }
            </div>
        </Container>
    )
}

function WithoutHabits() {
    return (
        <div>
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
        </div>
    )
}


const Container = styled.section`
    width: 100%;
    height: auto;
    
`