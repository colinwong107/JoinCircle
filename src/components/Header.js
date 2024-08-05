import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import LogoutGoogle from './LogoutGoogle'
import LoginGoogle from "./LoginGoogle"

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Header({setIsLogin, isLogin}) {
    return (
        <AppBar position="static" >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ 
                        mr: 1}} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        // href="/"
                        sx={{
                            mr: 2,
                            // display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        JoinCircle
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    {isLogin ?
        (<LogoutGoogle setIsLogin = {setIsLogin} />  ) :
        (<LoginGoogle setIsLogin = {setIsLogin} />)
    }
                    
                        {/* <h3>Hello {profile.name} &nbsp;</h3>
                        <Tooltip >
                            <IconButton
                                sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src={profile.imageUrl} />
                            </IconButton>
                        </Tooltip> */}

                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;