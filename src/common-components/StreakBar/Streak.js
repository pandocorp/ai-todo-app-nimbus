import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import './streak.css'

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', margin: '0px 5px' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: '#ffffff', fontWeight: '600' }}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default function Streak(props) {

  const [streakInfo, setSreakInfo] = useState([])

  useEffect(() => {
    if (props.data?.percentages?.length) {
        setSreakInfo(props?.data?.percentages)
    } else {
        setSreakInfo([])
    }
  }, [props.data])

  return (
    <>
        <Typography sx={{fontWeight: 600, marginBottom: '5px', textAlign: 'center'}}>Last 7 Days Streak</Typography>
        <div style={{display: 'flex', alignItems: 'center'}}>
            {streakInfo && streakInfo.length && streakInfo.map((streak, index) => {
                return (
                    <>
                        {streak === 100 ? <CheckCircleOutlineIcon sx={{height: '45px', width: '45px', margin: '0px 5px'}} /> : <CircularProgressWithLabel value={streak} /> }
                    </>
                )
            })}
        </div>
    </>
  );
}