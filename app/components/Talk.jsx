'use client'
import React, { useEffect, useState } from "react";
import axios from 'axios'; // Make sure to import axios
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "../components/Experience";
import { UI } from "../components/UI";
import { useSearchParams } from 'next/navigation';

function Talk() {
  const [searchParamsArray] = useSearchParams();
  const [threadId, setThreadId] = useState(null);

  // Manually process the array to extract 'assistant_id'
  let assistantId;
  for (let i = 0; i < searchParamsArray.length; i += 2) {
    if (searchParamsArray[i] === 'assistant_id') {
      assistantId = searchParamsArray[i + 1];
      break;
    }
  }

  useEffect(() => {
    const startChat = async () => {
      const payload = {
        assistant_id: assistantId
      };

      try {
        const response = await axios.post(`http://127.0.0.1:5000/start`, payload, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const newThreadId = response.data.thread_id;
        setThreadId(newThreadId);

      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error.response?.data || error.message);
        } else {
          console.error('An unexpected error occurred:', error);
        }
      }
    };

    if (assistantId) {
      startChat();
    }
  }, [assistantId]); // Dependency array

  return (
    <div className="h-[100vh] w-[100vw]">
      <Loader />
      <Leva hidden />
      {threadId && <UI assistant_id={assistantId} thread_id={threadId} />}
      <Canvas shadows camera={{ position: [0, 0, 1], fov: 30 }}>
        <Experience />
      </Canvas>
    </div>
  );
}

export default Talk;
