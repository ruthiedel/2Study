"use client";
import React, { useState, useEffect, useRef } from 'react';
import Pusher from 'pusher-js';
import { useUpdateBook, getBooks } from '../../hooks/booksDetails';
import { User, Message, localMessage } from '../../types';
import ChatStyles from './Chat.module.css';
import useUserStore from '../../services/zustand/userZustand/userStor';
import { postMessage, convertMessagesToLocalMessages, convertLocalMessagesToMessages } from '../../services/chatService'

const Chat = ({ bookId }: { bookId: string }) => {
  const user: User | null = useUserStore((state) => state.user);
  const { data: books } = getBooks();
  const updateBookMutation = useUpdateBook();
  const [messages, setMessages] = useState<localMessage[]>([]);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [bookName, setBookName] = useState('');
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, { cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!, });

    if (books && Array.isArray(books)) {
      const selectedBook = books.find(book => book._id == bookId)
      if (selectedBook && selectedBook.learningGroups && selectedBook.learningGroups.message) {
        setMessages(convertMessagesToLocalMessages([...selectedBook?.learningGroups.message]))
        setBookName(selectedBook.name);
      }
      else { console.log("No learningGroups", selectedBook)}
    }
    else { console.log("No books") }

    const channel = pusher.subscribe(`chat-${bookId}`);
    channel.bind('message', (data: Message) => {
      const newMessage = convertMessagesToLocalMessages([data])[0];
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => { pusher.unsubscribe(`chat-${bookId}`); };
  }, [books]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!user || message.trim() === '' || isSending) return;

    const newMessage: Message = {
      _id: '',
      bookId,
      username: user.name,
      message: message,
      timestamp: new Date(),
    };

    setIsSending(true);
    try {
      const username = `${user.name} ${user._id}`;
      const savedMessage: Message = await postMessage(newMessage.message, username, bookId);

      if (savedMessage) {
        const newLocalMessage: localMessage = {
          messageId: savedMessage._id || '',
          username: user.name,
          userId: user._id || '',
          bookId: savedMessage.bookId,
          message: savedMessage.message,
          timestamp: savedMessage.timestamp,
        };
        const updatedMessages = convertLocalMessagesToMessages([...messages, newLocalMessage]);

        updateBookMutation.mutate({
          id: bookId,
          updatedData: {
            learningGroups: {
              message: updatedMessages,
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

  return (
    <div className={ChatStyles.container} >
      <div className={ChatStyles.header}>
        <>קבוצת לימוד {bookName}</>
        <div className={ChatStyles.profileContainer}>
          <div className={ChatStyles.onlineIndicator}></div>
          <img
            src={user?.userImagePath || '/default-avatar.png'}
            alt={user?.name}
            className={ChatStyles.profileImage}
          />
        </div>
      </div>
      <div className={ChatStyles.messages} id='messages-container'>
        {messages.map((msg, index) => (
          <div key={index} className={`${ChatStyles.messageContainer} ${(msg.userId && msg.userId === user?._id) ? ChatStyles.selfContainer : ''
            }`}>
            <div className={ChatStyles.profile}>{msg.username[0]}</div>
            <div
              className={`${ChatStyles.message} ${(msg.userId && msg.userId === user?._id) ? ChatStyles.selfMessage : ChatStyles.otherMessage
                }`}
            >
              <div className={ChatStyles.username}>{msg.username}</div>
              <div className={ChatStyles.text}>{msg.message}</div>
              <div className={ChatStyles.timestamp}>
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
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
