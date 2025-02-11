import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { CustomCard } from '@tsamantanis/react-glassmorphism';
import MyStopwatch from '../Timer/StopWatch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function DraggableDialog(props) {
  const [bounds, setBounds] = useState({ left: 0, top: 0, right: 0, bottom: 0 });
  const [timeStamp, setTimeStamp] = useState(0);
  const draggableRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, []);

  useEffect(() => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 1500);
    setTimeStamp(time)
    if (timerRef.current) {
      timerRef.current.start();
    }
  }, [])

  const updateBounds = () => {
    const cardWidth = 500; // Adjust based on actual width
    const cardHeight = 200; // Adjust based on actual height
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    setBounds({
      left: 0,
      top: 0,
      right: viewportWidth - cardWidth,
      bottom: viewportHeight - cardHeight,
    });
  };

  const triggerExpire = (event) => {
    props.triggerExpire(event)
  }

  return (
    <>
      {/* Prevent scrolling */}
      <style>
        {`
          body {
            overflow: hidden;
          }
        `}
      </style>
      <Draggable
        nodeRef={draggableRef}
        bounds={bounds} // Restrict movement inside viewport
      >
        <div ref={draggableRef} style={{ position: 'fixed', top: '10%', left: '0' }}>
          <CustomCard
            effectColor="rgba(255, 255, 255, 0.1)"
            color="#ffffff"
            blur={10}
            borderRadius={0}
            style={{ width: '500px', padding: '10px' }}
          >
            <FormControlLabel control={<Switch />} sx={{color: '#ffffff', fontWeight: '600'}} label="Notifications" />
            <FormControlLabel control={<Switch />} sx={{color: '#ffffff', fontWeight: '600'}} label="Social Media" />
            <MyStopwatch ref={timerRef} key={JSON.stringify(timeStamp)} triggerExpire={triggerExpire} expiryTimestamp={timeStamp} />
          </CustomCard>
        </div>
      </Draggable>
    </>
  );
}
