import logo from './logo.svg'
import { useState, useEffect } from 'react'
import { gapi } from 'gapi-script'
import './App.css'
import LoginState from './LoginState/LoginState'
import LogoutState from './LogoutState/LogoutState'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#858B43"
      },
      secondary: {
        main: "#CBD315"
      }
    }
  });

  const [profile, setProfile] = useState(null)
  const [isLogin, setIsLogin] = useState(false)
  const clientId = '527867180672-h06m9gpub2bevgcds2epilqr2ubeeudt.apps.googleusercontent.com'
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      })
    }
    gapi.load('client:auth2', initClient)
    // if(profile!=null){
    //   console.log('{profile.imageUrl}: ',profile.imageUrl)
    // }
    
  })
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <ThemeProvider theme={theme}>
    <div className='App'>
      {
      // localStorage.getItem("googleId")!=null
      isLogin ?
        (<LoginState setIsLogin = {setIsLogin} isLogin = {isLogin}/>) :
        (<LogoutState setIsLogin = {setIsLogin} isLogin = {isLogin}/>)
      }
    </div>
    </ThemeProvider>
    </LocalizationProvider>
    
  )

}

export default App
