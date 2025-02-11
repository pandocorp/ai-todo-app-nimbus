/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import CustomTimeline from '../../common-components/Timeline/CustomTimeline';
import { Grid2 as Grid, IconButton, Tooltip, Typography } from '@mui/material';
import DraggableDialog from '../../common-components/Draggable-dialog/DraggableDialog';
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import CenterDialog from '../../common-components/Center-Modal-Dialog/CenterDialog';
import AddIcon from '@mui/icons-material/Add';
import TaskPopper from '../../common-components/TaskPopper/TaskPopper';
import ChatBot from '../../common-components/ChatBot/ChatBot';
import { useDispatch, useSelector } from 'react-redux';
import { CreateTaskFunction, GetTasksFunction, GetSubTasks, GetScheduleFunction, GetUserFunction, UpdateTaskFunction, UpdateSubTasks, GetChatInformation, GenerateMetricsFunction, AiRescheduleFunction, GetTextToVoice } from '../../features/HomePageSlice';
import CommonSnackBar from '../../common-components/CommonSnackBar/Snackbar';
import WarnDialog from '../../common-components/Warning-Modal-Dialog/WarningDialog';
import IconFalling from '../../assets/icons/Falling-Behind.gif';
import IconFocused from '../../assets/icons/Focused.gif';
import IconHighlyMotivated from '../../assets/icons/Highly-motivated.gif';
import IconStressed from '../../assets/icons/Stressed.gif';
import IconUnmotive from '../../assets/icons/Unmotivated.gif';
import IconUnstoppable from '../../assets/icons/Unstoppable.gif';
import DinoLoader from '../../common-components/DinoLoader/DinoLoader';
import Streak from '../../common-components/StreakBar/Streak';
import CircularProgress from '@mui/material/CircularProgress';
import RefreshIcon from '@mui/icons-material/Refresh';
import FloatingList from '../../common-components/FloatingList/FloatingList';
import { cloneDeep } from 'lodash';

