// voiceflow.d.ts
interface VoiceflowChat {
    load: (config: any) => void;
  }
  
  interface Window {
    voiceflow: {
      chat: VoiceflowChat;
    };
  }
  