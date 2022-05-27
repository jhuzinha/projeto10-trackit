
import styled from "styled-components";
import { useContext, useState } from "react";
import Token from "./contexts/Token";
import axios from "axios";


export default function ShowCard({setCard}) {
    const days = ["D", "S", "T", "Q", "Q", "S", "S"];
    const [selectedDay, setSelectedDay] = useState([])
    const { token } = useContext(Token);
    const [nameHabit, setNameHabit] = useState("");
    
    const config = {
        headers: {
            "Authorization": "Bearer " + token
        }
    }

    function toggle(index) {
        const selected = selectedDay.includes(index)
        if (!selected) {
            setSelectedDay([...selectedDay, index])
        } else {
            const newDays = selectedDay.filter((day) => day !== index)
            setSelectedDay(newDays)
        }

    }

    return (
        <Card>
            <input placeholder="nome do hábito" type="text" name="nome" value={nameHabit} id="" onChange={(e) => setNameHabit(e.target.value)} required />
            <div>
                {days.map((day, index) => { return (<button onClick={() => { toggle(index) }} key={index}> {day} </button>) })}
            </div>
            <div> 
                <button onClick={() => setCard(false)}> Cancelar </button>
                <button onClick={() => createHabit(config , nameHabit, selectedDay)}> Salvar </button>
            </div>
        </Card>
    )
}


function createHabit(config , nameHabit, selectedDay ){
    const body = {
        name: nameHabit,
        days: selectedDay
    }
    const response = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config)
    response.then (
        (res) => console.log(res.data)
    )
    response.catch ( (res) =>
        console.log(res.response.data)
    )
}

const Card = styled.div`
    background-color: red;
    width: 100%;
    height: auto;
`