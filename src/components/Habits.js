import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import ShowCard from "./Card";
import axios from "axios";
import Token from "./contexts/Token";
import Header from "./Header";
import { BsTrash } from "@react-icons/all-files/bs/BsTrash";
import Menu from "./Menu";
import { ThreeDots } from  'react-loader-spinner';
import { createGlobalStyle } from "styled-components";

export default function Habits() {
    const [allHabits, setAllHabits] = useState([]);
    const [card, setCard] = useState(false);
    const { token } = useContext(Token);
    const [nameHabit, setNameHabit] = useState("");
    const [selectedDay, setSelectedDay] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const config = {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        const response = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
        response.then((res) => { setAllHabits(res.data); setLoading(false) })
        response.catch((res) => setLoading(false))
    }, [])


    return (
        <>
            <Header />
            <Container>
                <MenuHabits>
                    <h2> Meus hábitos </h2>
                    <button onClick={() => setCard(true)}> + </button>
                </MenuHabits>
                <div>
                    {
                        card ? <ShowCard 
                        setCard={setCard} 
                        setAllHabits={setAllHabits} 
                        allHabits={allHabits} 
                        nameHabit = {nameHabit} 
                        setNameHabit = {setNameHabit} 
                        selectedDay = {selectedDay} 
                        setSelectedDay = {setSelectedDay}/> : ''
                    }
                </div>
                <div>
                    {
                        loading ? <ThreeDots color="#126BA5" height={80} width={80} /> : ''
                    }

                    {
                        allHabits.length === 0 && !loading?
                            <WithoutHabits /> :
                            <ExistHabits allHabits={allHabits} token={token} setAllHabits={setAllHabits} />
                    }
                </div>
            </Container>
            <Menu />
        </>
    )
}


function deleteHabit(habit, token, allHabits, setAllHabits) {
    const confirm = window.confirm("Voce tem certeza que deseja excluir este item?")
    if(confirm) {
    const response = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}`, {
        data: { habit }, headers: {
            "Authorization": "Bearer " + token
        }
    })
    response.then(() => {const newHabits = allHabits.filter((all) => all.id !== habit.id); 
       setAllHabits(newHabits) })
    response.catch((res) => console.log(res.response.data))}

}


function ExistHabits({ allHabits, token, setAllHabits }) {
    const days = ["D", "S", "T", "Q", "Q", "S", "S"];
    return (
        <>
            {allHabits.map((habit) => {
                return (
                    <>
                    <GlobalStyle />
                    <CardHabit key={habit.id}>
                        <li>
                            <NameHabitCard>{habit.name}</NameHabitCard>
                            <BsTrash onClick={() =>  deleteHabit(habit, token, allHabits, setAllHabits)} />
                        </li>
                        <div>
                            {days.map((day, index) => { return ((habit.days).includes(index) ? 
                            <DaySelect background={"#cfcfcf"} cor={'#FFFFFF'} key={index}>{day}</DaySelect> : 
                            <DaySelect cor={'#666666'} background={"#ffffff"}  key={index}>{day}</DaySelect>) })}
                        </div>
                    </CardHabit>
                    </>            
                )
            })
            }
        </>
    )
}

function WithoutHabits() {
    return (
        <div>
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
        </div>
    )
}

const CardHabit = styled.div`
    background: #FFFFFF;
    border-radius: 5px; 
    margin-bottom: 10px;
    padding: 15px;
    display: flex;
    flex-direction: column;

    li {
        font-size: 20px;  
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        word-wrap: break-word;
    }
`

const GlobalStyle = createGlobalStyle`
body {
    background-color:  #F2F2F2;
}
`

const DaySelect = styled.button`
    margin-right: 4px;
    background: ${(props) => props.background};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    color: ${(props) => props.cor};
    width: 30px;
    height: 30px;
`

const Container = styled.section`
    width: 100%;
    height: auto;
    padding: 0 17px 0 17px;
    color: #666666;
    font-size: 18px;
`

const MenuHabits = styled.div`
    margin: 28px 0 28px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
        font-size: 23px;
        color: #126BA5;
    }

    button {
        border: none;
        background: #52B6FF;
        border-radius: 4.63636px;
        color: white;
        width: 40px;
        height: 35px;
        font-size: 27px;

    }

`

const NameHabitCard = styled.div`
    width: 90%;
    word-wrap: break-word;
    height: auto;
`