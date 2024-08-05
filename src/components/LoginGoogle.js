import { GoogleLogin } from 'react-google-login'
function LoginGoogle({setIsLogin}) {
    const clientId = '527867180672-h06m9gpub2bevgcds2epilqr2ubeeudt.apps.googleusercontent.com'
    const onSuccess = res => {
        // console.log('success:', res)
        setIsLogin(true)
        localStorage.setItem('googleId',res.profileObj.googleId)
        localStorage.setItem('imageUrl',res.profileObj.imageUrl)
        localStorage.setItem('email',res.profileObj.email)
        localStorage.setItem('name',res.profileObj.name)
        localStorage.setItem('givenName',res.profileObj.givenName)
        localStorage.setItem('familyName',res.profileObj.familyName)
      }
      const onFailure = err => {
        console.log('failed:', err)
      }
    return (
        <GoogleLogin
          clientId={clientId}
          ButtonText='Sign in with Google'
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
    )
}
export default LoginGoogle