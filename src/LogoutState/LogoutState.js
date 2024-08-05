import Header from '../components/Header'
import { useState } from 'react'
import JoinEventList from '../components/JoinEventList'
import PopUpPage from '../components/PopUpPage'
function LogoutState({setIsLogin, isLogin}) {
    const [load, setLoad] = useState(false);
    const [EventInfo, setEventInfo] = useState([]);
    return (<div>
        <Header setIsLogin = {setIsLogin} isLogin = {isLogin}/>
        <br></br>
        Please Login to join/add an event
        <br></br>
        <br></br>
        <PopUpPage setLoad={setLoad} setEventInfo={setEventInfo} isLogin = {isLogin}/>
        <JoinEventList load={load} setLoad={setLoad} EventInfo={EventInfo} setEventInfo={setEventInfo} isLogin = {isLogin}/>

        
        
        </div>
    )
}
export default LogoutState