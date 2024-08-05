import { GoogleLogout } from 'react-google-login'
function LogoutGoogle({setIsLogin}) {
    const clientId = '527867180672-h06m9gpub2bevgcds2epilqr2ubeeudt.apps.googleusercontent.com'
    const logOut = () => {
        console.log('logout')
        setIsLogin(false)
        localStorage.clear();
      }
    return (
      <div>
        <GoogleLogout
        clientId={clientId}
        ButtonText='Log out'
        onLogoutSuccess={logOut}
      />
      </div>
    )
}
export default LogoutGoogle