/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import NimbusLogo from '../../assets/icons/icon-nimbus-logo.png';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { MenuItem, Typography, Menu } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import './header.css';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backdropFilter: 'blur(5px)', // Glass effect blur
  backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent background
  // borderRadius: '10px', // Rounded corners
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
  // border: '1px solid rgba(255, 255, 255, 0.2)', // Border for glassmorphism
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Header = (props) => {
    const navigate = useNavigate();
    const [options, setOptions] = useState([])
    const [preference, setPreference] = useState('Eisenhower Matrix')
    const [menuAnchor, setMenuAnchor] = useState(null)

    useEffect(() => {
      setOptions([
        {
          id: 2,
          label: 'Pareto Analysis 80/20 rule',
          value: 'Pareto Analysis 80/20 rule',
        },
        {
          id: 3,
          label: 'Eisenhower Matrix',
          value: 'Eisenhower Matrix'
        },
        {
          id: 4,
          label: 'Eat the Frog',
          value: 'Eat the Frog'
        },
        {
          id: 5,
          label: "Parkinson's Law",
          value: "Parkinson's Law"
        }
      ])
    }, [])

    const handlePreference = (event) => {
      setPreference(event.target.value)
      props.setUserPreference(event.target.value)
    }

    const handleClose = () => {
      localStorage.clear();
      navigate('/login')
      setMenuAnchor(null)
    }

    return (
        <AppBar position="fixed">
        <Toolbar>
            <img style={{marginLeft: '90px', position: 'absolute', top: '-24px'}} src={NimbusLogo} alt="nimbus logo" height={'120px'} width={'120px'} />
            <div style={{position: 'absolute', right: 20, display: 'flex', alignItems: 'center'}}>
              <Typography sx={{marginRight: '10px', display: 'flex', alignItems: 'center', fontWeight: '600'}} onClick={(event) => {setMenuAnchor(event.currentTarget)}}><AccountCircleIcon sx={{color: '#ffffff', marginRight: '10px'}} /> {localStorage.getItem('mailId')}</Typography>
              <FormControl size='small' sx={{width: '250px',}}>
                <InputLabel htmlFor="demo-simple-select-labe" sx={{color: '#ffffff'}}>Preference</InputLabel>
                <Select
                sx={{color:'#ffffff'}}
                value={preference}
                label="Preference"
                onChange={handlePreference}
                >
                  {options.map((option, index) => {
                    return(
                        <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
              <Menu
                id="menu-appbar"
                anchorEl={menuAnchor}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                keepMounted
                sx={{top: '50px', width: '300px'}}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                open={Boolean(menuAnchor)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    )
}

export default Header;