const HomePage = () => {
    const dispatch = useDispatch()
    const { tasksLoader, individualTaskLoader, updateTaskLoader, getUserLoader, createCompanyLoader, createUserLoader, createTaskLoader, chatInformationLoader, getSubTasksLoader, updateSubTasksLoader, scheduleLoader, generateMetricsLoader, rescheduleLoader, updateUserLoader, getTextVoice } = useSelector(store => store.homePage)
    const [timeLine, setTimeLine] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)
    const [startTimer, setStartTimer] = useState(false)
    const [showCenterDialog, setShowCenterDialog] = useState(false)
    const [taskTaken, setTaskTaken] = useState({})
    const [userInformation, setUserInformation] = useState({})
    const [openSnackbar, setOpenSnackBar] = useState({
        open: false,
        message: '',
        type: ''
    })
    const [showWarnDialog, setShowWarnDialog] = useState(false)
    const [subTasks, setSubTasks] = useState([])
    const [commonChatMessage, setCommonChatMessage] = useState([])
    const [inlineChatMessage, setInlineChatMessage] = useState([])
    const [showCelebration, setShowCelebration] = useState(false)
    const [tasksList, setTasksList] = useState([])
    const [speechUrl, setSpeechUrl] = useState('')
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined;
    useEffect(() => {
       getUserInformation()
       const message = [];
       const chatMessage = {
        "user_id": localStorage.getItem('mailId'),
        "session_id": "",
        "message": "Hi",
        "sender": 'user'
       }
       const formattedMessage = {
        "value": "Hi",
        "sender": 'user'
       }
       message.push(formattedMessage)
       dispatch(GetChatInformation({body: chatMessage})).then(res => {
        if (Object.keys(res.payload)) {
            if (!localStorage.getItem('global_session_id')) {
                 localStorage.setItem('global_session_id', res.payload?.session_id)      
            }
            const newChatFormat = res.payload?.response.map((resp, index) => {
                return {
                    ...resp,
                    sender: 'bot',
                }
            });
            message.push(...newChatFormat)
            setCommonChatMessage([...commonChatMessage, ...message])
        }
       }).catch(err => {

       })
    }, [])

    const triggerTimer = (event, bool) => {
        setTaskTaken({ ...event })
        const taskCopy = cloneDeep(event);
        taskCopy.actual_start_time = new Date().toISOString();
        taskCopy.status = 2;
        updateTaskFromRunner(taskCopy)
        setStartTimer(bool)
        setShowCenterDialog(bool)
    }

    const closeDialog = () => {
        setShowCenterDialog(false)
        setTaskTaken({})
        setStartTimer(false)
    }

    const addTask = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const closeTaskDescription = () => {
        setAnchorEl(null)
    }

    const refreshList = () => {
        dispatch(GetScheduleFunction({token: localStorage.getItem('mailId'),getPendingTasks: true})).then((res) => {
            if (res.payload && res.payload.length) {
                const sequenceSort = res.payload.sort((a, b) => parseInt(a.sequence) - parseInt(b.sequence));
                setTimeLine(sequenceSort)
                // if (res.payload.length) {
                //     generateMetrics()
                // }
            } else {
                setTimeLine([])
            }
        }).catch((err) => {
            setTimeLine([])
        })
    }

    const rescheduleRefresh = () => {
        const formattedData = {
            user_id: localStorage.getItem('mailId'),
        }
        dispatch(AiRescheduleFunction({body: formattedData})).then((res) => {
            if (res.payload && res.payload.length) {
                const sequenceSort = res.payload.sort((a, b) => parseInt(a.sequence) - parseInt(b.sequence));
                setTimeLine(sequenceSort)
                setStartTimer(false)
                setShowCenterDialog(false)
                setShowWarnDialog(false)
                setTaskTaken({})
                setShowCelebration(false)
                localStorage.removeItem('inline_chat_id')
                if (res.payload.length) {
                    generateMetrics()
                }
            } else {
                setTimeLine([])
            }
        }).catch((err) => {
            setTimeLine([])
        })
    }

    const generateMetrics = () => {
        const formattedData = {
            user_id: localStorage.getItem('mailId')
        }
        dispatch(GenerateMetricsFunction({body: formattedData})).then(res => {
            if (Object.keys(res.payload)) {
                setUserInformation(res.payload)
                getTextToSpeech()
            }
        }).catch(err => {
            setUserInformation({})
        })
    }

    const getUserInformation = () => {
        dispatch(GetUserFunction({token: window.localStorage.getItem('mailId')})).then(res => {
            if (Object.keys(res.payload)) {
                setUserInformation(res.payload)
                getTextToSpeech()
                refreshList()
                getAllTasks()
            }
        }).catch(err => {
            setUserInformation({})
        })
    }

    const getAllTasks = () => {
        dispatch(GetTasksFunction({token: localStorage.getItem('mailId'), getPendingTasks: true})).then(res => {
            if (Object.keys(res.payload).length) {
                setTasksList(res.payload)
            }
        }).catch(err => {

        })
    }

    const triggerSaveTask = (task) => {
        const differenceInMilliseconds = new Date(task.due_date) - new Date(task.created_at); // This gives the difference in milliseconds
        const differenceInMinutes = differenceInMilliseconds / (1000 * 60); // Convert to minutes
        const newTask = {
            "user_id": localStorage.getItem('mailId'),
            "company_id": "1",
            "title": task.title,
            "summary": task.summary,
            "status": task.status,
            "links": [],
            "priority": task.priority,
            "platform": "manual",
            "creation_time": task.created_at,
            "due_time": task.due_date,
            'actual_start_time': null,
            'actual_end_time': null,
            "duration": Math.round(differenceInMinutes)
        }
        dispatch(CreateTaskFunction({ body: newTask })).then(res => {
            if (Object.keys(res.payload)) {
                rescheduleRefresh()
                setOpenSnackBar({
                    open: true,
                    type: 'success',
                    message: 'Task updated successfully'
                })

            }
        }).catch(err => {
            setOpenSnackBar({
                open: true,
                type: 'error',
                message: 'Failed to update task'
            })
        })

    }

    const closeSnackbar = () => {
        setOpenSnackBar({
            ...openSnackbar,
            open: false,
            message: '',
            type: '',
        })
    }

    const saveTask = (event) => {
        const differenceInMilliseconds = new Date(event.due_date) - new Date(event.created_at); // This gives the difference in milliseconds
        const differenceInMinutes = differenceInMilliseconds / (1000 * 60); // Convert to minutes
        event.duration = Math.round(differenceInMinutes);
        dispatch(UpdateTaskFunction({credentials: event})).then((res) => {
            if (Object.keys(res.payload)) {
                rescheduleRefresh();
                setOpenSnackBar({
                    open: true,
                    type: 'success',
                    message: 'Task updated successfully'
                })
            }
        }).catch((err) => {
            rescheduleRefresh();
            setOpenSnackBar({
                open: false,
                type: 'error',
                message: 'Failed to update task'
            })
        });
    }

    const updateTask = (event, task) => {
        if (Object.keys(task).length) {
            task.status = event;
            if (event !== 2) {
                task.actual_end_time = new Date().toISOString();
            }
        }
        dispatch(UpdateTaskFunction({credentials: task})).then((res) => {
            if (Object.keys(res.payload)) {
                if (event !== 2) {
                    setShowCelebration(true)
                } else {
                    setStartTimer(false)
                    setShowCenterDialog(false)
                    setShowWarnDialog(false)
                    setTaskTaken({})
                    setInlineChatMessage([])
                    localStorage.removeItem('inline_chat_id')
                }
                rescheduleRefresh();
                setOpenSnackBar({
                    open: true,
                    type: 'success',
                    message: 'Task updated successfully'
                })
                // setStartTimer(false)
                // setShowCenterDialog(false)
                // setShowWarnDialog(false)
                // setTaskTaken({})
                // localStorage.removeItem('inline_chat_id')
            }
        }).catch((err) => {
            rescheduleRefresh();
            setStartTimer(false)
            setShowCenterDialog(false)
            setShowWarnDialog(false)
            setTaskTaken({})
            setOpenSnackBar({
                open: false,
                type: 'error',
                message: 'Failed to update task'
            })
        });
    }

    const getSubTask = (taskId) => {
        dispatch(GetSubTasks({taskId})).then(res => {
            if (res.payload.length) {
                setSubTasks(res.payload)
            } else {
                setSubTasks([])
            }
        }).catch(err => {
            setSubTasks([])
        })
    }

    const triggerUpdateSubTask = (status, task) => {
        const taskId = task?.task_id;
        if (Object.keys(task).length) {
            if (status === 3) {
                task.status = 3;
                task.end_time = new Date().toISOString();
            } else {
                task.status = 1;
                task.end_time = null;
            }
            dispatch(UpdateSubTasks({taskId, body:task})).then(res => {
                
            }).catch(err => {

            }) 
        }
    }

    const triggerExpire = (status) => {
        setShowWarnDialog(status)
    }

    const updateTaskFromRunner = (task) => {
        if (Object.keys(task).length) {
            dispatch(UpdateTaskFunction({credentials: task})).then((res) => {
                if (Object.keys(res.payload)) {
                    // rescheduleRefresh();
                }
            }).catch((err) => {
                rescheduleRefresh();
            });
        }
    } 
    
    const sendGlobalChatMessage = (message) => {
        const messages = [];
        const formattedMessage = {
            "user_id": localStorage.getItem('mailId'),
            "session_id": localStorage.getItem('global_session_id'),
            "message": message,
            "sender": 'user'
        }
        dispatch(GetChatInformation({body: formattedMessage})).then(res => {
            if (Object.keys(res.payload)) {
                if (!localStorage.getItem('global_session_id')) {
                     localStorage.setItem('global_session_id', res.payload?.response?.session_id)      
                }
                const newChatFormat = res.payload?.response.map((resp, index) => {
                    return {
                        ...resp,
                        sender: 'bot',
                    }
                });
                messages.push(...newChatFormat)
                setCommonChatMessage([...messages])
            }
           }).catch(err => {
    
           })
    }

    const sendInlineChatMessage = (message) => {
        const messages = [];
        const formattedMessage = {
            "user_id": localStorage.getItem('mailId'),
            "session_id" : localStorage.getItem('inline_chat_id') || '',
            "message": message,
            "sender": 'user',
            "task_id": taskTaken._id
        }
        dispatch(GetChatInformation({body: formattedMessage})).then(res => {
            if (Object.keys(res.payload)) {
                if (!localStorage.getItem('inline_chat_id')) {
                     localStorage.setItem('inline_chat_id', res.payload?.response?.session_id)      
                }
                const newChatFormat = res.payload?.response.map((resp, index) => {
                    return {
                        ...resp,
                        sender: 'bot',
                    }
                });
                messages.push(...newChatFormat)
                setInlineChatMessage([...messages])
            }
           }).catch(err => {
    
           })
    }

    const getTextToSpeech = () => {
        dispatch(GetTextToVoice()).then(res => {
            if (Object.keys(res.payload)) {
                setSpeechUrl(res.payload?.s3_public_url)
            } else {
                setSpeechUrl('')
            }
        }).catch(err => {
            setSpeechUrl('')
        })
    }

    const playAudio = () => {
        try {
            const audio = new Audio(speechUrl);
            audio.play();
        } catch(err) {

        }
    }

    return (
        <>
            <Grid container spacing={2} sx={{height: 'calc(100vh - 120px)'}}>
                <Grid size={12} sx={{height: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <CustomCard style={{width: '50%'}} effectColor="rgba(255, 255, 255, 0.1)" color="#ffffff" blur={10} borderRadius={0}>
                        <div style={{display: 'flex', alignItems:'center', justifyContent: 'space-around'}}>
                            <div>
                                <div>
                                    <Typography sx={{color: '#fffff', textAlign: 'center', fontSize: '16px', fontWeight: '600'}}>
                                        What does your day look like ?
                                    </Typography>
                                </div>
                                <div style={{textAlign: 'center'}}>
                                    <Tooltip title={userInformation?.mood?.message}>
                                        {userInformation?.mood?.message === 'Energized and Motivated' && <img onClick={playAudio} src={IconHighlyMotivated} alt='happy' style={{width: '70px', height: '70px', cursor: 'pointer'}} />}
                                        {userInformation?.mood?.message === 'Focused and Satisfied' && <img onClick={playAudio} src={IconFocused} alt='happy' style={{width: '80px', height: '80px', cursor: 'pointer'}} />}
                                        {userInformation?.mood?.message === 'Overwhelmed but Trying' && <img onClick={playAudio} src={IconFalling} alt='happy' style={{width: '80px', height: '80px', cursor: 'pointer'}} />}
                                        {userInformation?.mood?.message === 'Unmotivated and Disengaged' && <img onClick={playAudio} src={IconUnmotive} alt='happy' style={{width: '80px', height: '80px', cursor: 'pointer'}} />}
                                        {userInformation?.mood?.message === 'Anxious and Overburdened' && <img onClick={playAudio} src={IconStressed} alt='happy' style={{width: '80px', height: '80px', cursor: 'pointer'}} />}
                                        {userInformation?.mood?.message === 'Thriving and Dominating' && <img onClick={playAudio} src={IconUnstoppable} alt='happy' style={{width: '80px', height: '80px', cursor: 'pointer'}} />}
                                    </Tooltip>
                                </div>
                                <div style={{textAlign: 'center'}}>
                                    <Typography sx={{color:'#ffffff', fontWeight: '600'}}>{userInformation?.mood?.message}</Typography>
                                </div>
                            </div>
                            <div style={{border: '1px solid #ffffff', borderRadius: '10px', padding: '10px'}}>
                                    <Streak data={userInformation?.streak} />
                            </div>
                        </div>
                        <div style={{marginTop: '10px'}}>
                            <DinoLoader data={userInformation?.progress} />
                            <Typography sx={{fontSize: '16px', color: '#ffffff', fontWeight: '600', margin: '10px 0px', textAlign: 'center'}}>{userInformation?.progress?.message + ' ! ' || 'Have a good day'}</Typography>
                        </div>
                        {/* {(getUserLoader || generateMetricsLoader) && <div style={{height: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><CircularProgress /></div>} */}
                    </CustomCard>
                </Grid>
                <Grid size={12} sx={{height: '70%', display: 'flex', justifyContent: 'center'}}>
                    <CustomCard style={{height: 'calc(100vh - 420px)', overflow: 'auto', width: '50%'}} effectColor="rgba(255, 255, 255, 0.1)" color="#ffffff" blur={10} borderRadius={0}>
                        <Tooltip title='Refresh'>
                            <IconButton onClick={rescheduleRefresh} sx={{ position: 'absolute', top: '0', left: '0', margin: '5px' }}><RefreshIcon sx={{ color: '#ffffff' }} /></IconButton>
                        </Tooltip>
                        <Tooltip title='Add Task'>
                            <IconButton onClick={addTask} sx={{ position: 'absolute', top: '0', right: '0', margin: '5px' }}><AddIcon sx={{ color: '#ffffff' }} /></IconButton>
                        </Tooltip>
                        {!scheduleLoader && !rescheduleLoader ? timeLine && timeLine.length ? <CustomTimeline timeline={timeLine} triggerTimer={triggerTimer} saveTask={saveTask} /> : <div style={{height: 'calc(100vh - 486px)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Typography sx={{fontWeight: '600', fontSize: '16px'}}>No Tasks!</Typography></div> : <div style={{height: 'calc(100vh - 493px)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><CircularProgress /></div>}
                    </CustomCard>
                </Grid>
            </Grid>
            {startTimer && <DraggableDialog task={taskTaken} triggerExpire={triggerExpire} />}
            {showCenterDialog && <CenterDialog loading={getSubTasksLoader} botLoader={chatInformationLoader} showCelebration={showCelebration} triggerGetSubTask={getSubTask} task={taskTaken} closeDialog={closeDialog} updateTask={updateTask} triggerUpdateSubTask={triggerUpdateSubTask} subTasks={subTasks} setMessages={sendInlineChatMessage} messages={inlineChatMessage} />}
            <TaskPopper anchorEl={anchorEl} open={open} id={id} closeTaskDescription={closeTaskDescription} triggerSaveTask={triggerSaveTask} />
            <ChatBot chat={commonChatMessage} loading={chatInformationLoader} sendMessage={sendGlobalChatMessage} />
            <CommonSnackBar open={openSnackbar.open} message={openSnackbar.message} condition={openSnackbar.type} close={closeSnackbar} />
            {showWarnDialog && <WarnDialog open = {showWarnDialog} updateTaskStatus={(event) => updateTask(event, taskTaken)}/>}
            <FloatingList list={tasksList} />
        </>
    )
}

export default HomePage