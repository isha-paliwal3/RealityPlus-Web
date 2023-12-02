// voiceflow.d.ts
interface VoiceflowChat {
    // Define the structure of the Voiceflow Chat object here.
    // Use 'any' if the structure is unknown or complex.
    load: (config: any) => void;
  }
  
  interface Window {
    voiceflow: {
      chat: VoiceflowChat;
    };
  }
  