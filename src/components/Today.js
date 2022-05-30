import styled from "styled-components";
import Header from "./Header";
import Menu from "./Menu";
import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';
import axios from "axios";
import Token from "./contexts/Token";
import { useContext, useState, useEffect } from "react";
import { BsCheckLg } from "react-icons/bs";
import { ThreeDots } from 'react-loader-spinner';
import Progressbar from "./contexts/ProgressBar";
import { createGlobalStyle } from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";


export default function Today() {
    const days = dayjs().locale('pt-br').format('dddd, DD/MM');
    const dayofWeek = days[0].toUpperCase() + days.substring([1]);
    const { token } = useContext(Token);
    const { progress, setProgress } = useContext(Progressbar);
    const [habitsToday, setHabitsToday] = useState([]);
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate();

    attProgress(habitsToday,setProgress)
    useEffect(() => {
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
        request.then((res) => { setHabitsToday(res.data) })
        request.catch((res) => { alert("Token Inválido"); navigate("/")})
    }, [])
    
    

    return (
        <>
            <GlobalStyle />
            <Header />
            <Container>
                <MenuHoje>
                    <h2>{dayofWeek} </h2>
                    {habitsToday.length === 0 ? '' :
                    
                     progress === 0 ? <p> Nenhum hábito concluído ainda </p>  : <p><Span> {progress.toFixed(0)}% dos habitos concluidos</Span></p>  }
                </MenuHoje>
                {habitsToday.length === 0 ? 
                    <ThreeDots color="#126BA5" height={80} width={80} /> 
                    :
                    <div> {habitsToday.map((habit, index) => {
                        return (
                            <CardToday key={index}>
                                <ul>
                                    <Title> {habit.name} </Title>
                                    {habit.done?  <p> Sequência atual: <Span>{habit.currentSequence}{habit.currentSequence === 1 && habit.currentSequence === 0 ? "dia" : "dias" }</Span> </p>  : <p> Sequência atual:{habit.currentSequence} {habit.currentSequence === 1 && habit.currentSequence === 0 ? "dia" : "dias" } </p> }
                                   
                                    { (habit.currentSequence === habit.highestSequence && habit.highestSequence !== 0 ) ? <p> Seu recorde: <Span> {habit.highestSequence} {habit.currentSequence === 1 && habit.currentSequence === 0 ? "dia" : "dias" } </Span> </p> : <p> Seu recorde: {habit.highestSequence} {habit.currentSequence === 1 && habit.currentSequence === 0 ? "dia" : "dias" } </p> }
                                </ul>
                                
                                {
                                    habit.done ?
                                    <CheckCard background={"#8FC549"} onClick= {() => notDoHabit(token, habit.id, setHabitsToday, setDisable, setProgress, habitsToday) } disabled={disable} > <BsCheckLg size="2em" />  </CheckCard> :

                                    <CheckCard background={"#EBEBEB"} onClick= {() => doHabit(token, habit.id, setHabitsToday, setDisable, setProgress, habitsToday)} disabled={disable} > <BsCheckLg size="2em" /> </CheckCard>
                                }
                            </CardToday>
                        )


                    })} </div>}
            </Container>
            <Menu />
        </>
    )
}

function doHabit(token, id, setHabitsToday, setDisable, setProgress, habitsToday) {
    setDisable(true)

    const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, [],{
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    request.then(() => {    
    const promisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    promisse.then((res) => { setHabitsToday(res.data); attProgress(habitsToday,setProgress); setDisable(false)})
    promisse.catch((res) => { alert(res.response.data.message); setDisable(false)})
})
    request.catch((res) => {alert(res.response.data.message); setDisable(false)})
}

function notDoHabit(token, id, setHabitsToday, setDisable, setProgress, habitsToday) {
    setDisable(true)

    const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,[] ,{
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    request.then(() => {    
        const promisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    promisse.then((res) => { setHabitsToday(res.data); attProgress(habitsToday,setProgress); setDisable(false)})
    promisse.catch((res) => { alert(res.response.data.message); setDisable(false)})
})
    request.catch((res) => {alert(res.response.data.message); setDisable(false)})
}


function attProgress(habitsToday,setProgress){
    let allIt = habitsToday.length;
    let doIt = habitsToday.filter((habit) => habit.done === true);
    let division = doIt.length / allIt  
    let total = division * 100
    setProgress(total)
}

const Container = styled.div` 
    width: 100%;
    height: auto;
    padding: 0 17px 0 17px;
`
const MenuHoje = styled.div`
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

const Span = styled.span`
    color: #8FC549;

`

const GlobalStyle = createGlobalStyle`
body {
    background-color:  #F2F2F2;
}
`


const CardToday = styled.div` 
    color: #666666;
    background: #FFFFFF;
    border-radius: 5px;
    height: auto;
    width: 100%;
    
    word-wrap: break-word;
    font-size: 13px;
    margin-bottom: 10px;
    display: flex;
    padding: 10px;
    justify-content: space-between;
    ul {
        width: 75%;
    }
`

const Title = styled.h5`
    font-size: 20px;
    margin-bottom: 10px;
    word-wrap: break-word;
    width: 70%;



`

const CheckCard = styled.button`
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 69px;
    min-height: 69px;
    width: 69px;
    height: 69px;
    background: ${(props) => props.background};
    border-radius: 5px;
    color: white;
`