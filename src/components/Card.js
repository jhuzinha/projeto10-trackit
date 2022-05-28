
import styled from "styled-components";
import { useContext } from "react";
import Token from "./contexts/Token";
import axios from "axios";



export default function ShowCard({setCard, setAllHabits, allHabits, nameHabit, setNameHabit, selectedDay, setSelectedDay}) {
    const days = ["D", "S", "T", "Q", "Q", "S", "S"];
    const { token } = useContext(Token);
    // const selectedDaySerializado = JSON.stringify(selectedDay);
    // const nameHabitSerializado = JSON.stringify(nameHabit);


    const config = {
        headers: {
            "Authorization": "Bearer " + token
        }
    }

    function toggle(index) {
        const selected = selectedDay.includes(index);
        if (!selected) {
            setSelectedDay([...selectedDay, index]);
        } else {
            const newDays = selectedDay.filter((day) => day !== index);
            setSelectedDay(newDays);
        }

    }

    return (
        <Card>
            <input placeholder="nome do hábito" type="text" name="nome" value={nameHabit} id="" onChange={(e) => setNameHabit(e.target.value)} required />
            <ButtonsDays>
                {days.map((day, index) => 
                { return ( selectedDay.includes(index)? <DaySelect background = {"#cfcfcf"} onClick={() => { toggle(index) }} key={index}> {day} </DaySelect> :
                <DaySelect background = {"#ffffff"} onClick={() => { toggle(index) }} key={index}> {day} </DaySelect>
                ) })}
            </ButtonsDays>
            <Confirm> 
                <button onClick={() => setCard(false)}> Cancelar </button>
                <button onClick={() => {createHabit(config , nameHabit, selectedDay, setAllHabits, allHabits, setSelectedDay, setNameHabit); setCard(false)}}> Salvar </button>
            </Confirm>
        </Card>
    )
}


function createHabit(config , nameHabit, selectedDay, setAllHabits, allHabits, setSelectedDay, setNameHabit ){
    const body = {
        name: nameHabit,
        days: selectedDay
    }
    const response = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config)
    response.then (
        (res) => { setAllHabits([...allHabits, res.data]);
             setSelectedDay([]); setNameHabit("") })
    response.catch ( (res) =>
        alert(res.response.data)
    )
}

const Card = styled.div`
    background: #FFFFFF;
    border-radius: 5px;
    width: 100%;
    height: 180px;
    display: flex;
    flex-direction: column;
    margin-bottom: 29px;

    input {
        border: #D4D4D4;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        height: 45px;
        margin: 19px 19px 9px 19px;
        padding: 11px;
        color: black;
        font-size: 20px;
    }
`

const ButtonsDays = styled.div ` 
    margin: 0 0 28px 19px;
`
const DaySelect = styled.button `
    margin-right: 4px;
    background: ${(props) => props.background};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    color: #666666;
    width: 30px;
    height: 30px;
`

const Confirm = styled.div`
    margin:  0 19px 0 19px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    && :nth-child(1){
        border: none;
        color: #52B6FF;
        background-color: white;
        font-size: 16px; 
        margin-right: 18px;
    }

    && :nth-child(2){
        border: none;
        background: #52B6FF;
        border-radius: 4.63636px;
        height: 35px;
        font-size: 16px;
        color: #ffffff;
        padding: 0 17px 0 17px;
    }

`