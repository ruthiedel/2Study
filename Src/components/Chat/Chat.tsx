"use client";
import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import { useUpdateBook, getBooks } from '../../hooks/booksDetails';
import { User, Message } from '../../types';
import ChatStyles from './Chat.module.css';
import useUserStore from '../../services/zustand/userZustand/userStor';

const Chat = ({ bookId }: { bookId: string }) => {
  const user: User | null = useUserStore((state) => state.user);
  const { data: books } = getBooks();
  const updateBookMutation = useUpdateBook();

  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    if (books) {
      const selectedBook = books.find(book => book._id == bookId)
      if (selectedBook && selectedBook.learningGroups && selectedBook.learningGroups.message) {
        setMessages([...selectedBook?.learningGroups.message])
      }
      else {
        console.log("No learningGroups", selectedBook)
      }
    }
    else {
      console.log("No books")
    }
    const channel = pusher.subscribe(`chat-${bookId}`);
    channel.bind('message', (data: Message) => {
      setMessages((prevMessages) => {
        return [...prevMessages, data];

      });
    });

    return () => {
      pusher.unsubscribe(`chat-${bookId}`);
    };
  }, [books]);

  const sendMessage = async () => {
    if (!user || message.trim() === '' || isSending) return;

    const newMessage: Message = {
      _id: '', // יווצר בשרת
      bookId,
      username: user.name,
      message: message,
      timestamp: new Date(),
    };

    setIsSending(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: newMessage.message,
          username: user.name,
          bookId,
        }),
      });
      console.log(res)
      if (res.ok) {
        const savedMessage: Message = await res.json();
        console.log('Message sent successfully', savedMessage);

        updateBookMutation.mutate({
          id: bookId,
          updatedData: {
            learningGroups: {
              message: [...messages, savedMessage],
            },
          },
        });
      } else {
        console.error('Error sending message');
      }
    } catch (error) {
      console.error('Error sending message', error);
    }

    setMessage('');
    setIsSending(false);
  };
  console.log(messages, "eeee")

  return (
    <div className={ChatStyles.container}>
      <div className={ChatStyles.header}>קבוצת לימוד - שם הספר</div>
      <div className={ChatStyles.messages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${ChatStyles.message} ${msg.username === user?.name ? ChatStyles.selfMessage : ''
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); 
              sendMessage();
            }
          }}
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
