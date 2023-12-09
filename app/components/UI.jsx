'use client'
import React, { useRef, useState, useEffect } from "react";
import { useChat } from "../hooks/useChat";
import axios, { AxiosError } from 'axios';


export const UI = ({ hidden, assistant_id, thread_id }) => {
  const input = useRef();
  const recognition = useRef(null);
  const [isListening, setIsListening] = useState(false);
  // const [threadId, setThreadId] = useState('');
  const { chat, loading, cameraZoomed, setCameraZoomed, message } = useChat();


  useEffect(() => {
    if (typeof window !== "undefined" && !recognition.current) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognition.current = new SpeechRecognition();
        recognition.current.onstart = () => {
          console.log("Speech recognition started");
          setIsListening(true);
        };
        recognition.current.onerror = (error) => {
          console.error("Speech Recognition Error: ", error);
          setIsListening(false);
          // You can display an error message to the user here
        };
        recognition.current.onend = () => {
          setIsListening(false);
          console.log("Speech Recognition Stop");
          console.log(loading, message, input.current.value)
          if (!loading && !message && input.current.value) {
            sendMessage();
          }

        };
        recognition.current.onresult = (event) => {
          console.log('onresults')
          const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join("");
          input.current.value = transcript;
          console.log("Transcript:", transcript);
          if (!loading && !message && input.current.value) {
            console.log("Calling sendMessage"); 
            sendMessage();
          }
        };
      } else {
        console.log("Speech Recognition not available in this browser.");
      }
    }
  }, [loading, message]);

  const toggleListening = () => {
    if (recognition.current) {
      if (isListening) {
        recognition.current.stop();
      } else {
        recognition.current.start();
      }
    } else {
      console.log("Speech Recognition not initialized");
    }
  };

  const sendMessage = () => {
    const text = input.current.value;
    console.log(text,'send message')
    console.log(thread_id)
    if (text && assistant_id && thread_id && !loading && !message) {
      chat({ assistant_id, thread_id, message: text });
    }
  };

  if (hidden) {
    return null;
  }
  
  return (
    <>
      <div className="fixed w-[100vw] top-20 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
        <div className="w-full flex flex-col items-end justify-center gap-4">
          <button
            onClick={() => setCameraZoomed(!cameraZoomed)}
            className="pointer-events-auto bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-md"
          >
            {cameraZoomed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                />
              </svg>
            )}
          </button>
          <button
            onClick={() => {
              const body = document.querySelector("body");
              if (body.classList.contains("greenScreen")) {
                body.classList.remove("greenScreen");
              } else {
                body.classList.add("greenScreen");
              }
            }}
            className="pointer-events-auto bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-2 pointer-events-auto md:max-w-screen-md w-full mx-auto">
        <input
          className="w-full placeholder:text-gray-800 placeholder:italic p-4 rounded-md bg-opacity-50 bg-white backdrop-blur-md"
          placeholder="Type a message..."
          ref={input}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button
          disabled={loading || message}
          onClick={sendMessage}
          className={`bg-blue-500 hover:bg-blue-600 text-white p-4 px-10 font-semibold uppercase rounded-md ${
            loading || message ? "cursor-not-allowed opacity-30" : ""
          }`}
        >
          Send
        </button>
        {/* Microphone Button */}
        <button
          onClick={toggleListening}
          className={`ml-2 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-md ${
            isListening ? "bg-green-500" : ""
          }`}
        >
          {isListening ? 'Stop' : 'Speak'}
        </button>
        </div>
      </div>
    </>
  );
};

 