'use client';
import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import useUserStore, { UserStore } from '../../services/zustand/userZustand/userStor';
import { User } from '../../types';

interface Message {
  username: string;
  message: string;
  timestamp: string;
}

const Chat = ({ bookId }: { bookId: string }) => {
  const user: User | null = useUserStore((state) => state.user);


  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe(`chat-${bookId}`);
    channel.bind('message', (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      pusher.unsubscribe(`chat-${bookId}`);
    };
  }, [bookId]);

  const sendMessage = async () => {
    if(user){
    if (message.trim() === '') return;

    await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, username: user.name, bookId, userId: user._id })    });

    setMessage('');
  }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>קבוצת לימוד - שם הספר</div>
      <div style={styles.messages}>
        {messages.map((msg, index) => (
          <div key={index} style={{ ...styles.message, ...(msg.username === user!.name ? styles.selfMessage : {}) }}>
            <div style={styles.username}>{msg.username}</div>
            <div style={styles.text}>{msg.message}</div>
            <div style={styles.timestamp}>{msg.timestamp}</div>
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="כתוב הודעה..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.sendButton}>שלח</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#333',
    color: 'white',
    padding: '10px',
    textAlign: 'center' as 'center',
  },
  messages: {
    flex: 1,
    overflowY: 'auto' as 'auto',
    padding: '10px',
  },
  message: {
    marginBottom: '15px',
    textAlign: 'left' as 'left',
  },
  selfMessage: {
    textAlign: 'right' as 'right',
  },
  username: {
    fontWeight: 'bold' as 'bold',
  },
  text: {
    backgroundColor: '#e0e0e0',
    padding: '10px',
    borderRadius: '10px',
    display: 'inline-block',
  },
  timestamp: {
    fontSize: '0.8em',
    color: 'gray',
    marginTop: '5px',
  },
  inputContainer: {
    display: 'flex',
    padding: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  sendButton: {
    padding: '10px',
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    marginLeft: '5px',
    cursor: 'pointer',
  },
};

export default Chat;

