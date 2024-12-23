"use client";
import React, { useState, useEffect, useRef } from "react";
import Pusher from "pusher-js";
import { useMessages, useUpdateMessage } from "../../hooks/messagesDetailes";
import { User, Message } from "../../types";
import ChatStyles from "./Chat.module.css";
import useUserStore from "../../services/zustand/userZustand/userStor";


const Chat = ({ bookId, bookName }: { bookId: string; bookName: string }) => {
  const user: User | null = useUserStore((state) => state.user);
  const { data: initialMessages, refetch } = useMessages(bookId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const updateMessagesMutation = useUpdateMessage();

  // Fetch initial messages into local state
  useEffect(() => {
    if (initialMessages?.messages) {
      setMessages(initialMessages.messages);
    }
  }, [initialMessages]);

  // Setup Pusher for real-time updates
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe(`chat-${bookId}`);
    channel.bind("message", (data: Message) => {
      // setMessages((prevMessages) => [...prevMessages, data]);
      refetch()
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
    <div className={ChatStyles.container}>
      <div className={ChatStyles.header}>
        <>קבוצת לימוד {bookName}</>
        <div className={ChatStyles.profileContainer}>
          <div className={ChatStyles.onlineIndicator}></div>
          <img
            src={user?.userImagePath || "/default-avatar.png"}
            alt={user?.name}
            className={ChatStyles.profileImage}
          />
        </div>
      </div>
      <div className={ChatStyles.messages} ref={messageContainerRef} id="messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${ChatStyles.messageContainer} ${
              msg.userId === user?._id ? ChatStyles.selfContainer : ""
            }`}
          >
            <div className={ChatStyles.profile}>{msg.userName[0]}</div>
            <div
              className={`${ChatStyles.message} ${
                msg.userId === user?._id
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
        <button onClick={sendMessage} className={ChatStyles.sendButton} disabled={isSending}>
          {isSending ? "שולח..." : "שלח"}
        </button>
      </div>
    </div>
  );
};

export default Chat;


// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import Pusher from "pusher-js";
// import { useMessages, useUpdateMessage } from "../../hooks/messagesDetailes";
// import { User, Message } from "../../types";
// import ChatStyles from "./Chat.module.css";
// import useUserStore from "../../services/zustand/userZustand/userStor";

// const Chat = ({ bookId, bookName }: { bookId: string; bookName: string }) => {
//   const user: User | null = useUserStore((state) => state.user);
//   const { data: initialMessages, refetch } = useMessages(bookId);
//   const [message, setMessage] = useState("");
//   const [isSending, setIsSending] = useState(false);
//   const messageContainerRef = useRef<HTMLDivElement>(null);
//   const updateMessagesMutation = useUpdateMessage();

//   useEffect(() => {
//     const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
//       cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
//     });

//     const channel = pusher.subscribe(`chat-${bookId}`);
//     channel.bind("message", () => {
//       refetch(); 
//     });

//     return () => {
//       pusher.unsubscribe(`chat-${bookId}`);
//     };
//   }, [bookId, refetch]);

//   useEffect(() => {
//     if (messageContainerRef.current) {
//       messageContainerRef.current.scrollTo({
//         top: messageContainerRef.current.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   }, [initialMessages]); 

//   const sendMessage = async () => {
//     if (!user || message.trim() === "" || isSending) return;

//     setIsSending(true);

//     try {
//       await updateMessagesMutation.mutate({
//         book_id: bookId,
//         message: message,
//         userName: user.name,
//         userId: user._id || "",
//       });
//     } catch (error) {
//       console.error("Error sending message:", error);
//     } finally {
//       setMessage("");
//       setIsSending(false);
//     }
//   };

//   return (
//     <div className={ChatStyles.container}>
//       <div className={ChatStyles.header}>
//         <>קבוצת לימוד {bookName}</>
//         <div className={ChatStyles.profileContainer}>
//           <div className={ChatStyles.onlineIndicator}></div>
//           <img
//             src={user?.userImagePath || "/default-avatar.png"}
//             alt={user?.name}
//             className={ChatStyles.profileImage}
//           />
//         </div>
//       </div>
//       <div className={ChatStyles.messages} ref={messageContainerRef} id="messages-container">
//         {initialMessages?.messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`${ChatStyles.messageContainer} ${
//               msg.userId === user?._id ? ChatStyles.selfContainer : ""
//             }`}
//           >
//             <div className={ChatStyles.profile}>{msg.userName[0]}</div>
//             <div
//               className={`${ChatStyles.message} ${
//                 msg.userId === user?._id
//                   ? ChatStyles.selfMessage
//                   : ChatStyles.otherMessage
//               }`}
//             >
//               <div className={ChatStyles.username}>{msg.userName}</div>
//               <div className={ChatStyles.text}>{msg.message}</div>
//               <div className={ChatStyles.timestamp}>
//                 {new Date(msg.timestamp).toLocaleTimeString()}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className={ChatStyles.inputContainer}>
//         <input
//           type="text"
//           value={message}
//           placeholder="כתוב הודעה..."
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               e.preventDefault();
//               sendMessage();
//             }
//           }}
//           className={ChatStyles.input}
//         />
//         <button onClick={sendMessage} className={ChatStyles.sendButton} disabled={isSending}>
//           {isSending ? "שולח..." : "שלח"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;
