'use client'
import { createContext, useContext, useEffect, useState } from "react";

const backendUrl = "http://127.0.0.1:5000";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const chat = async ({ assistant_id, thread_id, message }) => {
        setLoading(true);
        console.log(assistant_id, thread_id, message);
        const payload = {
          assistant_id,
          thread_id,
          message
        };
        try {
            const response = await fetch(`${backendUrl}/talk`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const respMessages = await response.json();
            setMessages((messages) => [...messages, ...respMessages]);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
        setLoading(false);
    };
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [cameraZoomed, setCameraZoomed] = useState(true);
  const onMessagePlayed = () => {
    setMessages((messages) => messages.slice(1));
  };

  useEffect(() => {
    if (messages.length > 0) {
      setMessage(messages[0]);
    } else {
      setMessage(null);
    }
  }, [messages]);

  return (
    <ChatContext.Provider
      value={{
        chat,
        message,
        onMessagePlayed,
        loading,
        cameraZoomed,
        setCameraZoomed,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
