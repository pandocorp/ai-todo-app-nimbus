import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Header from '../Header/Header';
import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { UpdateUserFunction } from '../../features/HomePageSlice';
export default function LayoutWrapper(props) {
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.removeItem('global_session_id')
  }, [])

  useEffect(() => {
    if (location.pathname === '/login') {
      setShowHeader(false)
    } else {
      setShowHeader(true)
    }
  }, [location])

  const setUserPreference = (event) => {
    const formattedData = {
      "preference": event,
    }
    dispatch(UpdateUserFunction({body: formattedData})).then(res => {
      
    }).catch(err => {

    })
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {showHeader && <Header key={JSON.stringify(window.location.pathname)} setUserPreference={setUserPreference}  />}
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '70px' }}>
        { props.children }
      </Box>
    </Box>
  );
}
