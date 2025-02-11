/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import LaptopShut from '../../assets/icons/icon-laptop-shut.gif';
import { IconButton, Divider, Typography, useTheme } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Button } from '@tsamantanis/react-glassmorphism';
import CloseIcon from '@mui/icons-material/Close';
import IconClock from '../../assets/icons/icon-break-start.gif';

const WarnDialog = React.memo((props) => {
    const theme = useTheme();  // Get theme for responsive design

    const updateTaskStatus = (status) => {
        props.updateTaskStatus(status);
    };

    return (
        <Dialog open={props.open} className="center-popper" fullWidth>
            {/* Close Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
                <IconButton onClick={() => updateTaskStatus(2)} sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(8px)', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' } }}>
                    <CloseIcon sx={{ color: '#ffffff' }} />
                </IconButton>
            </div>

            <Divider sx={{ background: 'rgba(255, 255, 255, 0.2)' }} />

            {/* Dialog Content */}
            <DialogContent sx={{ p: '20px', textAlign: 'center', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(12px)', }}>
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <img src={LaptopShut} alt="laptop shutdown" style={{ width: '100px', height: '100px', marginBottom: '10px' }} />
                    <Typography sx={{ fontWeight: '700', fontSize: '20px', color: '#ffffff', textShadow: '0px 2px 4px rgba(0,0,0,0.2)' }}>
                        Time for you to take some rest!
                    </Typography>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
                        <Typography sx={{ fontWeight: '600', fontSize: '18px', color: '#ffffff' }}>
                            Re-start your work after 5 minutes.
                        </Typography>
                        <img src={IconClock} alt="break-start" style={{ width: '70px', height: '70px' }} />
                    </div>
                </div>
            </DialogContent>

            {/* Dialog Actions */}
            <DialogActions sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '8px' }}>
                <span style={{width:'50%'}}>
                    <Button
                        text="Let's come back after 5 minutes"
                        onClick={() => updateTaskStatus(2)}
                        // sx={{
                        //     padding: '12px',
                        //     fontSize: '16px',
                        //     fontWeight: 'bold',
                        //     background: 'linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%)',
                        //     borderRadius: '25px',
                        //     transition: 'all 0.3s ease-in-out',
                        //     '&:hover': {
                        //         transform: 'scale(1.05)',
                        //         boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                        //     },
                        // }}
                    />
                </span>
            </DialogActions>
        </Dialog>
    );
});

export default WarnDialog;
