/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Box, Fab, Paper, Typography, TextField, Button, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import IconLoader from '../../assets/icons/icon-typings.gif';

const ChatBot = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    setMessages([...messages, ...props.chat])
  }, [props.chat])

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (userMessage.trim()) {
      setMessages([...messages, { sender: "user", value: userMessage }]);
      props.sendMessage(userMessage)
      setUserMessage("");
    }
  };

  return (
    <Box>
      {/* Floating Chat Icon */}
      {!isOpen && (
        <Fab
          color="primary"
          onClick={toggleChat}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 1000,
          }}
        >
          <ChatIcon />
        </Fab>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Paper
          elevation={4}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            width: 320,
            height: 500,
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
            backdropFilter: "blur(10px)",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: 1,
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
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
              p: 1.5,
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              ChatBot
            </Typography>
            <IconButton size="small" onClick={toggleChat}>
              <CloseIcon sx={{color: '#ffffff'}} />
            </IconButton>
          </Box>

          {/* Chat Messages */}
          <Box
            sx={{
              flex: 1,
              p: 2,
              overflowY: "auto",
              bgcolor: "rgba(255, 255, 255, 0.1)",
              minHeight: "300px",
              scrollbarWidth: "thin",
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#ccc",
                borderRadius: "3px",
              },
            }}
          >
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
                    p: 1,
                    borderRadius: 2,
                    bgcolor: msg.sender === "user" ? "primary.main" : "grey.300",
                    color: msg.sender === "user" ? "white" : "black",
                    maxWidth: "70%",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {msg.value}
                </Box>
              </Box>
            ))}
          </Box>
          {props.loading && <div style={{display: 'flex', alignItems: 'center'}}>
            <img src={IconLoader} alt='icon-loader' style={{width: '15px', height: '15px', marginLeft: '10px'}} />
            <Typography sx={{color: '#ffffff', fontWeight: 600, fontSize: '12px', marginLeft: '10px'}}> Generating </Typography>
          </div>}
          {/* Input Box */}
          <Box
            sx={{
              display: "flex",
              p: 1,
              borderTop: "1px solid rgba(255, 255, 255, 0.3)",
              bgcolor: "rgba(255, 255, 255, 0.4)",
            }}
          >
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              sx={{
                mr: 1,
                bgcolor: "rgba(255, 255, 255, 0.7)",
                borderRadius: 1,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSend}
              endIcon={<SendIcon />}
              sx={{ borderRadius: 2 }}
            >
              Send
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ChatBot;
