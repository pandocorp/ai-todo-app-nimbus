import React, { useState } from 'react';
import { Grid2 as Grid } from '@mui/material';
import { CustomCard } from '@tsamantanis/react-glassmorphism';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NimbusLogin from '../../assets/icons/icon-nimbus-logo.png';
import { Button } from '@tsamantanis/react-glassmorphism'
import IconOutlook from '../../assets/icons/icon-outlook.png';
import { useNavigate } from 'react-router-dom';

const LoginPage = React.memo(() => {
    const navigate = useNavigate();
    const [mailId, setMailId] = useState('')
    const [showForm, setShowForm] = useState(false)

    const navigateToHomePage = () => {
        localStorage.setItem('mailId', mailId)
        navigate('/', {replace: false})
    }

    return(
        <>
            <Grid container alignItems={'center'} justifyContent={'center'} spacing={2} sx={{height: 'calc(100vh - 120px)'}}>
                <Grid size={12} justifyContent={'center'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <div style={{display: 'flex', justifyContent:'center'}}>
                        <img style={{width: '150px', height: '150px'}} src={NimbusLogin} alt='nimbus logo' />
                    </div>
                    <CustomCard style={{width: '40%'}} effectColor="rgba(255, 255, 255, 0.1)" color="#ffffff" blur={10} borderRadius={0}>
                            <div style={{display: 'flex', alignItems:'center', justifyContent: 'space-around'}}>
                                {!showForm && <div>  
                                  <span style={{display: 'flex', alignItems: 'center'}} className='icon-outlook'>
                                    <img src={IconOutlook} alt='outlook-icon' style={{width: '30px', height: '30px', position: 'absolute', marginLeft: '10px'}} />
                                    <Button onClick={() => setShowForm(true)} style={{paddingLeft: '55px'}} text={'Login with outlook'} />  
                                  </span>  
                                </div>}
                                {showForm && <div>
                                    <FormControl fullWidth required sx={{marginBottom: '10px'}}>
                                        <InputLabel htmlFor="component-outlined" sx={{color: '#ffffff'}} required>Enter Outlook Email</InputLabel>
                                        <OutlinedInput
                                        id="component-outlined"
                                        label="Enter Outlook Email"
                                        value={mailId}
                                        sx={{color: '#ffffff'}}
                                        onChange={(event) => setMailId(event.target.value)}
                                        />
                                    </FormControl>
                                    <span style={{pointerEvents: mailId ? '' : 'not-allowed'}}>
                                        <Button onClick={() => navigateToHomePage()} text={'Login'} />
                                    </span>
                                </div>}
                            </div>
                        </CustomCard>
                </Grid>
            </Grid>
        </>
    )
})

export default LoginPage