/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Divider, Typography, Box, Paper, TextField, } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';
import Chip from '@mui/material/Chip';
import LinkIcon from '@mui/icons-material/Link';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import PriorityHighOutlinedIcon from '@mui/icons-material/PriorityHighOutlined';
import Accordion from '@mui/material/Accordion';
import IconChatBotGif from '../../assets/icons/icon-chatbot.gif'
import { Button } from '@tsamantanis/react-glassmorphism'
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import IconCelebration from '../../assets/icons/icon-celebration.gif';
import CircularProgress from '@mui/material/CircularProgress';
import IconLoader from '../../assets/icons/icon-typings.gif';

const CenterDialog = React.memo((props) => {

    const [taskDetail, setTaskDetail] = useState({})
    const [messages, setMessages] = useState([]);
    const [subTasks, setSubTasks] = useState([])
    const [userMessage, setUserMessage] = useState("");
    const [showCelebration, setShowCelebration] = useState(false)

    useEffect(() => {
        setMessages([...messages, ...props.messages])
    }, [props.messages])

    useEffect(() => {
        setShowCelebration(props.showCelebration)
    }, [props.showCelebration])

    useEffect(() => {
        setTaskDetail({ ...props.task })
        props.triggerGetSubTask(props.task._id);
    }, [props.task])

    useEffect(() => {
        if (props.subTasks.length) {
            setSubTasks(props.subTasks)
        } else {
            setSubTasks([])
        }
    }, [props.subTasks])

    const handleSend = () => {
        if (userMessage.trim()) {
            setMessages([...messages, { sender: "user", value: userMessage }]);
            props.setMessages(userMessage)
            setUserMessage("");
        }
    };

    const updateTaskStatus = (event) => {
        props.updateTask(event, taskDetail)
    }

    const updateSubTasks = (event, subTask) => {
        if (event.target.checked) {
            props.triggerUpdateSubTask(3, subTask)
        } else {
            props.triggerUpdateSubTask(1, subTask)
        }
    }

    return (
        <>
            {showCelebration && <img src={IconCelebration} alt='celeberation' style={{position: 'absolute', top: 0, zIndex: 100000, right: 0, width: '100%'}} />}
            <Dialog open={true} className='center-popper' fullWidth={true}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <DialogTitle>
                        <Typography sx={{ color: '#ffffff', fontSize: '16px' }}>
                            Details
                        </Typography>
                    </DialogTitle>
                    <IconButton sx={{ marginRight: '10px' }} onClick={props.closeDialog}>
                        <CloseIcon sx={{ color: '#ffffff' }} />
                    </IconButton>
                </div>
                <Divider sx={{ background: 'rgba(255, 255, 255, 0.2)' }} />
                <DialogContent sx={{ paddingLeft: '5px', paddingRight: '5px' }}>
                    <div style={{ minWidth: '450px', maxWidth: '600px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Tooltip title={'High'}>
                                <IconButton>
                                    {taskDetail?.priority === 1 ? <PriorityHighOutlinedIcon style={{ margin: '5px', color: '#ffffff' }} /> :
                                        <LowPriorityIcon style={{ margin: '5px', color: '#ffffff' }} />}
                                </IconButton>
                            </Tooltip>
                            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                <Typography className='text-ellipsis' sx={{ color: '#ffffff', fontWeight: 600 }}>{taskDetail?.title}</Typography>
                                <Chip sx={{ marginLeft: '10px', color: '#ffffff' }} label={taskDetail?.status === 1 ? 'Pending' : taskDetail?.status === 2 ? 'In-Progress' : 'Done'} />
                            </div>
                        </div>
                        <div style={{ margin: '10px 20px' }}>
                            <div style={{ margin: '4px 0px' }}>
                                <span style={{ margin: 0, fontSize: '16px', fontWeight: 400, color: '#ffffff' }}>
                                    {taskDetail?.summary}
                                </span>
                            </div>
                            <div>
                                <ul style={{ margin: '0', padding: 0 }}>
                                    <li style={{ listStyle: 'none', display: 'flex', alignItems: 'center', flexWrap: 'wrap', color: '#ffffff', margin: '4px 0px' }}>
                                        <LinkIcon style={{ marginRight: '5px' }} /> -  {taskDetail?.links && taskDetail?.links.length ? taskDetail?.links : 'No-Links Attached'}
                                    </li>
                                    <li style={{ listStyle: 'none', display: 'flex', alignItems: 'center', flexWrap: 'wrap', color: '#ffffff', margin: '4px 0px' }}>
                                        <TimerOutlinedIcon style={{ marginRight: '5px' }} /> - {taskDetail?.duration ? taskDetail?.duration : 0} Minutes
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div style={{ margin: '0px 15px' }}>
                        <Accordion defaultExpanded>
                            <AccordionSummary
                                expandIcon={<IconButton>
                                    <ExpandMoreIcon sx={{ color: '#000000' }} />
                                </IconButton>}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography component="span"><Chip icon={<img src={IconChatBotGif} height={'25px'} width={'25px'} />} label="AI-Copilot Suggestion" sx={{ color: '#000000', fontWeight: '800' }} /></Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ color: '#000000', fontWeight: '400' }}>
                                <ul style={{ listStyle: 'none', textDecoration: 'none', margin: 0, padding: 0, textAlign: props.loading ? 'center' : '' }}>
                                    {subTasks && subTasks.length ? subTasks.map((subTask, index) => {
                                        return (
                                            <li key={index} style={{ listStyle: 'none', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                                                <Checkbox onChange={(event) => updateSubTasks(event, subTask)} /> <Typography sx={{ marginLeft: '5px', fontWeight: '400' }} className='text-ellipsis'>{subTask?.title}</Typography>
                                            </li>
                                        )
                                    }) : props.loading ? <CircularProgress /> : <Typography>No Sub-tasks Generated</Typography>}
                                </ul>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div>
                        <Box sx={{ width: 'auto', margin: 'auto', padding: '19px' }}>
                            <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
                                
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        bgcolor: "rgba(255, 255, 255, 0.2)",
                                        color: "#ffffff",
                                        p: 1.5,
                                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                        backdropFilter: "blur(10px)"
                                    }}
                                >
                                    <Typography variant="h6" sx={{ color: '#000000', display: 'flex', alignItems: 'center' }}>
                                        <Typography component="span"><Chip icon={<img src={IconChatBotGif} height={'25px'} width={'25px'} />} label="AI-Copilot" sx={{ color: '#000000', fontWeight: '800' }} /></Typography>
                                    </Typography>
                                </Box>

                                <Box sx={{ padding: '20px', height: '150px', overflow: 'auto' }}>
                                    {messages.map((msg, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: "flex",
                                                justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                                                mb: 1,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    p: 0.5,
                                                    borderRadius: 2,
                                                    borderTopLeftRadius: msg.sender === 'user' ? '0px' : '2px',
                                                    borderTopRightRadius: msg.sender === 'user' ? '2px' : '0px',
                                                    maxWidth: "70%",
                                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                                    backdropFilter: "blur(10px)",
                                                    background: msg.sender === "user"
                                                        ? "rgba(0, 123, 255, 0.3)"  // Glassy blue for user
                                                        : "rgba(255, 255, 255, 0.3)", // Glassy white for bot
                                                    color: msg.sender === "user" ? "white" : "black",
                                                }}
                                            >
                                                {msg.value}
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            </Paper>
                            {props.botLoader && <div style={{display: 'flex', alignItems: 'center'}}>
                                <img src={IconLoader} alt='icon-loader' style={{width: '15px', height: '15px', marginLeft: '10px'}} />
                                <Typography sx={{color: '#ffffff', fontWeight: 600, fontSize: '12px', marginLeft: '10px'}}> Generating </Typography>
                            </div>}
                            <Box sx={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Type your message..."
                                    value={userMessage}
                                    onChange={(e) => setUserMessage(e.target.value)}
                                    sx={{
                                        mr: 1,
                                        bgcolor: "rgba(255, 255, 255, 0.3)",
                                        backdropFilter: "blur(10px)",
                                        borderRadius: 1,
                                    }}
                                />
                                <span style={{ marginLeft: '10px' }}>
                                    <Button text='Send' onClick={handleSend} />
                                </span>
                            </Box>
                        </Box>

                    </div>
                </DialogContent>
                <DialogActions>
                    <span>
                        <Button text='Pause' onClick={() => updateTaskStatus(2)} />
                    </span>
                    <span>
                        <Button text='Done' onClick={() => updateTaskStatus(3)} />
                    </span>
                </DialogActions>
            </Dialog>
        </>
    )
});

export default CenterDialog