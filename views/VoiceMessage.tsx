import React, { useState, useEffect } from 'react';
import { AppView, ViewProps } from '../types';
import { speak } from '../services/tts';
import { Mic, Square, Send, RotateCcw, ArrowLeft } from 'lucide-react';
import { BigButton } from '../components/BigButton';

export const VoiceMessage: React.FC<ViewProps> = ({ setView, settings }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);

  useEffect(() => {
    speak("Tap the microphone button to start recording.", settings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setHasRecording(true);
      speak("Recording stopped. Tap Send to send to family.", settings);
    } else {
      setIsRecording(true);
      speak("Recording started. Tap Stop when finished.", settings);
    }
  };

  const handleSend = () => {
    speak("Voice message sent successfully.", settings);
    setView(AppView.HOME);
  };

  return (
    <div className="flex flex-col h-full p-4 gap-4">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setView(AppView.HOME)}
          className={`p-4 border-4 rounded-xl ${settings.theme === 'dark' ? 'border-white text-white' : 'border-black text-black'}`}
        >
          <ArrowLeft size={32} />
        </button>
        <h1>Voice Msg</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        {!hasRecording ? (
          <button
            onClick={toggleRecording}
            className={`
              w-64 h-64 rounded-full border-8 flex flex-col items-center justify-center gap-4
              transition-all
              ${isRecording 
                ? 'bg-red-100 border-red-600 text-red-900 animate-pulse' 
                : settings.theme === 'dark' ? 'bg-gray-800 border-white text-white' : 'bg-blue-100 border-blue-600 text-blue-900'}
            `}
          >
            {isRecording ? <Square size={80} fill="currentColor" /> : <Mic size={80} />}
            <span className="text-xl font-bold">{isRecording ? "Stop" : "Record"}</span>
          </button>
        ) : (
          <div className="w-full flex flex-col gap-4">
            <div className={`p-6 rounded-2xl border-4 text-center ${settings.theme === 'dark' ? 'bg-gray-800 border-white' : 'bg-green-100 border-green-600'}`}>
              <h2 className="mb-2">Recording Ready</h2>
              <p>Would you like to send this?</p>
            </div>
            
            <BigButton
              label="Send Now"
              icon={<Send size={48} />}
              onClick={handleSend}
              settings={settings}
              variant="primary"
              fullWidth
            />
            
            <BigButton
              label="Record Again"
              icon={<RotateCcw size={48} />}
              onClick={() => {
                setHasRecording(false);
                setIsRecording(false);
                speak("Ready to record again.", settings);
              }}
              settings={settings}
              variant="secondary"
              fullWidth
            />
          </div>
        )}
      </div>
      <div className="h-24"></div>
    </div>
  );
};
