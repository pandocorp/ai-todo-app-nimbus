import React, { useImperativeHandle, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import { Button } from '@tsamantanis/react-glassmorphism';

const MyStopwatch = React.forwardRef(({expiryTimestamp, triggerExpire}, ref) => {
  const {
    // totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    // isRunning,
    start,
    // pause,
    // resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () =>  triggerExpire(true)});

  useImperativeHandle(ref, () => ({
    start, // Expose the `start` method through the `ref`
  }));

  useEffect(() => {
    // Start the stopwatch when the component mounts if desired
    start();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once.

  return (
    <div style={{textAlign: 'center'}}>
      <div style={{fontSize: '100px'}}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <Button text='Restart' onClick={() => {
        // Restarts to 5 minutes timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + 1500);
        restart(time)
      }}></Button>
    </div>
  );
});

export default MyStopwatch;
