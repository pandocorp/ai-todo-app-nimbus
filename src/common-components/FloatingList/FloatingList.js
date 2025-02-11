/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Box, Fab, Paper, Typography, IconButton, List, ListItem, ListItemText, ListItemAvatar, Avatar, Chip } from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';
import CloseIcon from "@mui/icons-material/Close";
import GitHub from '../../assets/icons/icon-github.png';
import Slack from '../../assets/icons/icon-slack.png';
import HubSpot from '../../assets/icons/icon-hubspot.png';
import Outlook from '../../assets/icons/icon-outlook.png';
import Task from '../../assets/icons/icon-clipboard.png';
import Trello from '../../assets/icons/icon-trello.png';
import IconCalendar from '../../assets/icons/icon-calendar.png'

const FloatingList = React.memo((props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [list, setList] = useState([]);

    useEffect(() => {
        setList([...list, ...props.list]);
    }, [props.list]);

    const toggleChat = () => setIsOpen(!isOpen);

    return (
        <Box>
            {/* Floating Task Icon */}
            {!isOpen && (
                <Fab
                    color="primary"
                    onClick={toggleChat}
                    sx={{
                        position: "fixed",
                        bottom: 20,
                        left: 20,
                        zIndex: 1000,
                    }}
                >
                    <AssignmentIcon sx={{ color: "#ffffff" }} />
                </Fab>
            )}

            {/* Floating Task List */}
            {isOpen && (
                <Paper
                    elevation={4}
                    sx={{
                        position: "fixed",
                        bottom: 20,
                        left: 20,
                        width: 350,
                        height: 500,
                        display: "flex",
                        flexDirection: "column",
                        zIndex: 1000,
                        backdropFilter: "blur(15px)",
                        background: "rgba(255, 255, 255, 0.15)",
                        borderRadius: "12px",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                        overflow: "hidden",
                    }}
                >
                    {/* Header */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            bgcolor: "rgba(255, 255, 255, 0.2)",
                            color: "#ffffff",
                            p: 2,
                            borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                        }}
                    >
                        <Typography variant="subtitle1" fontWeight="bold">
                            All Tasks
                        </Typography>
                        <IconButton size="small" onClick={toggleChat} sx={{ color: "#ffffff" }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Task List */}
                    <Box
                        sx={{
                            flex: 1,
                            p: 2,
                            overflowY: "auto",
                            scrollbarWidth: "thin",
                            "&::-webkit-scrollbar": {
                                width: "6px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "rgba(255, 255, 255, 0.5)",
                                borderRadius: "3px",
                            },
                        }}
                    >
                        <List sx={{ width: "100%" }}>
                            {list.map((item, index) => (
                                <ListItem
                                    key={index}
                                    sx={{
                                        borderRadius: "10px",
                                        backdropFilter: "blur(12px)",
                                        background: item?.over_due ? "rgba(255, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)",
                                        mb: 1,
                                        transition: "0.3s",
                                        boxShadow: item?.over_due ? "0 0 12px rgba(255, 0, 0, 0.6)" : "none",
                                        animation: item?.over_due ? "pulse 1.5s infinite" : "none",
                                        "&:hover": {
                                            transform: "scale(1.02)",
                                            boxShadow: item?.over_due ? "0 0 16px rgba(255, 0, 0, 0.8)" : "0 4px 8px rgba(0, 0, 0, 0.15)",
                                        },
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            sx={{ bgcolor: "rgba(255, 255, 255, 0.2)", padding: "5px" }}
                                        >
                                            <img
                                                src={
                                                    item?.platform === "github"
                                                        ? GitHub
                                                        : item?.platform === "slack"
                                                        ? Slack
                                                        : item?.platform === "hubspot"
                                                        ? HubSpot
                                                        : item?.platform === "outlook"
                                                        ? Outlook
                                                        : item?.platform === "trello"
                                                        ? Trello
                                                        : item?.platform === 'calendar' ? 
                                                        IconCalendar
                                                        : Task
                                                }
                                                alt="Platform Icon"
                                                style={{ width: "22px", height: "22px" }}
                                            />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography sx={{ color: "#ffffff", fontWeight: "bold", display: "flex", alignItems: "center" }}>
                                                {item?.title} 
                                                {item?.over_due && (
                                                    <Chip label="Overdue" sx={{ ml: 1, color: "#fff", background: "rgba(255, 0, 0, 0.7)", fontSize: "12px", height: "20px" }} />
                                                )}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography sx={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "13px" }}>
                                                Due: {item?.due_time}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Paper>
            )}
        </Box>
    );
});

export default FloatingList;
