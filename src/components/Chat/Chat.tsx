'use client';
import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import useUserStore from '../../services/zustand/userZustand/userStor';
import { User } from '../../types';
import ChatStyles from './Chat.module.css'; 

interface Message {
  username: string;
  message: string;
  timestamp: string;
}

const Chat = ({ bookId }: { bookId: string }) => {
  const user: User | null = useUserStore((state) => state.user);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(`/api/chat/?bookId=${bookId}`);
      const data = await res.json();
      setMessages(data);
    };

    fetchMessages();

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
    if (!user || message.trim() === '' || isSending) return;

    setIsSending(true); // חסימת הכפתור
    await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        username: user.name,
        bookId,
        timestamp: new Date().toISOString(),
      }),
    });

    setMessage(''); // ריקון האינפוט
    setIsSending(false); // שחרור הכפתור
  };

  return (
    <div className={ChatStyles.container}>
      <div className={ChatStyles.header}>קבוצת לימוד - שם הספר</div>
      <div className={ChatStyles.messages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${ChatStyles.message} ${
              msg.username === user?.name ? ChatStyles.selfMessage : ''
            }`}
          >
            <div className={ChatStyles.username}>{msg.username}</div>
            <div className={ChatStyles.text}>{msg.message}</div>
            <div className={ChatStyles.timestamp}>
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
      <div className={ChatStyles.inputContainer}>
        <input
          type="text"
          value={message}
          placeholder="כתוב הודעה..."
          onChange={(e) => setMessage(e.target.value)}
          className={ChatStyles.input}
        />
        <button
          onClick={sendMessage}
          className={ChatStyles.sendButton}
          disabled={isSending}
        >
          {isSending ? 'שולח...' : 'שלח'}
        </button>
      </div>
    </div>
  );
};

export default Chat;
