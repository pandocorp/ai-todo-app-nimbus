import React, { useEffect, useState } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import GitHub from '../../assets/icons/icon-github.png';
import Slack from '../../assets/icons/icon-slack.png';
import HubSpot from '../../assets/icons/icon-hubspot.png';
import Outlook from '../../assets/icons/icon-outlook.png';
import Task from '../../assets/icons/icon-clipboard.png';
import Trello from '../../assets/icons/icon-trello.png'
import IconCalendar from '../../assets/icons/icon-calendar.png'
import Popover from '@mui/material/Popover';
import PriorityHighOutlinedIcon from '@mui/icons-material/PriorityHighOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Tooltip, IconButton, MenuItem } from '@mui/material';
import { Button } from '@tsamantanis/react-glassmorphism'
import Chip from '@mui/material/Chip';
import moment from 'moment';
import LinkIcon from '@mui/icons-material/Link';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function CustomTimeline(props) {
    const [timeline, setTimeLine] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)
    const [taskDetails, setTaskDetails] = useState({})
    const [editButton, setEditButton] = useState(false)
    const [editForm, setEditForm] = useState(false)
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined;
    useEffect(() => {
        setTimeLine(props.timeline)
    }, [props.timeline])

    const showTaskDescription = (event, details) => {
        setAnchorEl(event.currentTarget)
        setTaskDetails({ ...details })
    }

    const closeTaskDescription = () => {
        setAnchorEl(null);
        setEditForm(false)
    }

    const showEditButton = () => {
        setEditButton(true)
    }

    const hideEditButton = () => {
        setEditButton(false)
    }

    const startTask = () => {
        setAnchorEl(null);
        props.triggerTimer(taskDetails, true)
    }

    const showEditForm = () => {
        setEditForm(true)
    }

    const saveUpdatedTask = () => {
        props.saveTask(taskDetails)
        setAnchorEl(null)
        setEditForm(false)
    }

    const cancelUpdation = () => {
        setEditButton(false)
        setAnchorEl(null)
        setEditForm(false)
        setTaskDetails({})
    }

    return (
        <>
            <Timeline position='alternate'>
                {timeline.map((item, index) => {
                    return (
                        <TimelineItem key={index+'timeline'}>
                            <TimelineOppositeContent
                                sx={{ m: 'auto 0', color: '#ffffff', fontWeight: '600' }}
                                align="right"
                                variant="body2"
                            >
                                {moment(item?.start_time).format('hh:mm:ss A')}
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineConnector />
                                <TimelineDot style={{cursor: 'pointer', background: '#333333', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} aria-describedby={id} onClick={(event) => {
                                    showTaskDescription(event, item);
                                }}>
                                    <img src={item.platform === 'github' ? GitHub : item.platform === 'slack' ? Slack : item.platform === 'hubspot' ? HubSpot : item.platform === 'outlook' ? Outlook : item.platform === 'trello' ? Trello : item.platform === 'calendar' ? IconCalendar : Task} alt="GitHub" style={{ width: '25px', height: '25px' }} />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                <Typography component="span" sx={{fontWeight: '600'}}>
                                    {item.title}
                                </Typography>
                                <Typography sx={{fontWeight: '500'}}>{item.summary}</Typography>
                            </TimelineContent>
                        </TimelineItem>
                    )
                })}
            </Timeline>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                className='edit-popover'
                onClose={closeTaskDescription}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {!editForm ? <div style={{ minWidth: '450px', maxWidth: '600px'}}>
                    <div style={{padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <Tooltip title={'High'}>
                                <IconButton onMouseEnter={showEditButton} onMouseLeave={hideEditButton} onClick={showEditForm}>
                                    {!editButton ? taskDetails?.priority === 1 ? <PriorityHighOutlinedIcon style={{ margin: '5px', color: '#ffffff' }} /> : <LowPriorityIcon style={{ margin: '5px', color: '#ffffff' }} /> : <EditOutlinedIcon style={{ margin: '5px', color: '#ffffff' }} />}
                                </IconButton>
                            </Tooltip>
                            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                <Typography sx={{color: '#ffffff'}} className='text-ellipsis'>{taskDetails?.title}</Typography>
                                <Chip sx={{marginLeft: '10px', color: '#ffffff'}} label={taskDetails?.status === 1 ? 'Pending' : taskDetails?.status === 2 ? 'In-Progress' : 'Done'} /> 
                            </div>
                        </div>
                        <IconButton>
                            <DeleteOutlineIcon sx={{color: '#ffffff'}} />
                        </IconButton>
                    </div>
                    <div style={{ margin: '10px 20px'}}>
                        <div>
                            <span style={{ margin: 0, fontSize: '16px', color: '#ffffff' }}>
                                {taskDetails?.summary}
                            </span>
                        </div>
                        <div>
                            <ul style={{margin: '0', padding: 0}}>
                                <li style={{listStyle: 'none', display: 'flex', alignItems: 'center', flexWrap: 'wrap', color: '#ffffff'}}>
                                    <LinkIcon style={{marginRight: '5px'}} /> -  {taskDetails?.links ? taskDetails?.links : 'No-Links Attached'}
                                </li>
                                <li style={{listStyle: 'none', display: 'flex', alignItems: 'center', flexWrap: 'wrap', color: '#ffffff'}}>
                                    <TimerOutlinedIcon style={{marginRight: '5px'}} /> - {taskDetails?.duration} Minutes
                                </li>
                            </ul>
                        </div>
                    </div>
                </div> :
                <div style={{ minWidth: '600px', maxWidth: '800px', padding: '20px'}}>
                    <div>
                        <FormControl fullWidth required>
                            <InputLabel htmlFor="component-outlined" sx={{color: '#ffffff'}} required>Title</InputLabel>
                            <OutlinedInput
                            id="component-outlined"
                            label="Title"
                            sx={{color: '#ffffff'}}
                            value={taskDetails?.title}
                            onChange={(event) => setTaskDetails({...taskDetails, title: event.target.value})}
                            />
                        </FormControl>
                        <FormControl fullWidth required sx={{marginTop: '10px'}}>
                            <InputLabel htmlFor="component-outlined" sx={{color: '#ffffff'}} required>Summary</InputLabel>
                            <OutlinedInput
                            id="component-outlined"
                            label="Summary"
                            sx={{color: '#ffffff'}}
                            value={taskDetails?.summary}
                            onChange={(event) => setTaskDetails({...taskDetails, summary: event.target.value})}
                            />
                        </FormControl>
                        <FormControl required sx={{marginTop: '10px', minWidth: 150}}>
                            <InputLabel htmlFor="demo-simple-select-labe" sx={{color: '#ffffff'}} required>Status</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            sx={{color: '#ffffff'}}
                            value={taskDetails?.status}
                            onChange={(event) => setTaskDetails({...taskDetails, status: event.target.value})}
                            >
                            <MenuItem value={1}>Pending</MenuItem>
                            <MenuItem value={2}>In-Progress</MenuItem>
                            <MenuItem value={3}>Completed</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl required sx={{marginTop: '10px', marginLeft: '10px', minWidth: 150}}>
                            <InputLabel htmlFor="demo-simple-select-labe" sx={{color: '#ffffff'}} required>Priority</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Priority"
                            sx={{color: '#ffffff'}}
                            onChange={(event) => setTaskDetails({...taskDetails, priority: event.target.value})}
                            value={taskDetails.priority}
                            >
                            <MenuItem value={1}>High</MenuItem>
                            <MenuItem value={2}>Moderate</MenuItem>
                            <MenuItem value={3}>Low</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className='time-picker' required sx={{marginLeft: '10px', minWidth: 150}}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker']} sx={{color: '#ffffff'}}>
                                    <DateTimePicker value={dayjs(taskDetails.created_at)} onChange={(event) => setTaskDetails({...taskDetails, created_at: event.toISOString()})} sx={{color: '#ffffff'}} label="Start Date" />
                                </DemoContainer>
                            </LocalizationProvider>
                        </FormControl>
                        <FormControl className='time-picker' required sx={{minWidth: 150}}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker']} sx={{color: '#ffffff'}}>
                                    <DateTimePicker value={dayjs(taskDetails.due_date)} onChange={(event) => setTaskDetails({...taskDetails, due_date: event.toISOString()})} sx={{color: '#ffffff'}} label="Due Date" />
                                </DemoContainer>
                            </LocalizationProvider>
                        </FormControl>
                    </div>
                </div>}
                {!editForm?  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'end', margin: '10px'}}>
                    <Button style={{width: '100%'}} text="Start" onClick={startTask}>
                    </Button>
                </div> : <div style={{display: 'flex', alignItems: 'center', justifyContent: 'end', margin: '10px'}}>
                    <span style={{marginRight: '10px'}}>
                    <Button text="Save" onClick={saveUpdatedTask}>
                    </Button>
                    </span>
                    <span>
                    <Button text="Cancel" onClick={cancelUpdation}>
                    </Button>
                    </span>
                </div>}
            </Popover>
        </>
    );
}
