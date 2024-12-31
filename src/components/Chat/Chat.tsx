"use client";
import React, { useState, useEffect, useRef } from "react";
import Pusher from "pusher-js";
import { useMessages, useUpdateMessage } from "../../hooks/messagesDetailes";
import { User, Message } from "../../types";
import ChatStyles from "./Chat.module.css";
import useUserStore from "../../services/zustand/userZustand/userStor";
import { ExpandMore } from "@mui/icons-material";

const Chat = ({ bookId, bookName }: { bookId: string; bookName: string }) => {
  const [isChatVisible, setIsChatVisible] = useState(true);
  const user: User | null = useUserStore((state) => state.user);
  const { data: initialMessages, refetch } = useMessages(bookId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const updateMessagesMutation = useUpdateMessage();

  useEffect(() => {
    if (initialMessages?.messages) {
      setMessages(initialMessages.messages);
    }
  }, [initialMessages]);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe(`chat-${bookId}`);
    channel.bind("message", (data: Message) => {
      refetch();
    });

    return () => {
      pusher.unsubscribe(`chat-${bookId}`);
    };
  }, [bookId]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!user || message.trim() === "" || isSending) return;
    setIsSending(true);

    try {
      await updateMessagesMutation.mutate({
        book_id: bookId,
        message: message,
        userName: user.name,
        userId: user._id || "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setMessage("");
      setIsSending(false);
    }
  };

  return (
    <div className={`${ChatStyles.chatWrapper}`}>
      {!isChatVisible && (
        <button
          className={ChatStyles.toggleButton}
          onClick={() => setIsChatVisible(true)}
        >
          💬
        </button>
      )}
      {isChatVisible && (
        <div className={ChatStyles.container}>
          <div className={ChatStyles.header}>
            <button
              className={ChatStyles.closeButton}
              onClick={() => setIsChatVisible(false)}
            >
              <ExpandMore />
            </button>
            <span>קבוצת לימוד {bookName}</span>
            <div className={ChatStyles.profileContainer}>
              <div className={ChatStyles.onlineIndicator}></div>
              <img
                src={user?.userImagePath || "/Default_User.png"}
                alt={user?.name || "User Avatar"}
                className={ChatStyles.profileImage}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "/Default_User.png";
                }}
              />
            </div>
          </div>
          <div
            className={ChatStyles.messages}
            ref={messageContainerRef}
            id="messages-container"
          >
            {messages.length === 0 && (
              <div className={ChatStyles.text2}>
                בוא להיות הראשון שכותב הודעה בקבוצת הלמידה 👇
              </div>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${ChatStyles.messageContainer} ${msg.userId === user?._id ? ChatStyles.selfContainer : ""
                  }`}
              >
                <div className={ChatStyles.profile}>{msg.userName[0]}</div>
                <div
                  className={`${ChatStyles.message} ${msg.userId === user?._id
                      ? ChatStyles.selfMessage
                      : ChatStyles.otherMessage
                    }`}
                >
                  <div className={ChatStyles.username}>{msg.userName}</div>
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
                if (e.key === "Enter") {
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
              {isSending ? "שולח..." : "שלח"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
