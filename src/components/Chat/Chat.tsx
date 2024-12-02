'use client'
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Avatar, List, ListItem } from '@mui/material';

// Chat message type
type Message = {
  user: string;
  text: string;
};

const chatStyles = {
  container: {
    width: '20%',
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: '#fff',
    height: '100vh',
    padding: '16px',
  },
  chatList: {
    flexGrow: 1,
    overflowY: 'auto' as const,
  },
  messageItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
  },
  messageText: {
    backgroundColor: '#e0e0e0',
    padding: '8px',
    borderRadius: '8px',
    marginLeft: '8px',
    flex: 1,
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { user: 'User', text: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <Box style={chatStyles.container}>
      <List style={chatStyles.chatList}>
        {messages.map((msg, index) => (
          <ListItem key={index} style={chatStyles.messageItem}>
            <Avatar />
            <Typography style={chatStyles.messageText}>{msg.text}</Typography>
          </ListItem>
        ))}
      </List>
      <Box style={chatStyles.inputContainer}>
        <TextField
          fullWidth
          variant="outlined"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
