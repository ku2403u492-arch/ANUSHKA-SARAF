import React, { useEffect, useState } from 'react';
import { AppView, ViewProps } from '../types';
import { speak } from '../services/tts';
import { X } from 'lucide-react';

export const Emergency: React.FC<ViewProps> = ({ setView, settings }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    speak("Emergency mode activated. Calling trusted contact in 5 seconds. Press Cancel to stop.", settings);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
            clearInterval(interval);
            // Simulate action
            speak("Calling Emergency Contact now.", settings);
            return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute inset-0 z-50 bg-red-600 text-white flex flex-col items-center justify-center p-8 text-center animate-pulse">
      <h1 className="text-6xl font-black mb-8">SOS</h1>
      <h2 className="text-3xl font-bold mb-12">Calling Help in {countdown}...</h2>
      
      <button 
        onClick={() => {
            speak("Emergency cancelled. Returning home.", settings);
            setView(AppView.HOME);
        }}
        className="bg-white text-red-900 border-4 border-red-900 rounded-2xl p-8 w-full max-w-sm flex items-center justify-center gap-4"
      >
        <X size={64} />
        <span className="text-4xl font-bold">CANCEL</span>
      </button>
    </div>
  );
};
