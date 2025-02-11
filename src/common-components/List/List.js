import React, { useEffect, useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Paper, Chip, Icon, Tooltip } from "@mui/material";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import './list.css';

const DataList = React.memo((props) => {
    const [list, setList] = useState([])
    useEffect(() => {
        setList([...props.list])
    }, [props.list])
    return (
        <Paper elevation={1}>
            <div style={{ padding: '10px 0px 10px 10px' }}>
                <Chip style={{ fontSize: '14px' }} label={props.title} />
            </div>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {list.map((item, index) => {
                    return (
                        <>
                            <ListItem key={index + 'list'} alignItems="flex-start">
                                <Tooltip title={item.rating}>
                                    <Icon style={{marginRight: '10px'}}>
                                        {item.rating === 'high' ? <PriorityHighIcon style={{ fontSize: '16px' }} /> : <LowPriorityIcon style={{ fontSize: '16px' }} />}
                                    </Icon>
                                </Tooltip>
                                <ListItemText
                                    key={index + 'item'}
                                    primary={item.taskTitle}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="div"
                                                variant="body2"
                                                sx={{ color: 'text.primary' }}
                                            >
                                                {item.description}
                                            </Typography>
                                            <Typography
                                                component="div"
                                                variant="body3"
                                                sx={{ color: 'text.secondary'}}
                                            >
                                                {item.subDescription}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        </>
                    )
                })}
            </List>
        </Paper>
    )
});

export default DataList;
