import UserInfo from './UserInfo'
import PopUpPage from '../components/PopUpPage'
import Header from '../components/Header'
import { useState } from 'react'
import JoinEventList from '../components/JoinEventList'
function LoginState({setIsLogin, isLogin}) {
    const [load, setLoad] = useState(false);
    const [EventInfo, setEventInfo] = useState([]);
    return (
        <div>
            <Header setIsLogin = {setIsLogin} isLogin = {isLogin}/>
            <UserInfo  />
            <PopUpPage setLoad={setLoad} setEventInfo={setEventInfo} isLogin = {isLogin}/>
            <JoinEventList load={load} setLoad={setLoad} EventInfo={EventInfo} setEventInfo={setEventInfo} isLogin = {isLogin}/>
        </div>
    )


}
export default LoginState
