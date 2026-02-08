import React, { useEffect } from 'react';
import { AppView, ViewProps } from '../types';
import { BigButton } from '../components/BigButton';
import { Phone, Mic, Mail, HelpCircle } from 'lucide-react';
import { speak } from '../services/tts';

export const Home: React.FC<ViewProps> = ({ setView, settings }) => {

  useEffect(() => {
    speak("You are on the home screen.", settings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-full gap-4 p-4">
      <div className="flex-1 grid grid-cols-2 gap-4">
        <BigButton
          label="Call Family"
          icon={<Phone size={48} />}
          onClick={() => setView(AppView.CONTACTS)}
          settings={settings}
          variant="primary"
        />
        <BigButton
          label="Send Voice"
          icon={<Mic size={48} />}
          onClick={() => setView(AppView.VOICE_MESSAGE)}
          settings={settings}
          variant="primary"
        />
        <BigButton
          label="Read Msg"
          icon={<Mail size={48} />}
          onClick={() => speak("You have no new messages.", settings)}
          settings={settings}
          variant="secondary"
        />
        <BigButton
          label="Help"
          icon={<HelpCircle size={48} />}
          onClick={() => speak("Help is available. Press the red emergency button at the bottom for urgent help, or ask a family member.", settings)}
          settings={settings}
          variant="secondary"
        />
      </div>
      
      {/* Spacer for the persistent bottom bar in Layout */}
      <div className="h-24"></div> 
    </div>
  );
};
