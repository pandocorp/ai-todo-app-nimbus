import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Popover from '@mui/material/Popover';
import { Button } from '@tsamantanis/react-glassmorphism'

const TaskPopper = React.memo((props) => {
    const [task, setTask] = useState({
        title: '',
        summary: '',
        status: 1,
        priority: '',
        created_at: '',
        due_date: '',
        duration: '',
    });
    const saveTask = () => {
        props.triggerSaveTask(task)
        props.closeTaskDescription(null)
    }

    const cancelSaveTask = () => {
        setTask({})
        props.closeTaskDescription(null)
    }

    return (
        <Popover
                id={props.id}
                open={props.open}
                anchorEl={props.anchorEl}
                className='edit-popover'
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                
                <div style={{ minWidth: '600px', maxWidth: '800px', padding: '20px'}}>
                    <div>
                        <FormControl fullWidth required>
                            <InputLabel htmlFor="component-outlined" sx={{color: '#ffffff'}} required>Title</InputLabel>
                            <OutlinedInput
                            id="component-outlined"
                            label="Title"
                            sx={{color: '#ffffff'}}
                            onChange={(event) => setTask({...task, title: event.target.value})}
                            value={task.title}
                            />
                        </FormControl>
                        <FormControl fullWidth required sx={{marginTop: '10px'}}>
                            <InputLabel htmlFor="component-outlined" sx={{color: '#ffffff'}} required>Summary</InputLabel>
                            <OutlinedInput
                            id="component-outlined"
                            label="Summary"
                            sx={{color: '#ffffff'}}
                            onChange={(event) => setTask({...task, summary: event.target.value})}
                            value={task.summary}
                            />
                        </FormControl>
                        <FormControl required sx={{marginTop: '10px', minWidth: 150}}>
                            <InputLabel htmlFor="demo-simple-select-labe" sx={{color: '#ffffff'}} required>Status</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Status"
                            onChange={(event) => setTask({...task, status: event.target.value})}
                            sx={{color: '#ffffff'}}
                            value={task.status}
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
                            onChange={(event) => setTask({...task, priority: event.target.value})}
                            value={task.priority}
                            >
                            <MenuItem value={1}>High</MenuItem>
                            <MenuItem value={2}>Moderate</MenuItem>
                            <MenuItem value={3}>Low</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className='time-picker' required sx={{marginLeft: '10px', minWidth: 150}}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker']} sx={{color: '#ffffff'}}>
                                    <DateTimePicker onChange={(event) => setTask({...task, created_at: event.toISOString()})} sx={{color: '#ffffff'}} label="Start Date" />
                                </DemoContainer>
                            </LocalizationProvider>
                        </FormControl>
                        <FormControl className='time-picker' required sx={{minWidth: 150}}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker']} sx={{color: '#ffffff'}}>
                                    <DateTimePicker onChange={(event) => setTask({...task, due_date: event.toISOString()})} sx={{color: '#ffffff'}} label="Due Date" />
                                </DemoContainer>
                            </LocalizationProvider>
                        </FormControl>
                        {/* <FormControl className='time-picker' required sx={{marginLeft: '10px', marginTop: '8px', minWidth: 150}}>
                            <InputLabel htmlFor="component-outlined" sx={{color: '#ffffff'}} required>Duration</InputLabel>
                            <OutlinedInput
                            id="component-outlined"
                            label="Duration"
                            type='number'

                            sx={{color: '#ffffff'}}
                            onChange={(event) => setTask({...task, duration: event.target.value})}
                            value={task.duration}
                            />
                        </FormControl> */}
                    </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'end', margin: '10px'}}>
                    <span style={{marginRight: '10px'}}>
                    <Button text="Save" onClick={saveTask}>
                    </Button>
                    </span>
                    <span>
                    <Button text="Cancel" onClick={cancelSaveTask}>
                    </Button>
                    </span>
                </div>
            </Popover>
    )
});

export default TaskPopper;